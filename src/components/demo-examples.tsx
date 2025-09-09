"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Mail } from "lucide-react";

export function DemoExamples() {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Example Validations
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            See how the AI-powered validator detects different types of emails
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Valid Email Example */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium text-slate-900 dark:text-white text-sm">
                john.doe@gmail.com
              </span>
            </div>
            <Badge variant="success">Valid</Badge>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Standard email with proper domain configuration
          </p>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shield h-3 w-3"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
                Domain Security
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    MX Record
                  </span>
                  <Badge variant="success" className="text-xs px-2 py-0.5">
                    ✓
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    SPF Record
                  </span>
                  <Badge variant="success" className="text-xs px-2 py-0.5">
                    ✓
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    DMARC Record
                  </span>
                  <Badge variant="success" className="text-xs px-2 py-0.5">
                    ✓
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                AI Analysis
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    Risk Score
                  </span>
                  <span className="text-green-600 dark:text-green-400">5%</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  This email appears safe and legitimate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scam Email Example 1 */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="font-medium text-slate-900 dark:text-white text-sm">
                support@paypal-secure.verify.com
              </span>
            </div>
            <Badge variant="danger">Scam</Badge>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Suspicious domain attempting to impersonate PayPal
          </p>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shield h-3 w-3"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
                Domain Security
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    MX Record
                  </span>
                  <Badge variant="success" className="text-xs px-2 py-0.5">
                    ✓
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    SPF Record
                  </span>
                  <Badge variant="warning" className="text-xs px-2 py-0.5">
                    ✗
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    DMARC Record
                  </span>
                  <Badge variant="warning" className="text-xs px-2 py-0.5">
                    ✗
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                AI Analysis
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    Risk Score
                  </span>
                  <span className="text-red-600 dark:text-red-400">85%</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  High risk - likely phishing attempt
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scam Email Example 2 */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="font-medium text-slate-900 dark:text-white text-sm">
                urgent@bank-verify.net
              </span>
            </div>
            <Badge variant="danger">Scam</Badge>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Urgency indicators with suspicious domain
          </p>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shield h-3 w-3"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
                Domain Security
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    MX Record
                  </span>
                  <Badge variant="success" className="text-xs px-2 py-0.5">
                    ✓
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    SPF Record
                  </span>
                  <Badge variant="warning" className="text-xs px-2 py-0.5">
                    ✗
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    DMARC Record
                  </span>
                  <Badge variant="warning" className="text-xs px-2 py-0.5">
                    ✗
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                AI Analysis
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    Risk Score
                  </span>
                  <span className="text-red-600 dark:text-red-400">92%</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Very high risk - multiple scam indicators
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invalid Email Example */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-slate-900 dark:text-white text-sm">
                invalid-email@
              </span>
            </div>
            <Badge variant="secondary">Invalid</Badge>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Malformed email address
          </p>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shield h-3 w-3"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
                Domain Security
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    MX Record
                  </span>
                  <Badge variant="danger" className="text-xs px-2 py-0.5">
                    ✗
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    SPF Record
                  </span>
                  <Badge variant="warning" className="text-xs px-2 py-0.5">
                    ✗
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    DMARC Record
                  </span>
                  <Badge variant="warning" className="text-xs px-2 py-0.5">
                    ✗
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                AI Analysis
              </h5>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    Risk Score
                  </span>
                  <span className="text-green-600 dark:text-green-400">0%</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Invalid email format
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
