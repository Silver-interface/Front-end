import React from 'react';
import styles from '../styles/NavbarHome.module.css';
import Image from 'next/image';
import Link from 'next/link';

const NavbarHome = () => {

  return (
    <div className={styles.contenedorPrincipal}>

      <div className={styles.marca}>

        <Image src={require("@/public/image/logo.png")}
          width={59}
          height={52}
        />
        <a className={styles.ref} href='/home/page'>
          <h1 className={styles.nombreTienda}><b>General Shop</b></h1>
        </a>
      </div>

      <div className={styles.categorias}>
        <div className={styles.home}>
          <a href='/home/page'>
            <Image src={require('@/public/image/home.png')}
              width={30}
              height={30}
            />
          </a>
        </div>
        <div className={styles.oferta}>
          <Image src={require('@/public/image/price.png')}
            width={23}
            height={23}
          />
          <p>OFERTAS</p>
        </div>

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
          <p>CATALOGO</p>
        </div>


        <div className={styles.carrito}>
          <Image src={require('@/public/image/Shopping Cart.png')}
            width={25}
            height={20}
          />
        </div>
      </div>

      <div className={styles.busqueda}>
        <Link href={'/search'}>
          <Image src={require('@/public/image/Search.png')}
            width={26}
            height={26} />
        </Link>
      </div>

      <div className={styles.usuario}>
        <div>
          <a href='/login'>
            <Image src={require('@/public/image/User.png')}
              width={45}
              height={45}
            />
          </a>
        </div>

        <button className={styles.botonRegistro}>
          <a className={styles.refB} href='/registro'><b>Registrate</b> </a>
        </button>
      </div>
    </div>
  );
}

export default NavbarHome;
