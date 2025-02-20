import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Layout from "./Layout/Layout";
import LoginPage from "./Pages/UserPage/LoginPage";
import ProductList from "./Pages/DashboardPage/ProductList";
import OrderList from "./Pages/DashboardPage/OrderList";
import AccountList from "./Pages/DashboardPage/AccountList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/listProduct" element={<ProductList />} />
          <Route path="/orderList" element={<OrderList />} />
          <Route path="/accountList" element={<AccountList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
