import axios from 'axios';



export  function fetchAllProducts(page) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3001/getalldata?page=${page}`)
    const data = await response.json()
    resolve({data})
  }
  );
}

export  function fetchByCategories(categoriesList, page) {

  let my_data ={ 'categories' : categoriesList}
  return new Promise(async (resolve) => {

    const response = await fetch(`http://localhost:3001/getCategories?categories=${categoriesList}&page=${page}`  , {method: "POST"})
    const data = await response.json()
    resolve({data})
  }
  );
}

