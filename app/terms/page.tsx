// app/terms/page.tsx

export const metadata = {
  title: "Terms of Service – Proyard Padel",
  description:
    "Read the Terms of Service for using Proyard Padel’s booking platform.",
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-black text-white min-h-screen py-40">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-6 text-gray-300">
          Last updated: April 28, 2025
          <br />
          These Terms of Service (“Terms”) govern your use of the Proyard Padel
          website and booking service. No account or login is required—just pick
          your court and time.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-300">
            By using our Site to book courts, you agree to these Terms. If you
            do not agree, please do not use the booking services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
          <p className="text-gray-300">
            You must be at least 18 years old to make a booking.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Booking &amp; Payment
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              All bookings are subject to slot availability and confirmation.
            </li>
            <li>
              Payment is collected at the time of booking. Prices are in INR
              (₹).
            </li>
            <li>
              We do not require any account—simply enter your details to
              complete the booking.
            </li>
          </ul>
        </section>

        <section id="cancellation" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Cancellation Policy
          </h2>
          <p className="text-gray-300">
            Cancel up to 24 hours before your slot for a full refund.
            Cancellations within 24 hours are non-refundable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Code of Conduct</h2>
          <p className="text-gray-300">
            Please respect other players and our facilities. We reserve the
            right to refuse service for abusive or unsafe behavior.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Intellectual Property
          </h2>
          <p className="text-gray-300">
            All Site content—text, graphics, logos, images—is our property or
            licensed to us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Disclaimer of Warranties
          </h2>
          <p className="text-gray-300">
            The Service is provided “as is” and we disclaim all warranties,
            express or implied.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-300">
            To the fullest extent permitted by law, we are not liable for any
            indirect or consequential damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p className="text-gray-300">
            These Terms are governed by Indian law, and disputes are resolved in
            Ludhiana courts.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
          <p className="text-gray-300">
            We may update these Terms. Changes take effect when posted.
            Continuing to use the Service means you accept changes.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p className="text-gray-300">Questions about these Terms?</p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:proplaysports032@gmail.com"
                className="text-green-400 hover:underline"
              >
                proplaysports032@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+919041013409"
                className="text-green-400 hover:underline"
              >
                +91 90410 13409
              </a>
            </li>
            <li>
              Address:{" "}
              <a
                href="https://maps.app.goo.gl/5QdYzyt2853gVvCS6?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                Ozmo Gym & Spa – South City, Ludhiana
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
