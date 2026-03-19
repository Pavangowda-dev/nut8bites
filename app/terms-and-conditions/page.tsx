import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Nut8Bites",
  description:
    "Read Nut8Bites terms and conditions regarding orders, payments, product information, and website usage.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white text-neutral-800">
      <section className="max-w-4xl mx-auto px-6 py-16 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-8 leading-7 text-[15px] md:text-base">
          <p>
            Welcome to <strong>Nut8Bites</strong>. By accessing our website,
            placing an order, or using our services, you agree to the following
            terms and conditions. Please read them carefully before making a
            purchase.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. General Information
            </h2>
            <p>
              Nut8Bites is a food brand based in Chintamani, Kolar, Karnataka,
              India, offering freshly prepared peanut-based products including
              peanut butter, chikki, laddoo, and other natural peanut products.
            </p>
            <p className="mt-2">
              All products are prepared with care using fresh ingredients and are
              intended for personal consumption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Product Information
            </h2>
            <p>
              We make every effort to display product descriptions, ingredients,
              pricing, and images accurately.
            </p>
            <p className="mt-2">
              However, because products are freshly prepared in batches, slight
              natural variations in texture, appearance, and consistency may
              occur.
            </p>
            <p className="mt-2">
              Natural oil separation in peanut-based products is normal and does
              not indicate spoilage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Ingredients & Product Nature
            </h2>
            <p>
              Nut8Bites products are prepared using natural ingredients and do
              not contain added preservatives, artificial colors, or unnecessary
              additives unless specifically mentioned.
            </p>
            <p className="mt-2">
              Some products may contain peanuts, seeds, and other natural food
              ingredients. Customers with allergies should review ingredients
              carefully before purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Order Acceptance
            </h2>
            <p>
              Orders are confirmed only after successful payment and order
              verification.
            </p>
            <p className="mt-2">
              Nut8Bites reserves the right to accept, reject, or cancel any order
              in case of stock issues, pricing errors, payment issues, or other
              operational reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Pricing
            </h2>
            <p>
              All product prices displayed on the website are subject to change
              without prior notice.
            </p>
            <p className="mt-2">
              Prices applicable at the time of order placement will be final.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Payments
            </h2>
            <p>
              Payments are processed securely through online payment gateways.
            </p>
            <p className="mt-2">
              Nut8Bites currently accepts prepaid online payments only. Cash on
              Delivery is not available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Shipping & Delivery
            </h2>
            <p>
              Orders are dispatched within the timeline mentioned in our Shipping
              Policy.
            </p>
            <p className="mt-2">
              Delivery timelines may vary depending on location, courier
              availability, and external conditions.
            </p>
            <p className="mt-2">
              Nut8Bites is not liable for courier delays after dispatch.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Returns, Refunds & Exchanges
            </h2>
            <p>
              Due to the nature of food products, returns and exchanges are not
              accepted once delivered.
            </p>
            <p className="mt-2">
              Refunds are only considered in eligible cases such as damaged,
              leaked, or incorrect product delivery, subject to valid proof.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Customer Responsibility
            </h2>
            <p>
              Customers are responsible for providing accurate delivery details,
              including address, phone number, and contact information.
            </p>
            <p className="mt-2">
              Incorrect information may lead to delivery failure or delay.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              10. Website Usage
            </h2>
            <p>
              Users agree not to misuse the website, attempt unauthorized access,
              copy content without permission, or disrupt website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              11. Intellectual Property
            </h2>
            <p>
              All website content including product images, brand name, logos,
              descriptions, and design belong to Nut8Bites unless otherwise
              stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              12. Limitation of Liability
            </h2>
            <p>
              Nut8Bites shall not be held liable for indirect losses, courier
              delays, improper storage after delivery, or product handling beyond
              our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              13. Contact Information
            </h2>
            <p>
              For questions regarding these terms, contact:
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
              14. Policy Updates
            </h2>
            <p>
              Nut8Bites reserves the right to modify these terms at any time.
              Updates will be reflected on this page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}