import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo 1.png";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone]         = useState("");
  const [loading, setLoading]     = useState(false);

  const navigate = useNavigate();

  function validateInputs() {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      toast.error("Please fill all required fields.");
      return false;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Password length check (adjust minimum as needed)
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    // Confirm password
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  }

  async function handleRegister() {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,        // send raw password — backend should hash
      };
      // only include phone if provided (no defaults)
      if (phone.trim()) payload.phone = phone.trim();

      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/user/",
        payload
      );

      toast.success(res.data?.message || "Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#ffeaf3_0%,_#fff6fb_38%,_#ffffff_100%)] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-pink-200/80 bg-white/55 p-6 shadow-[0_24px_70px_rgba(236,72,153,0.16)] backdrop-blur-2xl sm:p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
            <h1 className="text-2xl font-bold text-slate-900">Crystal Clear Beauty</h1>
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#ef8275]">
            Create Account
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Join us to start your beauty journey.
          </p>
        </div>

        <div className="space-y-4">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="h-12 w-full rounded-xl border border-pink-200 bg-white/80 px-4 text-slate-800 placeholder-slate-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            type="text"
            placeholder="First Name"
            value={firstName}
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            className="h-12 w-full rounded-xl border border-pink-200 bg-white/80 px-4 text-slate-800 placeholder-slate-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            type="text"
            placeholder="Last Name"
            value={lastName}
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-pink-200 bg-white/80 px-4 text-slate-800 placeholder-slate-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            type="email"
            placeholder="Enter your email"
            value={email}
          />

          <input
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 w-full rounded-xl border border-pink-200 bg-white/80 px-4 text-slate-800 placeholder-slate-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            type="tel"
            placeholder="Phone Number (optional)"
            value={phone}
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-pink-200 bg-white/80 px-4 text-slate-800 placeholder-slate-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
          />

          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-pink-200 bg-white/80 px-4 text-slate-800 placeholder-slate-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="mt-5 h-12 w-full rounded-xl bg-pink-500 font-semibold text-white transition hover:bg-pink-600 disabled:bg-slate-300"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?
          <span className="ml-1 font-semibold text-pink-600 hover:text-pink-700">
            <Link to={"/login"}> Login </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
