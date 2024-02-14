import React, { useEffect } from 'react';
import styles from '../styles/NavbarHome.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';



function NavbarHome({ isAuthenticated, onLogout }) { //prop isAuthenticated para mostrar iconos en la barra de navegación.
  console.log("NavbarHome - isAuthenticated:", isAuthenticated);

  //funcionalidad barra buscadora
  const [product, setProduct] = useState([]);  // variable de estado del input
  const [productMatch, setProductMatch] = useState([]); //estado para coincidencia

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('error fetch data', error);
      }
    };
    loadProduct();
  }, [])

  //funcion busqueda
  const searchProduct = (text) => {
    if (!text) {
      setProductMatch([]);
    } else {
      let matches = product.filter((product) => {
        const regex = new RegExp(`${text}`, "gi");
        return product.title.match(regex)
      });
      setProductMatch(matches);
    }
  }


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

        <div className={`${styles.resultBusqueda} ${productMatch.length > 0 && styles.active}`}>
          {productMatch.map((product, id) => (
            <div key={id} className={styles.card}>
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
              />
              <p>{product.title}</p>
            </div>
          ))}
          {productMatch.length > 0 && (
            <a href='/productos'> <p className={styles.verTodos}>Ver todos los productos </p> </a>
          )}
        </div>
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
