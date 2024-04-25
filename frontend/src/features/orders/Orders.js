import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

  increment,
  
  incrementAsync,

  selectCount,
} from './ordersSlice';


export default function Orders() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
    
    </>
  );
}
