import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../contexts/auth";
import { userServ } from "../../service/userServie";
import { localUserServ } from "../../service/localService";
import {
  setLoginAction,
  setLoginActionService,
} from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import { notification } from "antd";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [signForm, setSignForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const handleLogin = () => {
    const loginForm = {
      email: username,
      password: password,
    };
    console.log(loginForm);
    userServ
      .postLogin(loginForm)
      .then((res) => {
        localUserServ.set(res.data);
        dispatch(setLoginAction(res.data));
        navigate("/product");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUp = () => {
    const processedUsername = username.replace("@gmail.com", "");
    if (!password && !username && !repassword) {
      openNotification("error", "Lỗi", "vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password !== repassword) {
      openNotification("error", "Lỗi", "mật khẩu không trùng khớp");
    } else {
      const loginForm = {
        userName: processedUsername,
        email: username,
        password: password,
        role: "Staff",
      };
      userServ
        .postSignUp(loginForm)
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            openNotification("success", "Thành công", "Đăng ký thành công");
          }, 500);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          openNotification("error", "Lỗi", err.response.data.message);
        });
      console.log(loginForm);
    }
  };

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
        padding: "5%",
      }}
    >
      {contextHolder}
      {/* Login */}
      {!signForm && (
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
          <h2>Login</h2>
          <p>Login to your account</p>

          <div style={{ width: "70%" }} className="mb-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="email"
              style={{ width: "100%" }}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
          </div>

          <div
            style={{ marginBottom: "5%", position: "relative", width: "70%" }}
          >
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{ width: "100%" }}
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
            style={{ fontSize: "12px", width: "70%" }}
            className="text-center text-sm text-gray-500 mb-4"
          >
            By logging in or continuing with Google, you agree to our
            <span className="font-semibold">Terms and Conditions</span> and{" "}
            <span className="font-semibold">Privacy Policy</span>.
          </div>

          <button
            onClick={handleLogin}
            style={{ width: "70%" }}
            className="w-full bg-black text-white py-2 rounded mb-4"
          >
            Login
          </button>

          <hr style={{ width: "70%" }} />

          <button
            onClick={handleSignIn}
            style={{
              border: "none",
              width: "70%",
              textAlign: "left",
              borderRadius: "10px",
              color: "white",
              background: "#BEB9B9",
              fontSize: "16px",
              padding: "10px 0 5px 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "10%", marginRight: "10px" }}
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
            />
            SIGN IN WITH GOOGLE
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setSignForm(true)}
              className="font-semibold"
            >
              Sign up
            </span>
          </p>
        </div>
      )}

      {/* Sign Up */}
      {signForm && (
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5% 10%",
          }}
        >
          <h2>Sign Up</h2>
          <p>Create your account</p>

          <div style={{ width: "100%" }} className="mb-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="email"
              style={{ width: "100%" }}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
          </div>

          <div
            style={{ marginBottom: "5%", position: "relative", width: "100%" }}
          >
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{ width: "100%" }}
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
            style={{ marginBottom: "5%", position: "relative", width: "100%" }}
          >
            <input
              onChange={(e) => setRepassword(e.target.value)}
              value={repassword}
              style={{ width: "100%" }}
              type={showRepassword ? "text" : "password"}
              className="w-full p-2 border rounded pr-10"
              placeholder="Re-enter Password"
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
              onClick={() => setShowRepassword(!showRepassword)}
            >
              {showRepassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            onClick={handleSignUp}
            style={{ width: "100%" }}
            className="w-full bg-black text-white py-2 rounded mb-4"
          >
            Sign Up
          </button>

          <hr style={{ width: "70%" }} />

          <button
            onClick={handleSignIn}
            style={{
              border: "none",
              width: "100%",
              textAlign: "left",
              borderRadius: "10px",
              color: "white",
              background: "#BEB9B9",
              fontSize: "16px",
              padding: "10px 0 5px 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "10%", marginRight: "10px" }}
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
            />
            SIGN IN WITH GOOGLE
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setSignForm(false)}
              className="font-semibold"
            >
              Login
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
