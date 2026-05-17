import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <section
      id="contact"
      className="w-full grid gap-6 border-t border-pink-100 bg-white p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
    >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-800">
            Contact us
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            Let's build your storefront around the image you want.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            You can keep the default hero image or swap it with your own beauty banner later. The home layout is ready for product browsing, contact info, reviews, cart access, and login.
          </p>

          {/* Social Media Links */}
          <div className="mt-6 flex gap-4">
            <a
              href="https://www.facebook.com/crystalclearbeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-2xl text-pink-800 shadow-md transition hover:bg-pink-800 hover:text-white hover:-translate-y-1"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/crystalclearbeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-2xl text-pink-800 shadow-md transition hover:bg-pink-800 hover:text-white hover:-translate-y-1"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Email</p>
            <p className="mt-2 text-sm text-slate-600">hello@crystalclearbeauty.com</p>
          </div>

          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Phone</p>
            <p className="mt-2 text-sm text-slate-600">+94 77 123 4567</p>
          </div>

          <div className="rounded-2xl bg-pink-50 p-5 sm:col-span-2">
            <p className="text-sm font-semibold text-slate-900">Quick links</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link to="/products" className="rounded-full bg-white px-4 py-2 font-semibold text-pink-800 shadow-sm hover:shadow-md transition">
                Products
              </Link>
              <Link to="/cart" className="rounded-full bg-white px-4 py-2 font-semibold text-pink-800 shadow-sm hover:shadow-md transition">
                Cart
              </Link>
              <Link to="/login" className="rounded-full bg-white px-4 py-2 font-semibold text-pink-800 shadow-sm hover:shadow-md transition">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
}
