import React, { useEffect } from 'react';
import styles from '../styles/NavbarHome.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';



function NavbarHome() {
 
  
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

  //funcion estado inicio sesión
  const [logged, setLogged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");


  //controlador de clic al icono usuario para mostrar ventana emergente
  const VentanaUsuario = async () => {
    if (logged) {
      try {
        const response = await fetch('http://localhost:3002/user');
        if (!response.ok) {
          if (response.status === 401) {
            // Token no válido o no presente
            console.log('Token no válido o no presente');
            window.location.href = '/login';
          } else {
            // Otro error
            throw new Error(`Error al obtener información del usuario. Código de estado: ${response.status}`);
          }
        }
        const data = await response.json();
        setUserName(data.name);
        setShowModal(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className={styles.contenedorPrincipal}>

      <div className={styles.marca}>

        <Image src={require("@/public/image/logo.png")}
          width={59}
          height={52}
        />
        <a className={styles.ref} href='/'>
          <h1 className={styles.nombreTienda}><b>General Shop</b></h1>
        </a>
      </div>

      <div className={styles.categorias}>
        <div className={styles.home}>
          <a href='/'>
            <Image src={require('@/public/image/home.png')}
              width={30}
              height={30}
            />
          </a>
        </div>

        {/* <div className={styles.oferta}>
          <Image src={require('@/public/image/price.png')}
            width={23}
            height={23}
          />
          <p>OFERTAS</p>
        </div> */}

        <div className={styles.seccion}>
          <Image src={require('@/public/image/section.png')}
            width={23}
            height={24}
          />
            <p>SECCIONES</p>
        </div>

        <div className={styles.catalogo}>
          <Image src={require('@/public/image/Bookmark.png')}
            width={21}
            height={40}
          />
          <a href='/productos' className={styles.refCatalogo}>
            <p>CATALOGO</p>
          </a>
        </div>


        <div className={styles.carrito}>
          <Image src={require('@/public/image/Shopping Cart.png')}
            width={25}
            height={20}
          />
        </div>
      </div>

       {/* barra de busqueda */}
      <div className={styles.busqueda}>
        <div>
          <Image src={require('@/public/image/Search.png')}
            width={26}
            height={26} />
        </div>
        <input type='text' className={styles.caja}
          onChange={(e) => {
            searchProduct(e.target.value);
          }}
        ></input>

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

      <div className={styles.usuario}>
        <div onClick = {VentanaUsuario}>
            <Image src={require('@/public/image/User.png')}
              width={45}
              height={45}
            />
        </div>

        <button className={styles.botonRegistro}>
          <a className={styles.refB} href='/registro'><b>Registrate</b> </a>
        </button>
      </div>

      { showModal && <Modal userName={userName} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default NavbarHome;
