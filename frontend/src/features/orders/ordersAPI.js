

import axios from 'axios';

export function insertOrders(user_id, address, products) {

  return new Promise(async (resolve) => {
    try {
      
      const response = await axios.post('http://localhost:3001/user/order/insert', {
        
        'user_id':user_id,
        'address':address,
        'products':products
      });
      // Assuming the response data is already in JSON format
      resolve({ data: response.data });
    } catch (error) {
      // Handle errors here
      console.error('Error fetching count:', error);
      resolve({ data: null });
    }
  });
}
