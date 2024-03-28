// A mock function to mimic making an async request for data
export function addAddress(userId, myaddress) {
  console.log(userId, myaddress)
  console.log(myaddress['city'])
  // 'user_id': '3ca250d8-6b5f-4603-bf15-47a6389ed00euserId',
  myaddress.user_id = userId
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3001/users/addAddress', {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      myaddress
      
    )
    })
    const data = await response.json()
    resolve({data})
  }
  );
}




export function getAddress(userId) {
  // 'user_id': '3ca250d8-6b5f-4603-bf15-47a6389ed00euserId',
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3001/users/addAddress?user_id=${userId}`)
    const data = await response.json()
    resolve({data})
  }
  );
}