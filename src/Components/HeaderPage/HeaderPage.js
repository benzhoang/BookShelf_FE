import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./head.css";
import { bookServ } from "../../service/appService";

export default function HeaderPage() {
  const [oSP, setOSP] = useState(false);
  const [oDH, setODH] = useState(false);
  const [oTK, setOTK] = useState(false);
  const [ol, setOl] = useState(false);
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);
  const [a3, setA3] = useState(false);
  const [a4, setA4] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Kiểm tra nếu user đã đăng nhập
  useEffect(() => {
    bookServ
      .getProfile()
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  // Hàm logout
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">Hệ Thống Quản Lí</div>

      <div className="category-title">Danh mục sản phẩm</div>
      {user && (
        <ul className="nav-list">
          <li className="nav-item" onClick={() => setOSP(!oSP)}>
            Quản Lý Sản Phẩm
          </li>
          {oSP && (
            <li
              className={`submenu-item ${a1 ? "active" : ""}`}
              onClick={() => {
                navigate("/product");
                setA1(true);
                setA2(false);
                setA3(false);
                setA4(false);
              }}
            >
              Danh Sách Sản Phẩm
            </li>
          )}
          <li className="nav-item" onClick={() => setODH(!oDH)}>
            Quản Lý Đơn Hàng
          </li>
          {oDH && (
            <li
              className={`submenu-item ${a2 ? "active" : ""}`}
              onClick={() => {
                navigate("/order");
                setA2(true);
                setA1(false);
                setA3(false);
                setA4(false);
              }}
            >
              Danh Sách Đơn Hàng
            </li>
          )}
          {user?.role === "Admin" && (
            <li className="nav-item" onClick={() => setOTK(!oTK)}>
              Quản Lý Tài Khoản
            </li>
          )}
          {oTK && user?.role === "Admin" && (
            <li
              className={`submenu-item ${a3 ? "active" : ""}`}
              onClick={() => {
                navigate("/account");
                setA3(true);
                setA1(false);
                setA2(false);
                setA4(false);
              }}
            >
              Danh Sách Tài Khoản
            </li>
          )}
        </ul>
      )}

      <div className="account-section">
        <div className="category-title" onClick={() => setOl(!ol)}>
          Tài Khoản
        </div>
        {ol && (
          <div className="user-info">
            {user ? (
              <>
                <span>Xin chào, {user.userName}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <span className="nav-item" onClick={() => navigate("/")}>
                Đăng nhập
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
