import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import ProductList from './features/product List/PoductList';
import Navbar from './features/navbar/Navbar';
import Home from './pages/Home';
import Login from './features/auth/components/Login';
import Loginpage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


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
    element:<Loginpage></Loginpage>,
  },
]);

function App() {
  return (
<RouterProvider router={router} />
  );
}

export default App;
