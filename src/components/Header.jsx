import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import logo from "../assets/images/logo 1.jpeg";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Crystal Clear Beauty" className="h-14 w-auto" />
          <span className="text-lg font-semibold uppercase tracking-[0.35em] text-pink-800 sm:text-base">
            Crystal Clear Beauty
          </span>
        </Link>

        <nav className="hidden flex-wrap items-center justify-center gap-4 text-lg font-medium text-slate-700 sm:flex sm:gap-6">
          <Link to="/" className="transition hover:text-pink-800">
            Home
          </Link>
          <Link to="/products" className="transition hover:text-pink-800">
            Products
          </Link>
          <Link to="/contact" className="transition hover:text-pink-800">
            Contact us
          </Link>
          <Link to="/reviews" className="transition hover:text-pink-800">
            Review
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-200 bg-white text-xl text-pink-800 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-md"
            aria-label="Cart"
          >
            <BsCart4 />
          </Link>
          <Link
            to="/login"
            className="inline-flex h-10 items-center rounded-full bg-pink-800 px-5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-900"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
