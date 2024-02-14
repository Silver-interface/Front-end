import React, { useEffect } from 'react';
import styles from '../styles/NavbarHome.module.css';
import Image from 'next/image';
import { obtenerCirculosDeColores } from './Producto';
import { useState } from 'react';
import Link from 'next/link';
import Usuario from './Usuario';


function NavbarHome({ isAuthenticated, onLogout }) { //prop isAuthenticated para mostrar iconos en la barra de navegación.
  console.log("NavbarHome - isAuthenticated:", isAuthenticated);

  const [product, setProduct] = useState([]);  // variable de estado del input
  const [productMatch, setProductMatch] = useState([]); //estado para coincidencia
  const [selectProduct, setSelectProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  //para el carousel de la ventana emergente


  //funcion redireccionamiento a pag. catalogo con el detalle del producto
  const redirectionProduct = (productId) => {
    setSelectProduct(null);
    window.location.href = (`/catalogo?productId=${productId}`);
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch('http://localhost:3002/item/items');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('error fetch data', error);
      }
    };
    loadProduct();
  }, [])

  //funcion busqueda
  //método includes() para verificar si cada palabra de búsqueda está presente en el producto.
  const searchProduct = (text) => {
    if (!text) {
      setProductMatch([]);
    } else {
      const searchTerms = text.toLowerCase().split(" ");
      let matches = product.filter((product) => {
        // Combinar propiedades relevantes para la búsqueda (descripcion, marca, color, nombre, seccion)
        const properties = `${product.name} ${product.description} ${product.brand} ${product.section} ${product.color}`;
        const combinedProperties = properties.toLowerCase();
        return searchTerms.every((term) => combinedProperties.includes(term));
      });
      setProductMatch(matches);
    }
    if (text && productMatch.length === 0) {
      setProductMatch([{ notFound: true }]);
    }
  };
  

  const totalPages = Math.ceil(productMatch.length / 2);

  // Función para manejar el clic en el botón de página anterior
  const clickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Función para manejar el clic en el botón de página siguiente
  const clickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

 

  return (
    <div className={styles.contenedorPrincipal}>

      {/* icono marca "General Shop" */}
      <div className={styles.marca}>
        <Image src={require("@/public/image/logo.png")}
          width={59}
          height={52}
        />
        <a className={styles.ref} href='/'>
          <h1 className={styles.nombreTienda}><b>General Shop</b></h1>
        </a>
      </div>

      {/* icono home */}
      <div className={styles.categorias}>
        <div className={styles.home}>
          <a href='/'>
            <Image src={require('@/public/image/home.png')}
              width={30}
              height={30}
            />
          </a>
        </div>

        {/* icono secciones */}
        <div className={styles.seccion}>
          <Image src={require('@/public/image/section.png')}
            width={23}
            height={24}
          />
          <p>SECCIONES</p>
        </div>

        {/* icono catalogo */}
        <div className={styles.catalogo}>
          <Image src={require('@/public/image/Bookmark.png')}
            width={21}
            height={40}
          />
          <Link href='/catalogo' className={styles.refCatalogo}>
            <p>CATALOGO</p>
          </Link>
        </div>

        {/* icono carro */}
        <Link href='/carrito' className={styles.carrito}>
          <Image src={require('@/public/image/Shopping Cart.png')}
            width={25}
            height={20}
          />
        </Link>
      </div>

      {/* barra de busqueda */}
      <div className={styles.busqueda}>
        <div>
          <Image src={require('@/public/image/Search.png')}
            width={26}
            height={27} />
        </div>
        <input type='text' className={styles.caja}
          onChange={(e) => {
            searchProduct(e.target.value);
          }}></input>
        {productMatch.length > 0 && (
          <div className={`${styles.resultBusqueda} ${styles.active}`}>
            {productMatch.slice((currentPage - 1) * 2, currentPage * 2).map((product, id) => (
              product.notFound ? (
                <div className={styles.notFound}>
                  <Image
                    src={require('@/public/image/Clothes.png')}
                    width={50}
                    height={50}
                  />
                  No se encuentró el producto
                </div>
              ) : (
                <div key={product._id} className={styles.cardContent} onClick={() => redirectionProduct(product._id)}>

                  <div className={styles.card}>
                    <div key={product._id} className={styles.cardImage}>
                      <Image
                        src={product.image}
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <div>
                        <p>{product.name}</p>
                        {obtenerCirculosDeColores(product.color)}
                        <strong> <p>$ {product.price}</p></strong>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
            <p className={styles.verTodos} onClick={() => window.location.href = '/catalogo'}>Ver todos los productos</p>

            {/* Renderizar el carrusel si hay más de una página */}
            {totalPages > 1 && (
              <div className={styles.carousel}>
                <Image
                  src={require('@/public/image/Back.png')}
                  width={30}
                  height={30}
                  onClick={clickPrev}
                  className={currentPage === 1 ? styles.disabledArrow : ''}
                />
                <Image
                  src={require('@/public/image/Next.png')}
                  width={30}
                  height={30}
                  onClick={clickNext}
                  className={currentPage === totalPages ? styles.disabledArrow : ''}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* icono usuario */}
      <div className={styles.usuario}>
        <Usuario isAuthenticated={isAuthenticated} onLogout={onLogout} />
        {!isAuthenticated && (
          // Mostrar botón de registro solo si el usuario no está autenticado
          <button className={styles.botonRegistro}>
            <a className={styles.refB} href='/registro'><b>Registrate</b> </a>
          </button>
        )}
      </div>
    </div>
  );
}

export default NavbarHome;
