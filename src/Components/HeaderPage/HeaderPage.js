import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './head.css'

export default function HeaderPage() {
  const [oSP, setOSP] = useState(false);
  const [oDH, setODH] = useState(false);
  const [oTK, setOTK] = useState(false);
  const [ol, setOl] = useState(false);
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);
  const [a3, setA3] = useState(false);
  const [a4, setA4] = useState(false);
  const navigate = useNavigate();
  


  return (
    <div>
      <p
        style={{
          marginBottom: "30%",
        }}
      >
        Hệ Thống Quản Lí
      </p>

      <p>Danh mục sản phẩm</p>
      <ul>
        <li
          onClick={() => setOSP(!oSP)}
          style={{ marginBottom: "20px", cursor: "pointer" }}
        >
          Quản Lý Sản Phẩm
        </li>
        {oSP && (
          <li
            className={a1 ? "active" : ""}
            onClick={() => {
              navigate('/product');
              setA1(true);
              setA2(false);
              setA3(false);
              setA4(false)
            }}
            style={{
              marginBottom: "20px",
              marginLeft: "50px",
              cursor: "pointer",
            }}
          >
            Danh Sách Sản Phẩm
          </li>
        )}
        <li
          onClick={() => setODH(!oDH)}
          style={{ marginBottom: "20px", cursor: "pointer" }}
        >
          Quản Lý Đơn Hàng
        </li>
        {oDH && (
          <li
            className={a2 ? "active" : ""}
            onClick={() => {
              navigate('/order');
              setA2(true);
              setA1(false);
              setA3(false);
              setA4(false)
            }}
            style={{
              marginBottom: "20px",
              marginLeft: "50px",
              cursor: "pointer",
            }}
          >
            Danh Sách Đơn Hàng
          </li>
        )}
        <li
          onClick={() => setOTK(!oTK)}
          style={{ marginBottom: "20px", cursor: "pointer" }}
        >
          Quản Lý Tài Khoản
        </li>
        {oTK && (
          <li
            className={a3 ? "active" : ""}
            onClick={() => {
              navigate('/account');
              setA3(true);
              setA1(false);
              setA2(false);
              setA4(false);
            }}
            style={{
              marginBottom: "20px",
              marginLeft: "50px",
              cursor: "pointer",
            }}
          >
            Danh Sách Tài Khoản
          </li>
        )}
      </ul>

      <p
      onClick={() => setOl(!ol)}
      style={{marginTop: '100px'}}>Tài Khoản</p>
      {ol && (
          <li
            className={a4 ? "active" : ""}
            onClick={() => {
              navigate('/');
              setA4(true);
              setA3(false);
              setA1(false);
              setA2(false);
            }}
            style={{
              marginBottom: "20px",
              marginLeft: "50px",
              cursor: "pointer",
            }}
          >
            Login
          </li>
        )}
    </div>
  );
}
