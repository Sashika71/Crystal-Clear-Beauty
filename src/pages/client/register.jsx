import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="w-full h-screen bg-[url('/login-bg.jpg')] bg-cover flex justify-center items-center">
      <div className="w-[480px] min-h-[620px] backdrop-blur-xl shadow-xl rounded-2xl bg-white/20 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-4">Register</h1>

        {/* First Name */}
        <input
          onChange={(e) => setFirstName(e.target.value)}
          className="w-[400px] h-[50px] border border-white rounded-md px-4 mb-3 text-black"
          type="text"
          placeholder="First Name"
          value={firstName}
        />

        {/* Last Name */}
        <input
          onChange={(e) => setLastName(e.target.value)}
          className="w-[400px] h-[50px] border border-white rounded-md px-4 mb-3 text-black"
          type="text"
          placeholder="Last Name"
          value={lastName}
        />

        {/* Email */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="w-[400px] h-[50px] border border-white rounded-md px-4 mb-3 text-black"
          type="email"
          placeholder="Email"
          value={email}
        />

        {/* Phone (optional) */}
        <input
          onChange={(e) => setPhone(e.target.value)}
          className="w-[400px] h-[50px] border border-white rounded-md px-4 mb-3 text-black"
          type="text"
          placeholder="Phone Number (optional)"
          value={phone}
        />

        {/* Password */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-[400px] h-[50px] border border-white rounded-md px-4 mb-3 text-black"
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
        />

        {/* Confirm Password */}
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-[400px] h-[50px] border border-white rounded-md px-4 mb-4 text-black"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
        />

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-[400px] h-[50px] rounded-md font-semibold ${
            loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-black text-color mt-[10px]">
          Already have an account?
          <span className="text-blue-600 hover:text-blue-900">
            <Link to={"/login"}> Login </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
