import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the Terms and Conditions for ABC Cleaners, including service terms, website use terms, and SMS campaign terms for marketing and order updates.",
  alternates: { canonical: "https://www.abccleanersaz.com/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Terms and Conditions</h1>
          <p className="text-blue-100 text-lg">Last updated: May 15, 2026</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-8 text-gray-700 leading-7">
        <p>
          These Terms and Conditions ("Terms") govern your access to and use of services provided by ABC Cleaners, including
          our website, in-store services, pickup and delivery, and communications sent by text message, email, or phone.
        </p>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">1. Company Information</h2>
          <p>
            AZ Best 1 Hour Cleaners Inc. DBA ABC Cleaners serves customers in Phoenix, Arizona through our North Phoenix and Biltmore locations.
            You may contact us at (623) 223-1460 or (602) 956-5271.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">2. Acceptance of Terms</h2>
          <p>
            By using our website, submitting an order, scheduling pickup and delivery, or enrolling in our communications,
            you agree to these Terms. If you do not agree, please do not use our services.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">3. Services</h2>
          <p>
            We provide dry cleaning, laundering, stain treatment, alterations, and related services. Service availability,
            turnaround times, and pricing may vary by location, order size, fabric type, and item condition.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">4. Pricing and Payment</h2>
          <p>
            Prices shown on our website are estimates and may be adjusted after item inspection. By placing an order,
            you agree to pay all applicable charges, taxes, and approved service fees.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">5. Pickup, Delivery, and Order Responsibility</h2>
          <p>
            You are responsible for ensuring garments are ready for pickup and that delivery details are accurate.
            Please review your order at pickup or delivery. Any service concerns should be reported promptly so we can assist.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">6. SMS and Marketing Communications</h2>
          <p>
            By providing your mobile number and opting in, you consent to receive recurring automated and non-automated
            text messages from AZ Best 1 Hour Cleaners Inc. DBA ABC Cleaners, including promotions, reminders, order updates, and service notifications.
            We may deliver these messages through service providers such as Twilio and Plivo.
          </p>
          <p>
            SMS opt-in consent and mobile phone numbers are not shared with third parties or affiliates for their own marketing or promotional purposes.
          </p>
          <p>
            Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase.
            Reply STOP to opt out of SMS at any time. Reply HELP for help.
          </p>
          <p>
            Carrier delivery is not guaranteed. Carriers are not liable for delayed or undelivered messages.
          </p>
          <p>
            HELP response: "ABC Cleaners: For assistance, call (602) 956-5271. Reply STOP to unsubscribe."
          </p>
          <p>
            STOP response: "You have successfully unsubscribed from ABC Cleaners text messages. No further messages will be sent. Reply START to resubscribe."
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">7. Acceptable Use</h2>
          <p>
            You agree not to misuse our website or services, including attempting unauthorized access, uploading malicious code,
            or using our systems in violation of law.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">8. Intellectual Property</h2>
          <p>
            Website content, branding, logos, text, and graphics are owned by ABC Cleaners or licensed to us and are protected
            by applicable intellectual property laws.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">9. Disclaimer and Limitation of Liability</h2>
          <p>
            Our services are provided on an "as is" and "as available" basis. To the fullest extent permitted by law,
            ABC Cleaners disclaims implied warranties and will not be liable for indirect, incidental, special,
            or consequential damages.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless ABC Cleaners from claims arising from your misuse of our services,
            violation of these Terms, or violation of applicable law.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Arizona, without regard to conflict-of-law rules.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">12. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Updated Terms will be posted on this page with a revised date.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">13. Contact Us</h2>
          <p>
            Questions about these Terms can be sent to abc1hourcleaners@gmail.com or through our contact channels listed on the
            {" "}
            <Link href="/locations" className="text-[#1e4a7a] hover:text-[#2b7fb5] underline">
              Locations page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}