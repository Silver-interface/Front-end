import React, { useState, useEffect } from 'react';
import styles from '@/src/styles/Destacados.module.css';
import Producto from './Producto';
import { useRouter } from 'next/router';
import ProductoDetalle from './DetalleProducto';

function Destacados() {
  const router = useRouter();
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProductosMasVendidos = async () => {
      try {
        const response = await fetch("http://localhost:3000/destacados");
        const data = await response.json();
        console.log(data);
        setProductosMasVendidos(data);
      } catch (error) {
        console.error("Error al cargar los productos mas vendidos:", error);
      }
    };
    fetchProductosMasVendidos();
  }, []);

  const openDetalleProducto = (product) => {
    setSelectedProduct(product); // Establecer el producto seleccionado
    router.push(`/catalogo?producto=${product.ID_PRODUCTO}`);
  };

  const closeDetalleProducto = () => {
    setSelectedProduct(null); // Limpiar el producto seleccionado
    router.push('/catalogo');
  };

  return (
    <div>
      <div className={styles.Card}>
        {productosMasVendidos.map((producto) => (
          <div key={producto.ID_PRODUCTO} onClick={() => openDetalleProducto(producto)}>
            <Producto
              ID_PRODUCTO={producto.ID_PRODUCTO}
              IMAGEN={producto.IMAGEN}
              NOMBRE_PRODUCTO={producto.NOMBRE_PRODUCTO}
              COLOR={producto.color.CODIGO_COLOR}
              PRECIO={producto.PRECIO}
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