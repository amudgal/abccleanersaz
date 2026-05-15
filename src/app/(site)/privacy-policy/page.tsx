import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read ABC Cleaners' Privacy Policy, including data collection, use, and sharing practices for website use, customer accounts, and SMS marketing communications.",
  alternates: { canonical: "https://www.abccleanersaz.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg">Last updated: May 15, 2026</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-8 text-gray-700 leading-7">
        <p>
          ABC Cleaners (AZ Best 1 Hour Cleaners Inc. DBA ABC Cleaners) respects your privacy and is committed to protecting your personal information.
          This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.
        </p>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">1. Information We Collect</h2>
          <p>We may collect the following categories of information:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Contact information, such as name, phone number, email address, and delivery address.</li>
            <li>Order and service information, such as order history, garment details, and service preferences.</li>
            <li>Payment-related information processed by authorized payment providers.</li>
            <li>Communication data, including SMS opt-in status, message logs, and support requests.</li>
            <li>Technical data from website usage, such as IP address, browser type, and pages visited.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">2. How We Use Information</h2>
          <p>We use personal information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide and manage cleaning, laundry, pickup, and delivery services.</li>
            <li>Process transactions and send order confirmations, reminders, and receipts.</li>
            <li>Send promotional and marketing messages when you have opted in.</li>
            <li>Respond to questions and provide customer support.</li>
            <li>Improve website performance, service quality, and business operations.</li>
            <li>Comply with legal obligations and enforce our terms.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">3. SMS Privacy and Mobile Marketing</h2>
          <p>
            If you opt in to SMS messages, we may send promotions, updates, reminders, and service notifications.
            We may use providers such as Twilio and Plivo to deliver these messages.
          </p>
          <p>
            SMS consent is not a condition of purchase. Message frequency varies. Message and data rates may apply.
            You can opt out at any time by replying STOP. Reply HELP for help.
          </p>
          <p>
            We do not sell, rent, or share SMS opt-in data or mobile phone numbers with third parties for their own
            marketing purposes.
          </p>
          <p>
            SMS consent records are not shared with third parties under any circumstances, except when required to deliver requested messaging services or comply with applicable law.
          </p>
          <p>
            Carriers are not liable for delayed or undelivered messages.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">4. When We Share Information</h2>
          <p>We may share information with:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Service providers that support our operations, such as messaging, hosting, analytics, and payment processing.</li>
            <li>Professional advisors and legal authorities when required by law or to protect our rights.</li>
            <li>Successors in the event of a business transfer, merger, or reorganization.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">5. Data Retention</h2>
          <p>
            We keep personal information for as long as reasonably necessary to provide services, satisfy legal obligations,
            resolve disputes, and enforce agreements.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">6. Data Security</h2>
          <p>
            We use commercially reasonable technical and organizational safeguards to protect personal information.
            No system is 100% secure, but we continuously work to protect your data.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">7. Your Choices and Rights</h2>
          <p>You may:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Opt out of marketing emails through unsubscribe links.</li>
            <li>Opt out of SMS by replying STOP.</li>
            <li>Request access to, correction of, or deletion of your data, subject to legal limits.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for privacy practices on third-party sites.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">9. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to children under 13, and we do not knowingly collect personal information from children.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be posted on this page
            with the revised date.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">11. Contact Us</h2>
          <p>
            For privacy questions or requests, please contact us through the details listed on our
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