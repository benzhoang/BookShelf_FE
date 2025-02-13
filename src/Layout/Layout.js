import React from "react";
import HeaderPage from "../Components/HeaderPage/HeaderPage";

export default function ({ Component }) {
  return (
    <div
      style={{
        display: "flex",
        height: '100vh'
      }}
    >
      <div style={{
        width: '30%',
        background : '#4A4A4A',
        color: 'white',
        padding: '1%'
      }}>
        <HeaderPage />
      </div>
      <div style={{
        width:  '70%'
      }}>
        <Component />
      </div>
    </div>
  );
}
