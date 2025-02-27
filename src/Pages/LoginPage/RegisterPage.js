import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../contexts/auth";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      console.log(userData);
      navigate("/product");
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        background: "#BEB9B9",
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <h2>Register</h2>
        <p>Create your account</p>

        <div style={{ width: "70%" }} className="mb-4">
          <input
            type="text"
            style={{
              width: "100%",
            }}
            className="w-full p-2 border rounded"
            placeholder="Username"
          />
        </div>

        <div style={{ width: "70%" }} className="mb-4">
          <input
            type="email"
            style={{
              width: "100%",
            }}
            className="w-full p-2 border rounded"
            placeholder="Email"
          />
        </div>

        <div
          style={{
            marginBottom: "5%",
            position: "relative",
            width: "70%",
          }}
        >
          <input
            style={{
              width: "100%",
            }}
            type={showPassword ? "text" : "password"}
            className="w-full p-2 border rounded pr-10"
            placeholder="Password"
          />
          <button
            style={{
              border: "none",
              background: "none",
              color: "blue",
              position: "absolute",
              left: "90%",
              top: "15%",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div
          style={{
            marginBottom: "5%",
            position: "relative",
            width: "70%",
          }}
        >
          <input
            style={{
              width: "100%",
            }}
            type={showPassword ? "text" : "password"}
            className="w-full p-2 border rounded pr-10"
            placeholder="Confirm Password"
          />
          <button
            style={{
              border: "none",
              background: "none",
              color: "blue",
              position: "absolute",
              left: "90%",
              top: "15%",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div
          style={{ fontSize: "12px", width: "70%" }}
          className="text-center text-sm text-gray-500 mb-4"
        >
          By creating your account or continue with Google, you agree to our
          <span className="font-semibold"> Terms and Conditions</span> and
          <span className="font-semibold">Privacy Policy</span>.
        </div>
        <button
          style={{ width: "70%" }}
          className="w-full bg-black text-white py-2 rounded mb-4"
        >
          Register
        </button>

        <hr style={{ width: "70%" }} />

        <button
          style={{
            border: "none",
            width: "70%",
            textAlign: "left",
            borderRadius: "10px",
            color: "white",
            background: "#BEB9B9",
            fontSize: "20px",
            padding: "5px  0 5px 10px",
          }}
          onClick={handleSignIn}
        >
          <img
            style={{ width: "10%", marginRight: "50px", borderRadius: 10 }}
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          SIGN IN WITH GOOGLE
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <a href="/" className="font-semibold text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
