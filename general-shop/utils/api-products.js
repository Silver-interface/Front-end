export async function ApiProducts(productId) {
    try {
      const response = await fetch("http://localhost:3000/productos/detalle");
      
      const data = await response.json();
      
      if (productId) {
        const product = data.find(product => product.ID_PRODUCTO === productId);
        return product ? [product] : []; // Devuelve un array con el producto encontrado o un array vacío si no se encuentra
      }
      return data;
    } catch (error) {
      console.error('Error fetching data', error);
      return [];
    }
  }