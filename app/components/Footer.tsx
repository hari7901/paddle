// app/components/Footer.tsx
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const ACCENT = "#E99E1B";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    services: [
      { name: "Singles Court", href: "#booking" },
      { name: "Doubles Court", href: "#booking" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cancellation Policy", href: "/cancellation" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-white text-black border-t border-black/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ---- brand & intro ---- */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <img
                src="/logo.svg"
                alt="Proyard Padel"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-black/70 mb-6">
              Premier padel facilities for singles and doubles. Reserve your
              court today and enjoy the game!
            </p>
            {/* social icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-black/60 hover:text-[##E99E1B] transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9V12h2.538V9.797C10.438 7.29 11.93 5.906 14.215 5.906c1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ---- services ---- */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {links.services.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-black/70 hover:text-[##E99E1B] transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- company ---- */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-black/70 hover:text-[##E99E1B] transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- contact ---- */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-[##E99E1B]" />
                <a
                  href="https://maps.app.goo.gl/v345SW8RqBTa8pJG9?g_st=iw"
                  target="_blank"
                  className="text-black/70 hover:text-[##E99E1B] underline transition-colors"
                >
                  Proyard Padel South City, Ludhiana
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-[##E99E1B]" />
                <span className="text-black/70 hover:text-[##E99E1B] transition-colors">
                  +91 90410 13409
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-[##E99E1B]" />
                <span className="text-black/70 hover:text-[##E99E1B] transition-colors">
                  proplaysports032@gmail.com
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/book-slots?courtId=court-1"
                className="inline-block bg-[##E99E1B] hover:bg-[#CF8A17]
                           text-black font-medium px-5 py-2 rounded-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* ---- bottom line ---- */}
        <div className="border-t border-black/10 mt-12 pt-6 text-center">
          <p className="text-sm text-black/60">
            © {year} Proyard Padel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
