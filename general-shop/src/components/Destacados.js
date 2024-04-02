import React, {useState, useEffect} from 'react';
import styles from '@/src/styles/Destacados.module.css';
import Image from 'next/image';
import Producto from './Producto';
import { useRouter } from 'next/router';
import ProductoDetalle from './DetalleProducto';

function Destacados() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/productos/detalle");
        const data = await response.json(); 
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    loadProducts();

     // Leer el parámetro de la URL para obtener el producto seleccionado
     const loadSelectedProduct = async () => {
      const { producto } = router.query;
      if (producto && products.length > 0) {
        const selected = products.find((p) => p.ID_PRODUCTO === Number(producto));
        setSelectedProduct(selected);
      }
    };
    loadSelectedProduct();
  }, [router.query]); // Agregar router.query a la dependencia de useEffect

  const openDetalleProducto = (product) => {
    setSelectedProduct(product);
    router.push(`/catalogo?producto=${product.ID_PRODUCTO}`);
  };

  const closeDetalleProducto = () => {
    setSelectedProduct(null);
    router.push('/catalogo');
  };


  // Renderizar solo el producto seleccionado si está presente
  if (selectedProduct) {
    return (
      <div>
        <ProductoDetalle product={selectedProduct} onClose={closeDetalleProducto} />
      </div>
    );
  }

  //prueba
  const idsToRender = [12, 24, 18, 48, 23];
  const productosFiltrados = products.filter(producto => idsToRender.includes(producto.ID_PRODUCTO));


  return (
    <div>
      <div className={styles.Card}>
        {productosFiltrados.map((product) => (
          <div key={product.ID_PRODUCTO} onClick={() => openDetalleProducto(product)}>
            <Producto
              ID_PRODUCTO={product.ID_PRODUCTO}
              IMAGEN={product.IMAGEN}
              NOMBRE_PRODUCTO={product.NOMBRE_PRODUCTO}
              COLOR={product.color.CODIGO_COLOR}
              PRECIO={product.PRECIO}
            />
          </div>
        ))}
        {/* Renderiza el detalle del producto si está seleccionado */}
        {selectedProduct && (
          <ProductoDetalle product={selectedProduct} onClose={closeDetalleProducto} />
        )}
      </div>
    </div>
  );
}

    
export default Destacados;