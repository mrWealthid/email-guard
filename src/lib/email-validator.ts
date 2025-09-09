import * as dns from "dns";
import { promisify } from "util";
import emailValidator from "email-validator";
import OpenAI from "openai";

const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);

export interface EmailValidationResult {
  isValid: boolean;
  isScam: boolean;
  confidence: number;
  reasons: string[];
  domainInfo: {
    hasMxRecord: boolean;
    hasSpfRecord: boolean;
    hasDmarcRecord: boolean;
  };
  aiAnalysis: {
    riskScore: number;
    riskFactors: string[];
    recommendation: string;
  };
}

export interface ScamDetectionFeatures {
  email: string;
  senderName?: string;
  subject?: string;
  content?: string;
  urgency: boolean;
  suspiciousLinks: boolean;
  grammarErrors: boolean;
  impersonationAttempt: boolean;
}

class EmailValidatorService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async validateEmail(
    email: string,
    additionalContext?: Partial<ScamDetectionFeatures>
  ): Promise<EmailValidationResult> {
    const result: EmailValidationResult = {
      isValid: false,
      isScam: false,
      confidence: 0,
      reasons: [],
      domainInfo: {
        hasMxRecord: false,
        hasSpfRecord: false,
        hasDmarcRecord: false,
      },
      aiAnalysis: {
        riskScore: 0,
        riskFactors: [],
        recommendation: "",
      },
    };

    try {
      // Basic email format validation
      if (!emailValidator.validate(email)) {
        result.reasons.push("Invalid email format");
        return result;
      }

      const domain = email.split("@")[1];

      // Check domain validity
      const domainChecks = await this.checkDomainValidity(domain);
      result.domainInfo = domainChecks;

      if (!domainChecks.hasMxRecord) {
        result.reasons.push("Domain has no MX record");
      }

      // AI-powered scam detection
      if (additionalContext) {
        const aiAnalysis = await this.analyzeForScam(email, additionalContext);
        result.aiAnalysis = aiAnalysis;
        result.isScam = aiAnalysis.riskScore > 0.7;
        result.confidence = aiAnalysis.riskScore;
      }

      // Calculate overall validity
      result.isValid =
        emailValidator.validate(email) && domainChecks.hasMxRecord;

      if (result.isValid && !result.isScam) {
        result.confidence = Math.max(result.confidence, 0.8);
      }
    } catch (error) {
      result.reasons.push(
        `Validation error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }

    return result;
  }

  private async checkDomainValidity(domain: string) {
    const result = {
      hasMxRecord: false,
      hasSpfRecord: false,
      hasDmarcRecord: false,
    };

    try {
      // Check MX records
      const mxRecords = await resolveMx(domain);
      result.hasMxRecord = mxRecords.length > 0;

      // Check SPF records
      try {
        const txtRecords = await resolveTxt(domain);
        result.hasSpfRecord = txtRecords.some((record) =>
          record.some((txt) => txt.toLowerCase().includes("v=spf1"))
        );
      } catch {
        // SPF record not found
      }

      // Check DMARC records
      try {
        const dmarcRecords = await resolveTxt(`_dmarc.${domain}`);
        result.hasDmarcRecord = dmarcRecords.length > 0;
      } catch {
        // DMARC record not found
      }
    } catch (error) {
      console.error("Domain validation error:", error);
    }

    return result;
  }

  private async analyzeForScam(
    email: string,
    context: Partial<ScamDetectionFeatures>
  ): Promise<EmailValidationResult["aiAnalysis"]> {
    try {
      const prompt = this.buildScamAnalysisPrompt(email, context);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an expert email security analyst. Analyze the given email for potential scam indicators and provide a risk assessment.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 500,
      });

      const analysis = completion.choices[0]?.message?.content;

      if (!analysis) {
        return {
          riskScore: 0.5,
          riskFactors: ["Unable to analyze with AI"],
          recommendation: "Proceed with caution",
        };
      }

      // Parse AI response (simplified parsing)
      const riskScore = this.extractRiskScore(analysis);
      const riskFactors = this.extractRiskFactors(analysis);
      const recommendation = this.extractRecommendation(analysis);

      return {
        riskScore,
        riskFactors,
        recommendation,
      };
    } catch (error) {
      console.error("AI analysis error:", error);
      return {
        riskScore: 0.5,
        riskFactors: ["AI analysis unavailable"],
        recommendation: "Proceed with caution",
      };
    }
  }

  private buildScamAnalysisPrompt(
    email: string,
    context: Partial<ScamDetectionFeatures>
  ): string {
    return `
Analyze this email for potential scam indicators:

Email: ${email}
Sender Name: ${context.senderName || "Not provided"}
Subject: ${context.subject || "Not provided"}
Content: ${context.content || "Not provided"}
Urgency Indicators: ${context.urgency ? "Yes" : "No"}
Suspicious Links: ${context.suspiciousLinks ? "Yes" : "No"}
Grammar Errors: ${context.grammarErrors ? "Yes" : "No"}
Impersonation Attempt: ${context.impersonationAttempt ? "Yes" : "No"}

Please provide:
1. Risk score (0-1, where 1 is highest risk)
2. Key risk factors
3. Recommendation (safe, suspicious, or scam)

Format your response as:
RISK_SCORE: [number]
RISK_FACTORS: [comma-separated list]
RECOMMENDATION: [text]
    `.trim();
  }

  private extractRiskScore(analysis: string): number {
    const match = analysis.match(/RISK_SCORE:\s*([0-9.]+)/i);
    return match ? parseFloat(match[1]) : 0.5;
  }

  private extractRiskFactors(analysis: string): string[] {
    const match = analysis.match(/RISK_FACTORS:\s*(.+?)(?:\n|$)/i);
    return match ? match[1].split(",").map((f) => f.trim()) : [];
  }

  private extractRecommendation(analysis: string): string {
    const match = analysis.match(/RECOMMENDATION:\s*(.+?)(?:\n|$)/i);
    return match ? match[1].trim() : "Proceed with caution";
  }
}

export const emailValidatorService = new EmailValidatorService();
