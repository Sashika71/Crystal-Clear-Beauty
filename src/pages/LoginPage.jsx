import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";


    
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
         <div className="w-full h-screen bg-[url('/login-bg.jpg')] bg-cover flex justify-center items-center">
      {/* Login Card */}
      <div className="w-[450px] h-[500px] backdrop-blur-xl shadow-xl rounded-2xl bg-white/20 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-6">Login</h1>

        {/* Email Input */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="w-[400px] h-[50px] border border-white rounded-md px-4 mb-4 text-black"
          type="email"
          placeholder="Enter your email"
          value={email}
        />

        {/* Password Input */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-[400px] h-[50px] border border-white rounded-md px-4 mb-4 text-black"
          type="password"
          placeholder="Enter your password"
          value={password}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-[400px] h-[50px] bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
        >
       {
        loading ?"loading.....":"login" 
       }
        </button>
         
<button
						className="w-[400px] h-[50px] bg-green-500 mt-[20px] text-white rounded-xl cursor-pointer flex justify-center items-center"
						onClick={loginWithGoogle}
					>
						<GrGoogle className="mr-[10px]" />
						{loading ? "loading..." : "Login with Google"}
					</button>



        <p className="text-black text-color m-[10px]">
          Dont have an account yet?
          &nbsp;
          <span className="text-green-600 hover:text-green-900">
            <Link to={"/register"}>
            Register Now
            </Link>
            </span>
        </p>
      </div>
    </div>
  ) 
    
}
