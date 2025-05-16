// app/cancellation/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy – Proyard Padel",
  description:
    "Understand our cancellation rules before you place a paddle-court booking with Proyard Padel.",
  robots: { index: false, follow: false },
};

export default function CancellationPolicy() {
  const ACCENT = "#E99E1B";

  return (
    <main className="bg-white text-black min-h-screen py-40 relative overflow-hidden">
      {/* accent line & soft blobs (same decorative scheme) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <h1 className="text-4xl font-bold mb-10">Cancellation Policy</h1>

        <section className="bg-black/5 border border-black/10 rounded-lg p-8 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            <span style={{ color: ACCENT }} className="mr-1">
              ●
            </span>
            No-Cancellation Rule
          </h2>
          <p className="text-black/80 leading-relaxed">
            Once a paddle-court booking is confirmed&nbsp;
            <strong>(i.e.&nbsp;payment is successfully completed)</strong>, it
            is&nbsp;
            <span style={{ color: ACCENT, fontWeight: 600 }}>
              non-refundable and cannot be cancelled or rescheduled
            </span>
            .&nbsp;We issue slots on a first-paid first-served basis and keep
            courts reserved exclusively for you; therefore, we cannot offer
            refunds for change-of-mind, lateness, or no-shows.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">
            Exceptions (Force Majeure)
          </h3>
          <p className="text-black/80">
            In the unlikely event that&nbsp; must cancel your booking for reasons
            beyond our c ontrol (e.g.&nbsp;government-mandated shutdown, severe
            weather that renders play unsafe, or court maintenance emergencies),
            we will offer either:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-black/80">
            <li>
              a free reschedule to an available slot of your choice, <em>or</em>
            </li>
            <li>A full refund will be credited within 7-8 days to your original payment method</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Need Help?</h3>
          <p className="text-black/80">
            If you believe your situation qualifies for an exception, email us
            at&nbsp;
            <a
              href="mailto:proplaysports032@gmail.com"
              className="underline hover:text-[##E99E1B]"
            >
              proplaysports032@gmail.com
            </a>
            &nbsp;or call&nbsp;
            <a
              href="tel:+919041013409"
              className="underline hover:text-[##E99E1B]"
            >
              +91&nbsp;90410&nbsp;13409
            </a>
            . Requests must be submitted <strong>before</strong> your scheduled
            time slot.
          </p>
        </section>
      </div>
    </main>
  );
}
