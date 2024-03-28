// A mock function to mimic making an async request for data
export  function insertInCart(user_id, product_id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3001/users/cart/insert?user_id=${user_id}&product_id=${product_id}`,{
      method: "POST",
    })
    const data = await response.json()
    resolve({data})
  }
  );
}

export  function getItemsFromCart(user_id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3001/users/cart/getProducts?user_id=${user_id}`)
    const data = await response.json()
    resolve({data})
  }
  );
}

export  function removeItemsFromCart(user_id,  product_id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3001/users/cart/remove?user_id=${user_id}&product_id=${product_id}`,{
      method: "POST"})
    const data = await response.json()
    resolve({data})
  }
  );
}

