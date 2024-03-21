import axios from 'axios';



export  function fetchAllProducts(page) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3001/getalldata?page=${page}`)
    const data = await response.json()
    resolve({data})
  }
  );
}

export  function fetchByCategories(categoriesList, page, brands) {

  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3001/getCategories?categories=${categoriesList}&page=${page}&brands=${brands}`  , {method: "POST"})
    const data = await response.json()
    resolve({data})
  }
  );
}


export function fetchProductById(id){
  return new Promise(async (resolve) => {
    console.log(id)
    const response = await fetch('http://localhost:3001/getProduct/'+id, {method: "GET"} )
    const data = await response.json()
    resolve({data})
  })
}
