import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Products from './components/Products.tsx'
import ShoppingCart from "./components/ShoppingCart.tsx";
import ProductDetails from './components/ProductDetails'
import Login from './components/Login';
import Register from './components/Register'; 
import PrivateRoute from './components/PrivateRoute';
import Profile from "./components/Profile.tsx";
import ManageProducts from "./components/ManageProducts.tsx";
import UploadProductsPage from "./UploadProductsPage.tsx";
import OrderDetails from "./components/OrderDetails.tsx";
import Orders from "./components/Orders.tsx";


const App: React.FC = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
        <PrivateRoute>
          <Products />
        </PrivateRoute>}
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <ShoppingCart />
          </PrivateRoute>}
      />

      <Route 
      path="/products/:id" 
      element={
        <PrivateRoute>
          <ProductDetails />
        </PrivateRoute>}
        />

        <Route 
      path="/profile" 
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>}
        />

      <Route 
      path="/admin/products" 
      element={
        <PrivateRoute>
          <ManageProducts />
        </PrivateRoute>}
        />

      <Route 
      path="/orders/:id" 
      element={
        <PrivateRoute>
          <OrderDetails />
        </PrivateRoute>}
        />

      <Route 
      path="/orders" 
      element={
        <PrivateRoute>
          <Orders />
        </PrivateRoute>}
        />
  
      <Route 
      path="/login" 
      element={<Login/>}
      />

      <Route 
      path="/register" 
      element={<Register/>}
      />

      <Route 
      path="/admin/uploadproducts" 
      element={
        <PrivateRoute>
          <UploadProductsPage />
        </PrivateRoute>}
        />

    </Routes>

  )
}

export default App;