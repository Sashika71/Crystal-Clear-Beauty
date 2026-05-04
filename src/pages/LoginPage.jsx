import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import logo from "../assets/images/logo 1.png";


    
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()
//   const loginWithGoogle=useGoogleLogin(
// {
//        onSuccess:(res)=>{
//         console.log(res)
//        }
//     }
//   )

const loginWithGoogle = useGoogleLogin({
		onSuccess: (res) => {
			setloading(true);
			axios
				.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
					accessToken: res.access_token,
				})
				.then((response) => {
					console.log("Login successful", response.data);
					toast.success("Login successful");
					localStorage.setItem("token", response.data.token);

					const user = response.data.user;
					if (user.role === "admin") {
						navigate("/admin");
					} else {
						navigate("/");
					}
					setloading(false);
				});
		},
	});


 function handleLogin() {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setloading(true)
    console.log("Login button clicked"); 

     axios.post(import.meta.env.VITE_BACKEND_URL+'/api/user/login',{
        email: email,
        password: password,
     })
     .then((response) => {
  

       console.log("Full response:", JSON.stringify(response.data, null, 2));
    console.log("User role:", response.data.role); 
        console.log("Login successful", response.data);
        toast.success("Login succesfull")
      localStorage.setItem("token",response.data.token);

     const user = response.data.user; // ✅ get the user object
if (user.role === "admin") {
    navigate("/admin");
} else {
    navigate("/");
}
setloading(false)

        
        
      })
      .catch((error) => {
        console.error("Login failed", error.response.data );
       toast.error(error.response.data.message||"Login failed");
       setloading(false)
      })

  }



    return(
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#ffeaf3_0%,_#fff6fb_38%,_#ffffff_100%)] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-pink-200/80 bg-white/55 p-6 shadow-[0_24px_70px_rgba(236,72,153,0.16)] backdrop-blur-2xl sm:p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
            <h1 className="text-2xl font-bold text-slate-900">Crystal Clear Beauty</h1>
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-pink-500">
            Welcome Back
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Sign in to continue your beauty shopping journey.
          </p>
        </div>

        <div className="space-y-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-pink-200 bg-white/80 px-4 text-slate-800 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            type="email"
            placeholder="Enter your email"
            value={email}
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-pink-200 bg-white/80 px-4 text-slate-800 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            type="password"
            placeholder="Enter your password"
            value={password}
          />
        </div>

        <button
          onClick={handleLogin}
          className="mt-5 h-12 w-full rounded-xl bg-pink-500 font-semibold text-white transition hover:bg-pink-600"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <button
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-pink-200 bg-white/80 font-semibold text-slate-700 transition hover:bg-pink-50"
          onClick={loginWithGoogle}
        >
          <GrGoogle className="mr-3" />
          {loading ? "Loading..." : "Continue with Google"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Dont have an account yet?
          <span className="ml-1 font-semibold text-pink-600 hover:text-pink-700">
            <Link to={"/register"}>Register Now</Link>
          </span>
        </p>
      </div>
    </div>
  ) 
    
}
