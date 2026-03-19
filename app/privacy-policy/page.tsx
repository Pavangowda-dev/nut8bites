import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Nut8Bites",
  description:
    "Learn how Nut8Bites collects, uses, and protects your personal information when you shop with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-neutral-800">
      <section className="max-w-4xl mx-auto px-6 py-16 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 leading-7 text-[15px] md:text-base">
          <p>
            At <strong>Nut8Bites</strong>, we value your trust and are committed
            to protecting your personal information. This Privacy Policy explains
            how we collect, use, store, and protect the information you provide
            while using our website and placing orders with us.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you place an order or interact with our website, we may
              collect the following information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping address</li>
              <li>Payment details required for order processing</li>
            </ul>
            <p className="mt-2">
              We collect only the information necessary to process your order
              and provide customer support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p>Your information is used for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To process and confirm your orders</li>
              <li>To arrange delivery of your products</li>
              <li>To provide order updates and support</li>
              <li>To improve website performance and customer experience</li>
              <li>To comply with legal or regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Payment Security
            </h2>
            <p>
              All online payments are securely processed through trusted payment
              gateway providers such as Razorpay.
            </p>
            <p className="mt-2">
              Nut8Bites does not store your full payment card details on its own
              servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Sharing of Information
            </h2>
            <p>
              To fulfill your order, certain information may be shared only with
              essential service providers such as courier partners.
            </p>
            <p className="mt-2">
              This may include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name</li>
              <li>Phone number</li>
              <li>Delivery address</li>
            </ul>
            <p className="mt-2">
              We do not sell, rent, or misuse customer data for third-party
              commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Cookies and Analytics
            </h2>
            <p>
              Our website uses cookies and analytics tools to improve user
              experience and understand visitor behavior.
            </p>
            <p className="mt-2">
              This may include services such as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Google Analytics</li>
              <li>Search Console performance tracking</li>
            </ul>
            <p className="mt-2">
              Cookies help us analyze website traffic, improve product pages,
              and enhance performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Marketing Communication
            </h2>
            <p>
              Nut8Bites currently does not send promotional messages regularly
              through WhatsApp, SMS, or email unless required for order-related
              communication.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Data Protection
            </h2>
            <p>
              We take reasonable steps to protect your information against
              unauthorized access, misuse, or disclosure.
            </p>
            <p className="mt-2">
              However, no online system can guarantee complete security, and
              users should also take care while sharing information online.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Your Rights
            </h2>
            <p>
              You may contact us anytime if you want to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Review your stored information</li>
              <li>Request corrections</li>
              <li>Request deletion of order-related personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Contact Information
            </h2>
            <p>
              For privacy-related concerns, contact:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> nut8bytes@gmail.com
            </p>
            <p>
              <strong>Location:</strong> Chintamani, Kolar, Karnataka, India
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              10. Policy Updates
            </h2>
            <p>
              Nut8Bites reserves the right to update this Privacy Policy at any
              time. Any changes will be reflected on this page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}