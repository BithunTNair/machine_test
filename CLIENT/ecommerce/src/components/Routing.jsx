import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import LogIn from "./Auth/LogIn";
import Home from "./Home/Home";
import ProductDetails from "./Products/ProductDetails";
import CartPage from "./Cart/CartPage";
import Checkout from "./CheckoutPage/Checkout";
import Success from "./CheckoutPage/Success";
import Orders from "./Orders/Orders"
const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout-page/:cartId" element={<Checkout />} />
          <Route path="/success-page" element={<Success />} />
            <Route path="/your-orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
