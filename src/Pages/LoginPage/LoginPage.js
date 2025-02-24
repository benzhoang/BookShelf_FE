import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "../../firebase";
import { userServ } from "../../service/userServie";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [signForm, setSignForm] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = () => {
    const loginForm = {
      email: username,
      password: password,
    };
    userServ.postLogin(loginForm)
      .then((res) => {
        console.log(res);
        navigate("/product");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate("/product");
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };
  
  return (
    <div style={{ height: "100vh", display: "flex", background: "#BEB9B9", justifyContent: "center", padding: "5%" }}>
      {!signForm ? (
        <div style={{ background: "white", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
          <h2>Login</h2>
          <p>Login to your account</p>
          <input type="email" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Email" className="w-full p-2 border rounded mb-4" />
          <div style={{ position: "relative", width: "100%" }}>
            <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" className="w-full p-2 border rounded pr-10" />
            <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
          </div>
          <button onClick={handleLogin} className="w-full bg-black text-white py-2 rounded mb-4">Login</button>
          <button onClick={handleSignInWithGoogle} className="w-full bg-gray-500 text-white py-2 rounded">Sign in with Google</button>
          <p>Don't have an account? <span onClick={() => setSignForm(true)} style={{ cursor: "pointer", color: "blue" }}>Sign up</span></p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
          <h2>Sign Up</h2>
          <p>Create your account</p>
          <input type="email" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Email" className="w-full p-2 border rounded mb-4" />
          <div style={{ position: "relative", width: "100%" }}>
            <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" className="w-full p-2 border rounded pr-10" />
            <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <input type={showRepassword ? "text" : "password"} onChange={(e) => setRepassword(e.target.value)} value={repassword} placeholder="Re-enter Password" className="w-full p-2 border rounded pr-10" />
            <button onClick={() => setShowRepassword(!showRepassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>{showRepassword ? <FaEyeSlash /> : <FaEye />}</button>
          </div>
          <button onClick={handleLogin} className="w-full bg-black text-white py-2 rounded mb-4">Sign Up</button>
          <button onClick={handleSignInWithGoogle} className="w-full bg-gray-500 text-white py-2 rounded">Sign in with Google</button>
          <p>Already have an account? <span onClick={() => setSignForm(false)} style={{ cursor: "pointer", color: "blue" }}>Login</span></p>
        </div>
      )}
    </div>
  );
}
