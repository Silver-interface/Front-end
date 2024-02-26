import React, { useState, useEffect } from 'react';
import Footer from '@/src/components/Footer';
import NavbarHome from '@/src/components/NavbarHome';
import Producto from '@/src/components/Producto';
import TitleProducto from '@/src/components/TituloProducto';
import styles from '@/src/styles/catalogo.module.css';
import { fetchAllProducts } from '@/utils/api-products';
import Link from 'next/link';
import Filtro from '@/src/components/Filtro';

function catalogoPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <div>
      <NavbarHome />
      <TitleProducto />
      <div className={styles.Card}>
        <Filtro />
        {products.map((product) => (
          <div key={product._id}>
            <Link style={{ textDecoration: 'none' }} href={`/catalogo/${product._id}/detalleProducto`}>
              <Producto
                key={product._id}
                image={product.image}
                name={product.name}
                color={product.color}
                price={product.price}
              />
            </Link>
          </div>

        ))}
      </div>
      <Footer />
    </div>
  );
}


export default catalogoPage;