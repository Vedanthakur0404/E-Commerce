import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CartPage from './pages/CartPage';
import CheckOut from './features/checkOut/CheckOut';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import CheckOutPage from './pages/CheckOutPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>
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
    path: "/cart/:product_id",
    element:  <Protected>
      <CartPage></CartPage>
      </Protected>,
  },
  {
    path: "/cart",
    element:  <Protected>
      <CartPage></CartPage>
      </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected>  <CheckOutPage></CheckOutPage></Protected>,
  },
  
  {
    path: "/product-detail/:id",
    element: <Protected>  <ProductDetailPage></ProductDetailPage></Protected>,
  },
]);

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.customer.loggedInUser);
  console.log(user)
  // const user = useSelector(selectLoggedInUser)
  // useEffect(()=>{
  //   dispatch(fetchItemByUserIdAsync())
  // },[])
  return (
<RouterProvider router={router} />
  );
}

export default App;
