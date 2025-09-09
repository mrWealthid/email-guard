import { NextRequest, NextResponse } from "next/server";
import {
  emailValidatorService,
  ScamDetectionFeatures,
} from "@/lib/email-validator";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email("Invalid email format"),
  context: z
    .object({
      senderName: z.string().optional(),
      subject: z.string().optional(),
      content: z.string().optional(),
      urgency: z.boolean().optional(),
      suspiciousLinks: z.boolean().optional(),
      grammarErrors: z.boolean().optional(),
      impersonationAttempt: z.boolean().optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = validationSchema.parse(body);

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key not configured",
          message:
            "Please configure OPENAI_API_KEY environment variable for AI analysis",
        },
        { status: 500 }
      );
    }

    // Perform email validation
    const result = await emailValidatorService.validateEmail(
      validatedData.email,
      validatedData.context
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Email validation error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to validate email",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Email validation API",
      usage: "Send POST request with email and optional context",
    },
    { status: 200 }
  );
}
