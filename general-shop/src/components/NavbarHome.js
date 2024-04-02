import React, { useEffect } from 'react';
import styles from '../styles/NavbarHome.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import Usuario from './Usuario';
import { ApiProducts } from '@/utils/api-products';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAuth } from '@/contexts/authContext';
import dynamic from 'next/dynamic';

const NavbarHome = () => {
  const { isAuthenticated, userData, logout } = useAuth();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);  //redux
  const [product, setProduct] = useState([]);  // variable de estado del input
  const [productMatch, setProductMatch] = useState([]); //estado para coincidencia
  const [currentPage, setCurrentPage] = useState(1);  //para el carousel de la ventana emergente
  const [modalSecciones, setModalSecciones] = useState(false);

  //funcion modal para secciones
  const openModal = () => {
    setModalSecciones(true);
  };

  const closeModal = () => {
    setModalSecciones(false);
  };

  const seccionClick = (seccion) => {
    router.push(`/catalogo?seccion=${seccion}`);
  }

  // Calcular la cantidad total de productos en el carrito
  const totalItemsInCart = cart.reduce((total, item) => total + item.CANTIDAD, 0);

  //funcion redireccionamiento de la barra de busqueda
  const redirectionProduct = (productId) => {
    window.location.href = (`/catalogo?producto=${productId}`);
  };


  useEffect(() => {
    const loadProduct = async () => {
      const response = await ApiProducts();
      setProduct(response);
    };
    loadProduct();
  }, [])

  //funcion busqueda
  //método includes() para verificar si cada palabra de búsqueda está presente en el producto.
  const removeTilde = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };


  const searchProduct = (text) => {
    if (!text) {
      setProductMatch([]);
    } else {
      const normalizedText = removeTilde(text.toLowerCase());
      const searchTerms = normalizedText.split(" ");
      let matches = product.filter((product) => {
        // Combinar propiedades relevantes para la búsqueda (descripcion, marca, color, nombre, seccion)
        const properties = `${product.NOMBRE_PRODUCTO} ${product.DESCRIPCION} ${product.marca.NOMBRE_MARCA} ${product.seccion.NOMBRE_SECCION} ${product.color.NOMBRE_COLOR} `;
        const combinedProperties = removeTilde(properties).toLowerCase();
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
        <Link className={styles.ref} href='/'>
          <h1 className={styles.nombreTienda}><b>General Shop</b></h1>
        </Link>
      </div>

      {/* icono home */}
      <div className={styles.categorias}>
        <div className={styles.home}>
          <Link href='/'>
            <Image src={require('@/public/image/home.png')}
              width={30}
              height={30}
            />
          </Link>
        </div>

        {/* icono secciones */}
        <div className={styles.seccion} onClick={openModal}>
          <Image src={require('@/public/image/section.png')}
            width={23}
            height={24}
          />
          <p>SECCIONES</p>
        </div>

        {modalSecciones && (
          <div className={styles.modalSeccion}>
            <div className={styles.contentModalSeccion}>
              <div className={styles.seccionMujer} onClick={() => seccionClick('Mujer')}>
                <Image src={require('@/public/image/mujer.png')}
                  width={170}
                  height={170}
                />
                <div>MUJER</div>
              </div>
              <div className={styles.seccionHombre} onClick={() => seccionClick('Hombre')}>
                <Image src={require('@/public/image/hombre.png')}
                  width={170}
                  height={170}
                />
                <div>HOMBRE</div>
              </div>
              <Image
                src={require('@/public/image/Close.png')}
                width={18}
                height={18}
                onClick={closeModal}
              />
            </div>
          </div>
        )}

        {/* icono catalogo */}
         <div className={styles.catalogo}>
          {userData && userData.ID_ROL === 1 ? (
            <>
              <Image src={require('@/public/image/admin.png')} width={40} height={40} style={{ width: '35px', height: '35px' }}/>
              <Link href='/administrarProducto' className={styles.refAdmin}><p>ADMINISTRAR PRODUCTOS</p></Link>
            </>
          ) : (
            <>
            
              <Image src={require('@/public/image/Bookmark.png')} width={15} height={15} />
              <Link href='/catalogo' className={styles.refCatalogo}><p>CATALOGO</p></Link>
            </>
          )} 
        </div> 

        {/* icono carro */}
        <Link href='/carrito' className={styles.carrito}>
          <div className={styles.cartIconContainer}>
            <Image src={require('@/public/image/Shopping Cart.png')} width={25} height={20} />
            {totalItemsInCart > 0 && (
              <div className={styles.cart}>{totalItemsInCart}</div>
            )}
          </div>
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
                <div key={product.ID_PRODUCTO} className={styles.cardContent} onClick={() => redirectionProduct(product.ID_PRODUCTO)}>
                  
                  <div className={styles.card}>
                    <div key={product.ID_PRODUCTO} className={styles.cardImage}>
                      <Image
                        src={product.IMAGEN}
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <div>
                        {product.NOMBRE_PRODUCTO}
                        <p>{product.marca.NOMBRE_MARCA}</p>
                        <div style={{ backgroundColor: product.color.CODIGO_COLOR }} className={styles.colorCircle}> </div>
                        <p><strong>${product.PRECIO}</strong></p>
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
        <Usuario isAuthenticated={isAuthenticated} logout={logout} />
        {!isAuthenticated && (
          // Mostrar botón de registro solo si el usuario no está autenticado
          <button className={styles.botonRegistro}>
            <Link className={styles.refB} href='/registro'><b>Registrate</b> </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NavbarHome), {ssr: false}) 
