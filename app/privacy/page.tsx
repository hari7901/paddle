// app/privacy/page.tsx

export const metadata = {
  title: "Privacy Policy – Proyard Padel",
  description:
    "Learn how Proyard Padel collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white min-h-screen py-40">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-6 text-[#CCCCCC]">
          Last updated: April 28, 2025
          <br />
          Proyard Padel (“we”, “us”, or “our”) operates{" "}
          <a
            href="https://proyardpadel.com"
            className="text-[#E99E1B] hover:underline"
          >
            https://proyardpadel.com
          </a>{" "}
          (the “Site”). We do <strong>not</strong> require you to create any
          account or login to make a booking. We simply collect the minimum
          information needed to process and confirm your court reservation.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-[#CCCCCC] space-y-2">
            <li>
              <strong>Booking Data:</strong> Name, email address, phone number,
              date, time, court selection, and payment details.
            </li>
            <li>
              <strong>Usage Data:</strong> Technical details such as IP address,
              browser type, and pages viewed, via cookies and analytics to help
              us improve the Site.
            </li>
            <li>
              <strong>Communications:</strong> Any messages you send us through
              the contact form or email.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-[#CCCCCC] space-y-2">
            <li>To process and confirm your court booking.</li>
            <li>
              To send you booking confirmations, reminders, and occasional
              updates or promotions.
            </li>
            <li>To analyze Site usage and improve features and performance.</li>
            <li>To respond to your inquiries and provide support.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Cookies &amp; Tracking
          </h2>
          <p className="text-[#CCCCCC] mb-2">
            We use cookies and similar technologies to enable basic Site
            functionality and to understand how visitors use the Site (e.g., via
            Google Analytics). You may disable cookies in your browser, although
            some features may not then work.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Sharing Your Information
          </h2>
          <ul className="list-disc list-inside text-[#CCCCCC] space-y-2">
            <li>Payment processors (e.g., Stripe) to complete transactions.</li>
            <li>
              Service providers for hosting, email delivery, and analytics.
            </li>
            <li>
              Law enforcement or government authorities if required by law.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-[#CCCCCC]">
            We take reasonable measures—such as HTTPS encryption and secure data
            storage—to protect your information from unauthorized access.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Children’s Privacy</h2>
          <p className="text-[#CCCCCC]">
            Our services are not intended for children under 13, and we do not
            knowingly collect personal data from minors.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Changes to This Policy
          </h2>
          <p className="text-[#CCCCCC]">
            We may update this policy. The “Last updated” date will indicate
            when changes occur. Please review periodically.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-[#CCCCCC]">For questions about this policy:</p>
          <ul className="list-disc list-inside text-[#CCCCCC] mt-4 space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:proplaysports032@gmail.com"
                className="text-[#E99E1B] hover:underline"
              >
                proplaysports032@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+919041013409"
                className="text-[#E99E1B] hover:underline"
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
                className="text-[#E99E1B] hover:underline"
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
