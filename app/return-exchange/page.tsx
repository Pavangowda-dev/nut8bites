import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Nut8Bites",
  description:
    "Read Nut8Bites return, refund, and exchange policy for food products, damaged parcel claims, and refund eligibility.",
};

export default function ReturnExchangePage() {
  return (
    <main className="bg-white text-neutral-800">
      <section className="max-w-4xl mx-auto px-6 py-16 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Return & Exchange Policy
        </h1>

        <div className="space-y-8 leading-7 text-[15px] md:text-base">
          <p>
            At <strong>Nut8Bites</strong>, all products are freshly prepared food
            items made with care and hygiene. Due to the nature of food products,
            returns and exchanges are generally not accepted once an order has
            been delivered.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. No Return Policy
            </h2>
            <p>
              Since our products are edible food items, we do not accept returns
              after delivery under normal circumstances.
            </p>
            <p className="mt-2">
              This policy is followed to maintain product hygiene, freshness,
              and food safety standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. No Exchange Policy
            </h2>
            <p>
              Exchanges are not available for any Nut8Bites products once the
              order has been delivered.
            </p>
            <p className="mt-2">
              As food items cannot be reshipped or reused, exchange requests
              cannot be processed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Refund Eligibility
            </h2>
            <p>
              Refunds may be considered only under the following conditions:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Damaged product received</li>
              <li>Leaked packaging</li>
              <li>Incorrect item delivered</li>
            </ul>
            <p className="mt-2">
              Refund approval is subject to verification by our support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Mandatory Unboxing Video Proof
            </h2>
            <p>
              A complete unboxing video is mandatory for all refund claims.
            </p>
            <p className="mt-2">
              The video must clearly show:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Parcel opening from sealed condition</li>
              <li>Package label visibility</li>
              <li>Product condition inside the parcel</li>
            </ul>
            <p className="mt-2">
              Claims submitted without video proof will not be accepted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Refund Request Time Limit
            </h2>
            <p>
              Refund requests must be raised within{" "}
              <strong>24 hours of delivery</strong>.
            </p>
            <p className="mt-2">
              Claims submitted after 24 hours may not be eligible for review.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Refund Method
            </h2>
            <p>
              Approved refunds will be processed through the original payment
              method used during checkout.
            </p>
            <p className="mt-2">
              Depending on payment provider processing time, refunds may take a
              few business days to reflect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Non-Refundable Situations
            </h2>
            <p>
              Refunds will not be approved in the following situations:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Change of mind after delivery</li>
              <li>Incorrect storage after receiving the product</li>
              <li>Claims without valid proof</li>
              <li>Delay caused by courier after dispatch</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Fresh Food Product Notice
            </h2>
            <p>
              Nut8Bites products are freshly prepared in batches after order
              confirmation. Product texture, consistency, and natural oil
              separation may vary depending on ingredients and storage conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Contact for Refund Support
            </h2>
            <p>
              For eligible refund concerns, contact:
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
              Nut8Bites reserves the right to update this Return & Exchange
              Policy at any time without prior notice.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}