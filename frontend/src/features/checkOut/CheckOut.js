import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync } from "./checkOutSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getItemsFromCartAsync, removeItemsFromCartAsync } from "../cart/cartSlice";
import { useForm } from "react-hook-form";
import { addAddressAsync, getAddressAsync } from "./checkOutSlice";
import { insertOrdersAsync } from "../orders/ordersSlice";


export default function CheckOut() {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

 
  
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.customer.loggedInUser);
  const cart = useSelector((state) => state.cart.cart)
  const cartSize = useSelector((state) => state.cart.size)
  const addressList = useSelector((state) => state.checkout.addressList)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [addressName, setAddressName] = useState('')
  const [addressEmail, setAddressEmail] = useState('')
  const [addressPhone, setAddressPhone] = useState('')
  const [addressStreet, setAddressStreet] = useState('')
  const [addressCity, setAddressCity] = useState('')
  const [addressState, setAddressState] = useState('')
  const [addressPinCode, setAddressPinCode] = useState('')
  const [buttonController, setButtonController] = useState(0)
  const navigate = useNavigate();

  function handleOrder(){
    console.log("Clicked pay orders")
    console.log("address is ",selectedAddress)
    console.log("cart is ",cart)
    console.log ("user_id is ", user['id'])
    dispatch(insertOrdersAsync({'user_id' : user['id'], 'address':selectedAddress, 'orders':cart}))
    dispatch(getItemsFromCartAsync( user['id']))
    navigate('/')
  }



  useEffect(()=>{
    (dispatch(getItemsFromCartAsync(user['id'])))
    dispatch(getAddressAsync(user['id']))
  }, [dispatch, selectedAddress])

  function handleRemoveButton(product_id){
    dispatch(removeItemsFromCartAsync({'user_id':user['id'], 'prod_id':product_id}))
  }

  function handleSelectAddress(selectedAddress){
    selectedAddress = { ...selectedAddress, user_id: user['id'] };
    setButtonController(1)
    console.log(selectedAddress)
    setSelectedAddress(selectedAddress)
    // setAddressEmail(selectedAddress['email'])
    setValue("email", selectedAddress['email'])
    // setAddressCity(selectedAddress['city'])
    setValue("city", selectedAddress['city'])
    // setAddressPhone(selectedAddress['phone'])
    setValue("phone", selectedAddress['phone'])
    // setAddressState(selectedAddress['state'])
    setValue("state", selectedAddress['state'])
    // setAddressStreet(selectedAddress['street'])
    setValue("street", selectedAddress['street'])
    // setAddressName(selectedAddress['name'])
    setValue("name", selectedAddress['name'])
    // setAddressPinCode(selectedAddress['pinCode'])
    setValue("pinCode", selectedAddress['pinCode'])
    console.log(addressCity, addressEmail,  addressPhone, addressState, addressPinCode)
  }

  function handleEmailChange(event){
    if (buttonController === 1){
      setButtonController(2)
    }
    console.log("value and type of email", event.target.value, typeof event.target.value)
    setAddressEmail(event.target.value)
  }

  function handleNameChange(event){
    if (buttonController === 1){
      setButtonController(2)
    }
    console.log(event.target.value)
    setAddressName(event.target.value)
  }

  function handleStateChange(event){
    if (buttonController === 1){
      setButtonController(2)
    }
    console.log(event.target.value)
    setAddressState(event.target.value)
  }

  function handleCityChange(event){
    if (buttonController === 1){
      setButtonController(2)
    }
    console.log(event.target.value)
    setAddressCity(event.target.value)
  }

  function handlePinCodeChange(event){
    if (buttonController === 1){
      setButtonController(2)
    }
    console.log(event.target.value)
    setAddressPinCode(event.target.value)
  }

  function handlePhoneChange(event){
    if (buttonController === 1){
      setButtonController(2)
    }
    console.log(event.target.value)
    setAddressPhone(event.target.value)
  }

  function handleStreetChange(event){
    if (buttonController === 1){
      setButtonController(2)
    }
    console.log(event.target.value)
    // setAddressStreet(event.target.value)
    setValue("street", event.target.value)
  }


  const products =cart
  const total = cart.reduce((total, current) => {
    return total + current.price;
  }, 0);

  const watchEmail = watch("email", false)

  const address = addressList
  return (
    <>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid pl-5 grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <form className="bg-white px-5 mt-12" noValidate
            onSubmit={handleSubmit((data) => {
              console.log(typeof data['street'])
              console.log("errors here ",errors)
              dispatch(addAddressAsync({"userId":user['id'], 'address':data}))
              reset();
              setButtonController(0)
              //   setAddressEmail("")
              //   setAddressCity("")
              //   setAddressPhone("")
              //   setAddressState("")
              //   setAddressStreet("")
              //   setAddressName("")
              //   setAddressPinCode("")
              // console.log(errors)
            })}>
        
        <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      // value={addressName}
                      // onChange={(event)=>handleNameChange(event)}
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("name", {
                        onChange: (e) => {handleNameChange(e)},
                        required: "name is required",
                      })}
                    />
                  </div>
                </div>

                {/* <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      // value={addressEmail}
                      
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("email", {
                        onChange:(e)=> handleEmailChange(e),
                        required: "email is required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: "email not valid",
                        },
                      })}
                    />
                  </div>
                </div>

                {/* <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div> */}

                <div className="sm:col-span-4">
                  <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="phone-number"
                      id="phone-number"
                      // value = {addressPhone}
                      autoComplete="phone-number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("phone", {
                        onChange : (e)=>handlePhoneChange(e),
                        // setValueAs: addressPhone ,
                        required: "phone Number is required",
                        pattern:{
                          
                          value:/^\d{10}$/,
                          message:"should be of 10 Numbers"
                        }
                        })
                      }
                    />
                    {errors.phone && errors.phone.type === 'required' &&(
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      // value={addressStreet}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("street", {
                        onChange:(e)=>handleStreetChange(e),
                        required: "street is required",
                      })}
                   />
                   {errors.street && (
                  <p className="text-red-500">{errors.street.message}</p>
                   )}
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      // value={addressCity}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("city", {
                        onChange: (e)=> handleCityChange(e),
                        required: "city is required",
                      })}
                   />
                   {errors.city && (
                    
                  <p className="text-red-500">{errors.city.message}</p>
                   )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      // value={addressState}
                      id="state"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("state", {
                        required: "state is required",
                        onChange : (e)=>handleStateChange(e),
                      })}
                   />
                   {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                   )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="pinCode"
                      // value={addressPinCode}
                      id="pinCode"  
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("pinCode", {
                        onChange:(e)=> handlePinCodeChange(e),
                        required: "pin is required",
                        pattern:{
                          
                          value:/^\d{6}$/,
                          message:"Pin should be of 6 Numbers"
                        }
                        })
                      }
                    />
                    {errors.pinCode && (
                  <p className="text-red-500">{errors.pinCode.message}</p>
                )}
                  </div>
                </div>
                
              </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>{
                  setButtonController(0)
                  reset()}}>
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled = {buttonController === 1}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {buttonController === 0? 'Add Address' : 'Update Address'}
                </button>
          </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                 Existing Address
              </p>
              
              <ul role="list" className="divide-y scroll-smooth focus:scroll-auto divide-gray-100 max-h-[200px] overflow-y-auto">
      {address ? address.map((addres,i) => (
        <li  key={i} className="flex px-5 justify-between gap-x-6 py-5">
         
          <div className="flex min-w-0 gap-x-4">
          <input
                        onClick={()=>handleSelectAddress(address[i])}
                        // onClick={()=>{setValue("phone", address[i]['phone'])}}
                        id="address"
                        name="address"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{addres.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{addres.state}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{addres.pinCode}</p>
              


            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Phone {addres.phone}</p>
            <p className="text-sm leading-6 text-gray-900">{addres.city}</p>

            
          </div>
        </li>
      )):null}
    </ul>

              <div className="mt-10 space-y-10">

                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        name="payments"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                        Card Payment
                      </label>
                    </div>

                  </div>
                </fieldset>
              </div>
            </div>


          
        </form>
      </div>
      <div className="lg:col-span-2">
      <div className="mx-auto bg-white max-w-7xl mt-12 px-0 sm:px-0 lg:px-0">
        <div >
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5  font-bold tracking-tight text-gray-900">Cart</h1>
            <div className="flow-root">
              <ul
                role="list"
                className="-my-6 divide-y divide-gray-200"
              >
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>
                              {product.title}
                            </a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500 ">
                        <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                        Qty
                      </label>
                          <select>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>

                          </select>
                        </div>

                        <div className="flex">
                          <button
                           onClick={()=>handleRemoveButton(product.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button onClick={() => handleOrder() }
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Pay and Order
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to = '/'>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
    </div>
    </>
  );
}
