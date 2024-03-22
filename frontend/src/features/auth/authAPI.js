// import { useNavigation } from "react-router-dom";

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:3001/users`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject("Email Already Exist");
    }
  });
}

export function CheckUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:3001/users/login`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log("data given back is : ", data);
    if (data.success === true) {
      resolve({ data });
    } else {
      // console.log()
      reject({ message: "wrong credentials" });
    }
  });
}

// ?email=${userData.email}&password=${userData.password}
// export function checkUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//     const email = loginInfo.email;
//     const password = loginInfo.password;
//     const response = await fetch('http://localhost:8080/users?email=' + email);
//     const data = await response.json();
//     console.log({data})
//     if (data.length) {
//       if (password === data[0].password) {
//         resolve({ data: data[0] });
//       } else {
//         reject({ message: 'wrong credentials' });
//       }
//     } else {
//       reject({ message: 'user not found' });
//     }
//     // TODO: on server it will only return some info of user (not password)
//   });
// }
