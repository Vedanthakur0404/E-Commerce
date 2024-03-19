import axios from 'axios';



export  function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3001/getalldata')
    const data = await response.json()
    resolve({data})
  }
  );
}

export  function fetchByCategories(categoriesList) {
  let my_data ={ 'categories' : categoriesList}
  return new Promise(async (resolve) => {
    console.log('0000000000000000000000')
    const response = await fetch(`http://localhost:3001/getCategories?categories=${categoriesList}`  , {method: "POST"})
    const data = await response.json()
    resolve({data})
  }
  );
}

