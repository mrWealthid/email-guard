"use client";

import { EmailValidator } from "@/components/email-validator";
import { DemoExamples } from "@/components/demo-examples";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  EmailValidationResult,
  ScamDetectionFeatures,
} from "@/lib/email-validator";
import {
  Shield,
  Zap,
  BarChart3,
  Users,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  const handleValidateEmail = async (
    email: string,
    context?: Partial<ScamDetectionFeatures>
  ): Promise<EmailValidationResult> => {
    const response = await fetch("/api/validate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        context,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to validate email");
    }

    const result = await response.json();
    return result.data;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  EmailGuard
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  AI-Powered Email Security
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span>Real-time</span>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-700 dark:text-blue-300 mb-6">
            <AlertTriangle className="h-4 w-4" />
            <span>Protect yourself from email scams</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Validate Emails with
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              AI Intelligence
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our advanced AI system analyzes emails in real-time to detect scams,
            phishing attempts, and security threats. Get instant validation
            results with detailed risk assessments.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  99.9%
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Accuracy Rate
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  &lt;2s
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Response Time
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  AI
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Powered Analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Email Validator - Main Section */}
          <div className="xl:col-span-3">
            <EmailValidator onValidate={handleValidateEmail} />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Demo Examples */}
            <DemoExamples />

            {/* Features Card */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Key Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Format Validation
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Check email syntax and structure
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Domain Security
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Verify MX, SPF, and DMARC records
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      AI Analysis
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Advanced scam detection with GPT-4
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Risk Assessment
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Detailed threat analysis and recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Security Tips
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-slate-700 dark:text-slate-300">
                  • Never click suspicious links in emails
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  • Verify sender addresses carefully
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  • Be cautious of urgent requests
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  • Check for grammar and spelling errors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This tool uses advanced AI analysis to detect potential email
              scams and phishing attempts. Always exercise caution when dealing
              with suspicious emails.
            </p>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500 dark:text-slate-500">
              <span>Powered by OpenAI GPT-4</span>
              <span>•</span>
              <span>Real-time DNS validation</span>
              <span>•</span>
              <span>Secure & private</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
