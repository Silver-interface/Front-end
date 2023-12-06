import React, { useState, useEffect } from 'react';
import Footer from '@/src/components/Footer';
import NavbarHome from '@/src/components/NavbarHome';
import Producto from '@/src/components/Producto';
import styles from '../src/styles/productos.module.css';
import TitleProducto from '@/src/components/TituloProducto';
import Filtro from '@/src/components/Filtro';



function ProductosPage() {
  const [products, setProducts] = useState([]);

  //dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);

  const productClick = (product) => {
    setDialogOpen(true);
    setSelectProduct(product);
  };

  const closeProduct = () => {
    setDialogOpen(false);
    setSelectProduct(null);
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <NavbarHome />
      <TitleProducto />

      {/* <Filtro/> */}
      <div className={styles.imageProducto}>
        {products.map((product) => (
          <Producto
            key={product.id}
            onClick={() => productClick(product)}
            imagen={product.image}
            alt={product.title}
            nombre={product.title}
            colores={['blue', '#5CDF87', '#DF7B5C']}
            talla={['XS  ', '  S', '  M']}
            precio={product.price}
          />
        ))}

      </div>
      {dialogOpen && (
        <div className={styles.modalContainer} onClick={closeProduct}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            
            {selectProduct && (
              <div className={styles.productDetails}>
                <div className={styles.imgProduct}>
                <img src={selectProduct.image} alt={selectProduct.title}/>
                </div>
                <div className={styles.infoProduct}>
                <p>Nombre: {selectProduct.title}</p>
                <p>Precio: {selectProduct.price}</p>
                <p>Descripcion: {selectProduct.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

      )}

      <Footer />
    </div>
  );
}

export default ProductosPage;