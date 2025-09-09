"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Mail,
  Eye,
  EyeOff,
  Search,
  Zap,
  Lock,
  Globe,
} from "lucide-react";
import {
  EmailValidationResult,
  ScamDetectionFeatures,
} from "@/lib/email-validator";

interface EmailValidatorProps {
  onValidate: (
    email: string,
    context?: Partial<ScamDetectionFeatures>
  ) => Promise<EmailValidationResult>;
}

export function EmailValidator({ onValidate }: EmailValidatorProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmailValidationResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [context, setContext] = useState<Partial<ScamDetectionFeatures>>({
    urgency: false,
    suspiciousLinks: false,
    grammarErrors: false,
    impersonationAttempt: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const validationResult = await onValidate(
        email,
        showAdvanced ? context : undefined
      );
      setResult(validationResult);
    } catch (error) {
      console.error("Validation error:", error);
      setResult({
        isValid: false,
        isScam: false,
        confidence: 0,
        reasons: ["Validation failed. Please try again."],
        domainInfo: {
          hasMxRecord: false,
          hasSpfRecord: false,
          hasDmarcRecord: false,
        },
        aiAnalysis: {
          riskScore: 0,
          riskFactors: [],
          recommendation: "Unable to analyze",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (!result) return null;

    if (result.isScam) {
      return <XCircle className="h-6 w-6 text-red-500" />;
    } else if (result.isValid) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else {
      return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    if (!result) return null;

    if (result.isScam) {
      return <Badge variant="danger">Potential Scam</Badge>;
    } else if (result.isValid) {
      return <Badge variant="success">Valid Email</Badge>;
    } else {
      return <Badge variant="warning">Invalid Email</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600 dark:text-green-400";
    if (confidence >= 0.6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Main Validation Card */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                Email Validation
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Enter an email address to analyze for validity and security
                threats
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address to validate..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 h-12 text-base border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Validate Email
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="h-12 px-4 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {showAdvanced ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Basic
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Advanced
                  </>
                )}
              </Button>
            </div>

            {showAdvanced && (
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Advanced Analysis Options
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Suspicious Indicators
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-sm cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={context.urgency}
                          onChange={(e) =>
                            setContext({
                              ...context,
                              urgency: e.target.checked,
                            })
                          }
                          className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-900"
                        />
                        <span className="group-hover:text-slate-900 dark:group-hover:text-white">
                          Urgency indicators
                        </span>
                      </label>
                      <label className="flex items-center gap-3 text-sm cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={context.suspiciousLinks}
                          onChange={(e) =>
                            setContext({
                              ...context,
                              suspiciousLinks: e.target.checked,
                            })
                          }
                          className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-900"
                        />
                        <span className="group-hover:text-slate-900 dark:group-hover:text-white">
                          Suspicious links
                        </span>
                      </label>
                      <label className="flex items-center gap-3 text-sm cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={context.grammarErrors}
                          onChange={(e) =>
                            setContext({
                              ...context,
                              grammarErrors: e.target.checked,
                            })
                          }
                          className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-900"
                        />
                        <span className="group-hover:text-slate-900 dark:group-hover:text-white">
                          Grammar errors
                        </span>
                      </label>
                      <label className="flex items-center gap-3 text-sm cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={context.impersonationAttempt}
                          onChange={(e) =>
                            setContext({
                              ...context,
                              impersonationAttempt: e.target.checked,
                            })
                          }
                          className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-900"
                        />
                        <span className="group-hover:text-slate-900 dark:group-hover:text-white">
                          Impersonation attempt
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Additional Context
                    </label>
                    <Input
                      placeholder="Sender name (optional)"
                      value={context.senderName || ""}
                      onChange={(e) =>
                        setContext({ ...context, senderName: e.target.value })
                      }
                      className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                    <Input
                      placeholder="Subject line (optional)"
                      value={context.subject || ""}
                      onChange={(e) =>
                        setContext({ ...context, subject: e.target.value })
                      }
                      className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Results Card */}
      {result && (
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon()}
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                    Validation Results
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Comprehensive analysis of the email address
                  </CardDescription>
                </div>
              </div>
              {getStatusBadge()}
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Overall Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {Math.round(result.confidence * 100)}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Confidence Score
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200/50 dark:border-green-800/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {result.isValid ? "Valid" : "Invalid"}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Email Format
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-200/50 dark:border-red-800/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                    {result.isScam ? "High Risk" : "Safe"}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Scam Risk
                  </div>
                </div>
              </div>
            </div>

            {/* Domain Information */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Domain Security
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    MX Record
                  </span>
                  <Badge
                    variant={
                      result.domainInfo.hasMxRecord ? "success" : "danger"
                    }
                  >
                    {result.domainInfo.hasMxRecord ? "Present" : "Missing"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    SPF Record
                  </span>
                  <Badge
                    variant={
                      result.domainInfo.hasSpfRecord ? "success" : "warning"
                    }
                  >
                    {result.domainInfo.hasSpfRecord ? "Present" : "Missing"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    DMARC Record
                  </span>
                  <Badge
                    variant={
                      result.domainInfo.hasDmarcRecord ? "success" : "warning"
                    }
                  >
                    {result.domainInfo.hasDmarcRecord ? "Present" : "Missing"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            {result.aiAnalysis && (
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  AI Risk Analysis
                </h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Risk Score
                      </span>
                      <span
                        className={getConfidenceColor(
                          result.aiAnalysis.riskScore
                        )}
                      >
                        {Math.round(result.aiAnalysis.riskScore * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={result.aiAnalysis.riskScore * 100}
                      className="h-3"
                    />
                  </div>

                  {result.aiAnalysis.riskFactors.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">
                        Risk Factors:
                      </h5>
                      <ul className="space-y-2">
                        {result.aiAnalysis.riskFactors.map((factor, index) => (
                          <li
                            key={index}
                            className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800"
                          >
                            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                    <h5 className="text-sm font-medium mb-2 text-slate-900 dark:text-white">
                      Recommendation:
                    </h5>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {result.aiAnalysis.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Issues */}
            {result.reasons.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  Issues Found
                </h4>
                <ul className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <li
                      key={index}
                      className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"
                    >
                      <XCircle className="h-4 w-4 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
