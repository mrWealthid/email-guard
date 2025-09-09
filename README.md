# AI-Powered Email Validator

A robust, AI-powered email validation application that helps users detect potential scam emails and validate email addresses in real-time.

## Features

### 🔍 **Comprehensive Email Validation**

- **Format Validation**: Checks email syntax and structure
- **Domain Verification**: Validates MX, SPF, and DMARC records
- **Real-time Analysis**: Instant validation results

### 🤖 **AI-Powered Scam Detection**

- **Advanced AI Analysis**: Uses OpenAI GPT-4 for intelligent threat detection
- **Risk Scoring**: Provides confidence scores and risk assessments
- **Context-Aware**: Analyzes additional context like sender name, subject, and content
- **Suspicious Indicators**: Detects urgency, grammar errors, impersonation attempts, and suspicious links

### 🛡️ **Security Features**

- **Domain Security Checks**: Validates email domain security records
- **Threat Assessment**: Identifies potential phishing and scam attempts
- **Recommendations**: Provides actionable security advice

### 🎨 **Modern UI/UX**

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Feedback**: Live validation with progress indicators
- **Advanced Options**: Toggle for detailed analysis with additional context
- **Visual Indicators**: Color-coded status badges and progress bars

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI components
- **AI**: OpenAI GPT-4 API
- **Validation**: Email-validator, DNS resolution
- **Backend**: Next.js API routes

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd valid-email
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Get your OpenAI API key**

   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to your `.env.local` file

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Basic Email Validation

1. Enter an email address in the input field
2. Click "Validate" to perform basic validation
3. View results including format validity and domain security

### Advanced AI Analysis

1. Click "Advanced Analysis" to expand additional options
2. Provide additional context (sender name, subject, suspicious indicators)
3. Submit for comprehensive AI-powered scam detection
4. Review detailed risk assessment and recommendations

### Understanding Results

#### **Validation Status**

- 🟢 **Valid Email**: Proper format and domain configuration
- 🟡 **Invalid Email**: Format or domain issues detected
- 🔴 **Potential Scam**: High-risk indicators identified

#### **Domain Security**

- **MX Record**: Essential for email delivery
- **SPF Record**: Prevents email spoofing
- **DMARC Record**: Advanced email authentication

#### **AI Risk Analysis**

- **Risk Score**: 0-100% confidence in scam detection
- **Risk Factors**: Specific indicators of suspicious activity
- **Recommendations**: Actionable security advice

## API Endpoints

### POST `/api/validate-email`

Validates an email address and performs AI-powered scam detection.

**Request Body:**

```json
{
  "email": "example@domain.com",
  "context": {
    "senderName": "John Doe",
    "subject": "Urgent: Account Verification Required",
    "content": "Please click here to verify your account...",
    "urgency": true,
    "suspiciousLinks": true,
    "grammarErrors": false,
    "impersonationAttempt": false
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "isValid": true,
    "isScam": false,
    "confidence": 0.85,
    "reasons": [],
    "domainInfo": {
      "hasMxRecord": true,
      "hasSpfRecord": true,
      "hasDmarcRecord": true
    },
    "aiAnalysis": {
      "riskScore": 0.15,
      "riskFactors": [],
      "recommendation": "This email appears safe"
    }
  }
}
```

## Security Considerations

- **API Key Security**: Never expose your OpenAI API key in client-side code
- **Rate Limiting**: Consider implementing rate limiting for production use
- **Data Privacy**: Email addresses are processed but not stored
- **AI Limitations**: AI analysis is probabilistic and should not be the sole security measure

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue in the repository
- Check the documentation above
- Ensure your OpenAI API key is properly configured

## Disclaimer

This tool is designed to assist in email validation and scam detection but should not be considered a complete security solution. Always exercise caution when dealing with suspicious emails and follow your organization's security policies.
