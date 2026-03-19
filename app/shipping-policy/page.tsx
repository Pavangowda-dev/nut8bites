import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Nut8Bites",
  description:
    "Read Nut8Bites shipping policy for delivery timelines, courier details, damaged parcel handling, and shipping conditions across India.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="bg-white text-neutral-800">
      <section className="max-w-4xl mx-auto px-6 py-16 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Shipping Policy
        </h1>

        <div className="space-y-8 leading-7 text-[15px] md:text-base">
          <p>
            At <strong>Nut8Bites</strong>, we are committed to delivering fresh,
            hygienic, and carefully packed peanut-based products directly from
            Chintamani, Karnataka to your doorstep across India.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Order Processing Time</h2>
            <p>
              All orders are freshly prepared and packed after order confirmation.
              Orders are usually processed and dispatched within{" "}
              <strong>24 to 48 business hours</strong>.
            </p>
            <p className="mt-2">
              Orders placed on Sundays or public holidays will be processed on
              the next working day.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Delivery Timeline</h2>
            <p>
              Once dispatched, delivery usually takes{" "}
              <strong>4 to 8 business days</strong> depending on your location,
              courier route, and service availability.
            </p>
            <p className="mt-2">
              Delivery timelines may vary during festivals, peak seasons, weather
              conditions, or courier service delays.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Shipping Partners</h2>
            <p>We currently ship orders through trusted courier partners such as:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>DTDC</li>
              <li>India Post</li>
            </ul>
            <p className="mt-2">
              Courier partner selection may vary depending on delivery location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Shipping Coverage</h2>
            <p>
              Currently, Nut8Bites ships only within <strong>India</strong>.
              International shipping is not available at this time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Shipping Charges</h2>
            <p>
              Shipping charges are calculated during checkout based on delivery
              location and package weight.
            </p>
            <p className="mt-2">
              Free shipping is currently not available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Cash on Delivery</h2>
            <p>
              We currently do <strong>not offer Cash on Delivery (COD)</strong>.
              All orders must be prepaid through available online payment methods.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Delayed Deliveries</h2>
            <p>
              In rare cases, deliveries may be delayed due to courier issues,
              weather conditions, remote area access, or unforeseen logistics
              disruptions.
            </p>
            <p className="mt-2">
              If your order is delayed, our team will coordinate with the courier
              partner and provide updates wherever possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Damaged Parcel Handling</h2>
            <p>
              If your parcel arrives damaged, leaked, or visibly tampered with,
              please record a complete unboxing video immediately while opening
              the package.
            </p>
            <p className="mt-2">
              A valid unboxing video is mandatory to review any damage claim.
              Without video proof, claims cannot be processed.
            </p>
            <p className="mt-2">
              After verification, eligible cases may qualify for refund approval.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Incorrect Address</h2>
            <p>
              Please ensure your shipping address, phone number, and pin code are
              entered correctly during checkout.
            </p>
            <p className="mt-2">
              Nut8Bites will not be responsible for delivery failure caused by
              incorrect customer details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact for Shipping Support</h2>
            <p>
              For shipping-related support, contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> nut8bytes@gmail.com
            </p>
            <p>
              <strong>Location:</strong> Chintamani, Kolar, Karnataka, India
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Policy Updates</h2>
            <p>
              Nut8Bites reserves the right to update this shipping policy at any
              time without prior notice. Changes will be reflected on this page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}