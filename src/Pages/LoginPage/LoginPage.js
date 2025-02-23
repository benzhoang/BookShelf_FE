import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      background: '#BEB9B9',
      justifyContent: 'center',
      padding: '5%'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px'
      }}>
        <h2 >Login</h2>
        <p >Login to your account</p>
        
        <div style={{width: '70%'}} className="mb-4">
          <input type="email" style={{
            width: '100%'
          }} className="w-full p-2 border rounded" placeholder="Email" />
        </div>
        
        <div style={{
          marginBottom: '5%',
          position: 'relative',
          width: '70%'
        }}>
          <input 
          style={
            {
              width: '100%'
            }
          }
            type={showPassword ? "text" : "password"} 
            className="w-full p-2 border rounded pr-10" 
            placeholder="Password" 
          />
          <button 
            style={{
              border: 'none',
              background: 'none',
              color: 'blue',
              position: 'absolute',
              left: "90%",
              top: '15%'
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        <div style={{textAlign: 'left'}} className="flex justify-between text-sm mb-4">
          <label style={{ fontSize: '12px'}} className="flex items-center mr-5">
            <input  type="checkbox"  /> Remember password
          </label>
          <a href="#" className="text-blue-500 ">Forgot Password?</a>
        </div>
        <div style={{ fontSize: '12px', width: '70%'}} className="text-center text-sm text-gray-500 mb-4">
          By creating your account or continue with Google, you agree to our
          <span className="font-semibold"> Terms and Conditions</span> and <span className="font-semibold">Privacy Policy</span>.
        </div>
        <button style={{width: '70%'}} className="w-full bg-black text-white py-2 rounded mb-4">Login</button>
        
        <hr style={{width: "70%"}}/>
        
        <button style={{
          border:'none',
          width: '70%',
          textAlign: 'left',
          borderRadius: '10px',
          color: 'white',
          background: '#BEB9B9',
          fontSize: '20px',
          padding: '10px 0 5px 0'
        }}>
          <img style={{ width: '10%',marginRight: '50px' }} src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
          SIGN IN WITH GOOGLE
        </button>
        
        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="#" className="font-semibold text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}
