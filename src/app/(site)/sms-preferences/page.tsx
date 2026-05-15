import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { SmsPreferencesForm } from "./SmsPreferencesForm";

export const metadata: Metadata = {
  title: "SMS Preferences",
  description:
    "Manage SMS preferences for ABC Cleaners. Opt in to receive recurring marketing texts or opt out at any time.",
  alternates: { canonical: "https://www.abccleanersaz.com/sms-preferences" },
};

export default function SmsPreferencesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <MessageSquare className="h-5 w-5" />
            <span>SMS Communication Preferences</span>
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl">Manage Your SMS Preferences</h1>
          <p className="mx-auto max-w-3xl text-lg text-blue-100">
            Use this page to opt in to or opt out of text messages from ABC Cleaners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SmsPreferencesForm />
      </section>
    </div>
  );
}