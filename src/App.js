import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Layout from "./Layout/Layout";
import LoginPage from "./Pages/UserPage/LoginPage";
import ProductList from "./Pages/DashboardPage/ProductList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/listProduct" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
