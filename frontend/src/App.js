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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
    element:<CartPage></CartPage>,
  },
  {
    path: "/checkout",
    element:<CheckOut></CheckOut>,
  },
  {
    path: "/product-detail",
    element:<ProductDetailPage></ProductDetailPage>,
  },
]);

function App() {
  return (
<RouterProvider router={router} />
  );
}

export default App;
