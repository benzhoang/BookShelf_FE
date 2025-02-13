import React, { use, useEffect, useState } from 'react';
import './login.css';
import { Button, Checkbox, Form, Input } from 'antd';

const LoginPage = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRePass] = useState("");
  

  
  const handleLogin = () =>{
    console.log({email,pass})
    
  }

  const handleSignUp = () =>{
    console.log({email,pass,repass})
  }



  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ display: 'flex' }}>
      <div
        className='img-login-bg'
        style={{
          backgroundColor: "#FF9513",
          width: '40%',
          height: '100vh',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '0',
          }}
          className={`ard ${isRegisterActive ? 'register-active' : ''}`}
        >
          <p
            className={`login-animate ${!isRegisterActive ? 'active' : ''}`}
            onClick={() => setIsRegisterActive(false)} // Đổi trạng thái về false
          >
            ĐĂNG NHẬP
          </p>
          <p
            className={`login-animate ${isRegisterActive ? 'active' : ''}`}
            onClick={() => setIsRegisterActive(true)} // Đổi trạng thái về true
          >
            ĐĂNG KÝ
          </p>
        </div>
      </div>
      <div style={{
        position: 'relative',
        width: '60%'
      }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              marginTop: '7%',
              marginBottom: '5%'
            }}
          >BOOKSHELF</h1>
          {/* login */}
          <div>
            <div className="App">
              <div
               className={`disable ${!isRegisterActive ? 'input-container avaiable' : ''}`}
               >
                <span className="icon">
                  <i class="fa fa-user-circle"></i>
                </span>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Email/ Số điện thoại"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div
                className={`disable ${!isRegisterActive ? 'input-container avaiable' : ''}`}
              >
                <span className="icon">
                  <i class="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="custom-input"
                  placeholder="Mật khẩu"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: '65%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <p
              className={`disable ${!isRegisterActive ? 'avaiable' : ''}`}
            style={{
              fontSize: '20px',
              color: '#FF9513',
              cursor: 'pointer'
            }}>Quên mật khẩu ?</p>
            <button 
            onClick={handleLogin}
            className={`disable ${!isRegisterActive ? 'btn-login avaiable' : ''}`}
            >Đăng Nhập</button>
          </div>
          {/* end login */}
          {/* signup */}
          <div>
            <div
            style={{
              marginTop: '-40px'
            }}
            className="App">
              <div
                className={`input-container ${!isRegisterActive ? 'disable' : ''}`}
              >
                <span className="icon">
                  <i class="fa fa-user-circle"></i>
                </span>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Email/ Số điện thoại"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div 
                className={`input-container ${!isRegisterActive ? 'disable' : ''}`}
              >
                <span className="icon">
                  <i class="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="custom-input"
                  placeholder="Mật khẩu"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div 
                className={`input-container ${!isRegisterActive ? 'disable' : ''}`}
              >
                <span className="icon">
                  <i class="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="custom-input"
                  placeholder="Nhập lại mật khẩu"
                  value={repass}
                  onChange={(e) => setRePass(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: '65%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          > 
          <p></p>
            <button
                onClick={handleSignUp}
                className={`btn-login ${!isRegisterActive ? 'disable' : ''}`}
            >Đăng Ký</button>
          </div>
          {/* end signup */}
        </div>


        {/* footer login */}
        <div
          className='footer-login'
          style={{
            position: 'absolute',
            bottom: '0',
            backgroundColor: '#9292924D',
            width: '60vw',
            fontSize: '24px',
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '10px'
          }}>
          <p>Hoặc</p>
          <p>
            <i
              style={{
                marginRight: '10px'
              }}
              class="fab fa-google"></i>
            <span>Google</span>
          </p>
          <p><i
            style={{
              marginRight: '10px',
              color: '#1877F2'
            }}
            class="fab fa-facebook"></i>
            <span>Facebook</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
