export async function fetchAllProducts(productId) {
    try {
      const response = await fetch("http://localhost:3002/item/items/");
      const data = await response.json();

      if (productId) {
        const product = data.find(product => product._id === productId);
        return product ? [product] : []; // Devuelve un array con el producto encontrado o un array vacío si no se encuentra
      }
      return data;
    } catch (error) {
      console.error('Error fetching data', error);
      return [];
    }
  }