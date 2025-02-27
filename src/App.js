import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import ProductList from "./Pages/DashboardPage/ProductList";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/LoginPage/RegisterPage";
import OrderList from "./Pages/DashboardPage/OrderList";
import AccountList from "./Pages/DashboardPage/AccountList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/product" element={<Layout Component={ProductList} />} />
          <Route path="/order" element={<Layout Component={OrderList} />} />
          <Route path="/account" element={<Layout Component={AccountList} />} />
          <Route path="/" element={<Layout Component={LoginPage} />} />
          <Route
            path="/register"
            element={<Layout Component={RegisterPage} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
