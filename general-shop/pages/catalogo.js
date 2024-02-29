import React, { useState, useEffect } from 'react';
import Footer from '@/src/components/Footer';
import NavbarHome from '@/src/components/NavbarHome';
import Producto from '@/src/components/Producto';
import TitleProducto from '@/src/components/TituloProducto';
import styles from '@/src/styles/catalogo.module.css';
import { ApiProducts } from '@/utils/api-products';
import ProductoDetalle from '@/src/components/detalleProducto';
import { useRouter } from 'next/router';
import Image from 'next/image';

function catalogoPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [seccion, setSeccion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  useEffect(() => {
    const loadProducts = async () => {
      const data = await ApiProducts();
      setProducts(data);
    };
    loadProducts();

    // Leer el parámetro de la URL para obtener la sección
    const { seccion } = router.query;
    if (seccion) {
      setSeccion(seccion);
    }

    // Leer el parámetro de la URL para obtener el producto seleccionado
    const { producto } = router.query;
    if (producto) {
      const selected = products.find((p) => p.ID_PRODUCTO === Number(producto));
      setSelectedProduct(selected);
    }
  }, [router.query, products]); // Agregar router.query a la dependencia de useEffect

  const openDetalleProducto = (product) => {
    setSelectedProduct(product);
    router.push(`/catalogo?producto=${product.ID_PRODUCTO}`);
  };

  const closeDetalleProducto = () => {
    setSelectedProduct(null);
    router.push('/catalogo');
  };

  const filteredProducts = seccion
    ? products.filter(product => product.seccion.NOMBRE_SECCION.toLowerCase() === seccion.toLowerCase())
    : products;

  // Renderizar solo el producto seleccionado si está presente
  if (selectedProduct) {
    return (
      <div>
        <NavbarHome />
        <ProductoDetalle product={selectedProduct} onClose={closeDetalleProducto} />
        <Footer />
      </div>
    );
  }

  // Paginacion, calcular inicio y final
  const indexLastCard = currentPage * cardsPerPage;
  const indexFirstCard = indexLastCard - cardsPerPage;
  const currentCards = filteredProducts.slice(indexFirstCard, indexLastCard);

  // Cambiar de página
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

  return (
    <div>
      <NavbarHome />
      <TitleProducto />
      <div className={styles.Card}>
        {/* <Filtro colores ={colores} product={products} /> */}
        {currentCards.map((product) => (
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
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
        <Image className={styles.back} src={require('@/public/image/backpage.png')}
          width={30}
          height={30} />
          Previous Page</button>
        <span> {currentPage} de {totalPages}</span>
        <button onClick={nextPage} disabled={indexLastCard >= filteredProducts.length}>Next Page  
        <Image className={styles.next} src={require('@/public/image/nextpage.png')}
          width={30}
          height={30} />
        </button>
      </div>
      <Footer />
    </div>
  );
}


export default catalogoPage;