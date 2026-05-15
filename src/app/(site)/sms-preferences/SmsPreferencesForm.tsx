"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SubmitState = {
  kind: "success" | "error";
  message: string;
} | null;

export function SmsPreferencesForm() {
  const optInFormRef = useRef<HTMLFormElement>(null);
  const optOutFormRef = useRef<HTMLFormElement>(null);
  const [optInLoading, setOptInLoading] = useState(false);
  const [optOutLoading, setOptOutLoading] = useState(false);
  const [optInResult, setOptInResult] = useState<SubmitState>(null);
  const [optOutResult, setOptOutResult] = useState<SubmitState>(null);

  async function submitPreference(payload: {
    action: "opt_in" | "opt_out";
    phone: string;
    firstName?: string;
    lastName?: string;
    smsConsent?: boolean;
  }) {
    const response = await fetch("/api/sms-preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }
  }

  async function handleOptInSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOptInLoading(true);
    setOptInResult(null);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") || "");
    const lastName = String(formData.get("lastName") || "");
    const phone = String(formData.get("phone") || "");
    const smsConsent = formData.get("smsConsent") === "on";

    try {
      await submitPreference({
        action: "opt_in",
        firstName,
        lastName,
        phone,
        smsConsent,
      });
      setOptInResult({
        kind: "success",
        message:
          "You are now opted in for SMS messages from ABC Cleaners. Reply STOP anytime to unsubscribe.",
      });
      if (optInFormRef.current) {
        optInFormRef.current.reset();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your request.";
      setOptInResult({ kind: "error", message });
    } finally {
      setOptInLoading(false);
    }
  }

  async function handleOptOutSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOptOutLoading(true);
    setOptOutResult(null);

    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get("phone") || "");

    try {
      await submitPreference({
        action: "opt_out",
        phone,
      });
      setOptOutResult({
        kind: "success",
        message:
          "You have successfully unsubscribed from ABC Cleaners text messages. Reply START to resubscribe.",
      });
      if (optOutFormRef.current) {
        optOutFormRef.current.reset();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your request.";
      setOptOutResult({ kind: "error", message });
    } finally {
      setOptOutLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-2 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-gray-900">
            <Bell className="h-6 w-6 text-[#2b7fb5]" />
            SMS Opt-In
          </CardTitle>
          <CardDescription>
            Enroll to receive recurring automated promotional and personalized marketing messages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={optInFormRef} onSubmit={handleOptInSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="optInFirstName">First Name *</Label>
                <Input id="optInFirstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="optInLastName">Last Name *</Label>
                <Input id="optInLastName" name="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="optInPhone">Mobile Number *</Label>
              <Input id="optInPhone" name="phone" type="tel" required placeholder="(602) 555-0123" />
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700 space-y-3">
              <div className="flex items-start gap-3">
                <input
                  id="smsConsent"
                  name="smsConsent"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1e4a7a] focus:ring-[#2b7fb5]"
                />
                <Label htmlFor="smsConsent" className="font-normal leading-6">
                  I agree to receive recurring automated promotional and personalized marketing text messages from AZ Best 1 Hour Cleaners Inc. at the phone number provided. Consent is not a condition of purchase.
                </Label>
              </div>
              <p>
                Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe. Reply HELP for help.
              </p>
              <p>
                Privacy Policy:{" "}
                <Link href="/privacy-policy" className="text-[#1e4a7a] underline hover:text-[#2b7fb5]">
                  https://www.abccleanersaz.com/privacy-policy
                </Link>
                <br />
                Terms &amp; Conditions:{" "}
                <Link href="/terms" className="text-[#1e4a7a] underline hover:text-[#2b7fb5]">
                  https://www.abccleanersaz.com/terms
                </Link>
              </p>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5]" disabled={optInLoading}>
              {optInLoading ? "Submitting..." : "Opt In"}
            </Button>
            {optInResult && (
              <p className={optInResult.kind === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}>
                {optInResult.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-gray-900">
            <BellOff className="h-6 w-6 text-[#2b7fb5]" />
            SMS Opt-Out
          </CardTitle>
          <CardDescription>
            Stop SMS messages by submitting your mobile number below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={optOutFormRef} onSubmit={handleOptOutSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="optOutPhone">Mobile Number *</Label>
              <Input id="optOutPhone" name="phone" type="tel" required placeholder="(602) 555-0123" />
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
              You can also opt out instantly at any time by replying STOP to any text message.
            </div>

            <Button type="submit" variant="outline" className="w-full border-[#1e4a7a] text-[#1e4a7a] hover:bg-blue-50" disabled={optOutLoading}>
              {optOutLoading ? "Submitting..." : "Opt Out"}
            </Button>
            {optOutResult && (
              <p className={optOutResult.kind === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}>
                {optOutResult.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}