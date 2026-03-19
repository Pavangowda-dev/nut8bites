import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy | Nut8Bites",
  description:
    "Read Nut8Bites cancellation policy for order cancellation timelines, refund eligibility, and dispatch conditions.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="bg-white text-neutral-800">
      <section className="max-w-4xl mx-auto px-6 py-16 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Cancellation Policy
        </h1>

        <div className="space-y-8 leading-7 text-[15px] md:text-base">
          <p>
            At <strong>Nut8Bites</strong>, all products are freshly prepared and
            packed after order confirmation. Because of this fresh production
            process, order cancellation is only possible under limited conditions.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Cancellation Before Dispatch
            </h2>
            <p>
              Customers may request order cancellation only before the order has
              been dispatched from our facility.
            </p>
            <p className="mt-2">
              If the order has not yet entered packing or courier processing,
              cancellation may be considered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. No Cancellation After Dispatch
            </h2>
            <p>
              Once the order has been dispatched and handed over to the courier
              partner, cancellation is not possible.
            </p>
            <p className="mt-2">
              This applies to all prepaid orders without exception.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Fresh Food Preparation Condition
            </h2>
            <p>
              Nut8Bites products are prepared in fresh batches after order
              confirmation. Once preparation begins, cancellation may not be
              accepted even if dispatch has not yet occurred.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Refund for Eligible Cancellations
            </h2>
            <p>
              If a cancellation request is approved before dispatch, the refund
              will be processed through the original payment method used during
              checkout.
            </p>
            <p className="mt-2">
              Refund timelines may depend on payment provider processing time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Cancellation Request Method
            </h2>
            <p>
              To request cancellation, customers must contact Nut8Bites support
              immediately after placing the order.
            </p>
            <p className="mt-2">
              Delayed requests may not be eligible once processing has started.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Non-Cancellable Situations
            </h2>
            <p>
              Cancellation requests may not be accepted in the following cases:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Order already packed</li>
              <li>Order already dispatched</li>
              <li>Fresh batch preparation completed</li>
              <li>Courier pickup completed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Contact for Cancellation Support
            </h2>
            <p>
              For urgent cancellation support, contact:
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
              8. Policy Updates
            </h2>
            <p>
              Nut8Bites reserves the right to modify this Cancellation Policy at
              any time without prior notice.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
