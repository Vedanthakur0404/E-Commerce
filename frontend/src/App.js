import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Navbar from './features/navbar/Navbar';
import Home from './pages/Home';
import Login from './features/auth/components/Login';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CartPage from './pages/CartPage';
import CheckOut from './features/checkOut/CheckOut';
import ProductDetail from './features/product/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/login",
    element:<LoginPage></LoginPage>,
  },

  // Only for testing
  {
    path: "/cart",
    element:  <Protected>
      <CartPage></CartPage>
      </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected>  <CheckOut></CheckOut></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected>  <ProductDetailPage></ProductDetailPage></Protected>,
  },
]);

function App() {
  return (
<RouterProvider router={router} />
  );
}

export default App;
