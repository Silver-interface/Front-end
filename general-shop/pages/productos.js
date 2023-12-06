import React, { useState, useEffect } from 'react';
import Footer from '@/src/components/Footer';
import NavbarHome from '@/src/components/NavbarHome';
import Producto from '@/src/components/Producto';
import styles from '../src/styles/Producto.module.css';

function ProductosPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character`);  
        const data = await response.json();
        setProducts(data.results);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <NavbarHome />
      <div className={styles.imageProducto}>
        {products.map((product) => (
          <Producto
            key={product.id}
            imagen={product.image}

            width={246}
            alt={product.name}
            nombre={product.name}
            colores={['blue', '#5CDF87', '#DF7B5C']}
            precio='$42.000'
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProductosPage;