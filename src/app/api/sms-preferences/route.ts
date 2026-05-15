import { NextRequest, NextResponse } from "next/server";
import { putItem } from "@/lib/dynamodb";

type SmsPreferenceAction = "opt_in" | "opt_out";

interface SmsPreferencePayload {
  action: SmsPreferenceAction;
  phone: string;
  firstName?: string;
  lastName?: string;
  smsConsent?: boolean;
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SmsPreferencePayload;
    const action = body.action;
    const normalizedPhone = normalizePhone(body.phone ?? "");

    if (action !== "opt_in" && action !== "opt_out") {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }

    if (normalizedPhone.length < 10) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    if (action === "opt_in" && !body.smsConsent) {
      return NextResponse.json(
        { error: "SMS consent is required to opt in." },
        { status: 400 }
      );
    }

    const nowIso = new Date().toISOString();
    await putItem(`SMS_PREF#${normalizedPhone}`, {
      phone: normalizedPhone,
      firstName: body.firstName?.trim() || null,
      lastName: body.lastName?.trim() || null,
      status: action === "opt_in" ? "subscribed" : "unsubscribed",
      consentGiven: action === "opt_in" ? true : false,
      source: "/sms-preferences",
      updatedAt: nowIso,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We could not process your request right now. Please try again." },
      { status: 500 }
    );
  }
}