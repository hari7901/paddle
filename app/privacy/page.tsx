// app/privacy/page.tsx

export const metadata = {
  title: "Privacy Policy – PROPLAY SPORTS",
  description:
    "Learn how PROPLAY SPORTS collects, uses, shares, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white min-h-screen py-40">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        {/* ─── Intro ─────────────────────────────────────────── */}
        <p className="mb-6 text-[#CCCCCC]">
          This Privacy Policy describes how PROPLAY SPORTS and its affiliates
          (collectively “PROPLAY SPORTS,” “we,” “our,” “us”) collect, use,
          share, protect, or otherwise process your information/personal data
          through our website&nbsp;
          <a
            href="https://www.proyard.in/"
            className="text-[#E99E1B] hover:underline"
          >
            https://www.proyard.in/
          </a>{" "}
          (hereinafter referred to as the “Platform”). You may browse certain
          sections of the Platform without registering. We do not offer any
          product or service outside India and your personal data will primarily
          be stored and processed in India. By visiting this Platform, providing
          your information, or availing any product/service offered here, you
          expressly agree to be bound by this Privacy Policy, our Terms of Use,
          the applicable product/service terms and conditions, and the laws of
          India (including data‑protection and privacy laws). If you do not
          agree, please do not use or access our Platform.
        </p>

        {/* ─── 1. Collection ─────────────────────────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Collection</h2>
          <p className="text-[#CCCCCC] mb-4">
            We collect your personal data when you use our Platform, our
            services, or otherwise interact with us during the course of our
            relationship. Information we may collect includes, but is not
            limited to:
          </p>
          <ul className="list-disc list-inside text-[#CCCCCC] space-y-2">
            <li>
              <strong>Identity &amp; Contact Data:</strong> Name, date of birth,
              address, telephone/mobile number, email ID, and any information
              shared as proof of identity or address.
            </li>
            <li>
              <strong>Sensitive Personal Data&nbsp;(with consent):</strong>{" "}
              Payment‑instrument details (bank account, credit/debit card) or
              biometric identifiers (e.g.&nbsp;facial features) required for
              certain Platform features.
            </li>
            <li>
              <strong>Behaviour &amp; Preference Data:</strong> Information we
              track about your behaviour and preferences on the Platform,
              compiled and analysed on an aggregated basis.
            </li>
            <li>
              <strong>Transaction Data:</strong> Details of transactions carried
              out on the Platform or on partner platforms.
            </li>
            <li>
              <strong>Third‑party Data:</strong> Information collected directly
              by third‑party business partners is subject to their privacy
              policies; we are not responsible for their practices.
            </li>
          </ul>
          <p className="text-[#CCCCCC] mt-4">
            You may choose not to provide certain information; however, this may
            limit your ability to use particular services or features on the
            Platform. If you receive any communication requesting sensitive
            personal data (e.g.&nbsp;PIN, passwords), do not share it and report
            the incident to the appropriate law‑enforcement agency.
          </p>
        </section>

        {/* ─── 2. Usage ──────────────────────────────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Usage</h2>
          <p className="text-[#CCCCCC] mb-4">
            We use your personal data to provide and improve the services you
            request. Where we use your data for marketing, you may opt out.
            Specific purposes include:
          </p>
          <ul className="list-disc list-inside text-[#CCCCCC] space-y-2">
            <li>Processing and fulfilling orders and bookings.</li>
            <li>Enhancing customer experience and troubleshooting issues.</li>
            <li>
              Sending confirmations, reminders, offers, products, services, and
              updates (online and offline).
            </li>
            <li>Detecting and preventing fraud or other criminal activity.</li>
            <li>
              Conducting research, analysis, and surveys to improve our
              offerings.
            </li>
            <li>Enforcing our terms and conditions.</li>
          </ul>
        </section>

        {/* ─── 3. Sharing ─────────────────────────────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Sharing</h2>
          <p className="text-[#CCCCCC] mb-4">
            We may share your personal data in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-[#CCCCCC] space-y-2">
            <li>
              Internally within our group entities and affiliates, who may
              market to you unless you opt out.
            </li>
            <li>
              With sellers, business partners, logistics providers, payment
              processors, reward‑program partners, and other service providers
              to facilitate transactions and services.
            </li>
            <li>
              With law‑enforcement agencies, government authorities, or third
              parties when required by law or to protect rights, property, or
              safety.
            </li>
          </ul>
        </section>

        {/* ─── 4. Security Precautions ───────────────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Security&nbsp;Precautions
          </h2>
          <p className="text-[#CCCCCC]">
            We adopt reasonable security practices—such as HTTPS encryption and
            secure servers—to protect your data from unauthorised access, loss,
            or misuse. Nevertheless, data transmission over the internet is not
            completely secure and involves inherent risks. You are responsible
            for safeguarding your login credentials.
          </p>
        </section>

        {/* ─── 5. Data Deletion & Retention ───────────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Data&nbsp;Deletion&nbsp;&amp;&nbsp;Retention
          </h2>
          <p className="text-[#CCCCCC] mb-4">
            You can delete your account via your profile settings or by
            contacting us. Deletion may be delayed if there are pending
            grievances, claims, shipments, or services. We retain personal data
            no longer than necessary for the purposes collected or as
            permissible by law, and may keep anonymised data for analytics.
          </p>
        </section>

        {/* ─── 6. Your Rights ─────────────────────────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="text-[#CCCCCC]">
            You may access, rectify, and update your personal data directly
            through the Platform’s account functionalities.
          </p>
        </section>

        {/* ─── 7. Consent ────────────────────────────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Consent</h2>
          <p className="text-[#CCCCCC] mb-4">
            By using our Platform or supplying information, you consent to the
            collection, storage, use, disclosure, and processing of your data as
            described here. If you provide data about others, you confirm that
            you have authority to do so. You may withdraw consent by emailing
            the Grievance Officer (see below) with the subject line “Withdrawal
            of consent for processing personal data.” Such withdrawal is not
            retrospective and may affect service availability.
          </p>
        </section>

        {/* ─── 8. Changes to this Privacy Policy ─────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to this Privacy Policy
          </h2>
          <p className="text-[#CCCCCC]">
            We may update this Policy to reflect changes in our practices or
            legal requirements. Please review it periodically. Significant
            changes will be notified as required by law.
          </p>
        </section>

        {/* ─── 9. Grievance Officer ──────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">9. Grievance Officer</h2>
          <ul className="list-none text-[#CCCCCC] space-y-1">
            <li>Insert Name of the Officer</li>
            <li>Designation</li>
            <li>Insert Name and Address of the Company</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Contact&nbsp;Us</h3>
          <ul className="list-disc list-inside text-[#CCCCCC] space-y-2">
            <li>
              Phone:&nbsp;
              <a
                href="tel:+919041013409"
                className="text-[#E99E1B] hover:underline"
              >
                +91&nbsp;90410&nbsp;13409
              </a>{" "}
              (Monday&nbsp;–&nbsp;Friday&nbsp;09:00–18:00)
            </li>
            <li>
              Email:&nbsp;
              <a
                href="mailto:proplaysports032@gmail.com"
                className="text-[#E99E1B] hover:underline"
              >
                proplaysports032@gmail.com
              </a>
            </li>
            <li>
              Address:&nbsp;
              <a
                href="https://maps.app.goo.gl/5QdYzyt2853gVvCS6?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E99E1B] hover:underline"
              >
                Ozmo&nbsp;Gym&nbsp;&amp;&nbsp;Spa –
                South&nbsp;City,&nbsp;Ludhiana
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
