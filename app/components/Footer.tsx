// app/components/Footer.tsx

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Singles Court", href: "#booking" },
      { name: "Doubles Court", href: "#booking" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Info */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <img
                src="/logo.svg"
                alt="Proyard Padel"
                className="h-10 w-auto mr-2"
              />
            </Link>
            <p className="text-gray-300 mb-6">
              Premier padel court facilities for singles and doubles play. Book
              your court today and enjoy the game!
            </p>
            <div className="flex space-x-4">
              {/* Social icons */}
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* add other social icons here */}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-3 text-green-400 flex-shrink-0 mt-1"
                />
                <a
                  href="https://maps.app.goo.gl/5QdYzyt2853gVvCS6?g_st=com.google.maps.preview.copy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors underline"
                >
                  Ozmo Gym &amp; Spa – South City, Ludhiana
                </a>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="mr-3 text-green-400 flex-shrink-0"
                />
                <span className="text-gray-300 hover:text-white transition-colors">
                  +91 90410 13409
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 hover:text-white transition-colors">
                  proplaysports032@gmail.com
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/book-slots?courtId=court-1"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg transition-colors inline-block"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Proyard Padel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
