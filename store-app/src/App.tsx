import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from './components/Products.tsx'
import ShoppingCart from "./components/ShoppingCart.tsx";
import ProductDetails from './components/ProductDetails'

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/cart"
        element={<ShoppingCart />}
      />
      <Route 
      path="/products/:id" 
      element={<ProductDetails/>}
      />
    </Routes>

  )
}

export default App;