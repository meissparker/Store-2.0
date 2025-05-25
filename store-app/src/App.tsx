import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage.tsx'
import ShoppingCart from "./components/ShoppingCart.tsx";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
      path="/"
      element={<HomePage/>}
      />
    <Route
    path="/cart"
    element={<ShoppingCart/>}
    />
    </Routes>

  )
}

export default App;