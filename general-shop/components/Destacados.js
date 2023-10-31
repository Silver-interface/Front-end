import React from 'react';
import styles from '../styles/Destacados.module.css';
import Image from 'next/image';

function Destacados(props) {
  return (
    <div className={styles.producto}>
      <Image className={styles.imagenProducto}
        src={require(`../public/image/${props.imagen}.jpeg`)}
        width={246}
        height={278}
      />

      <div className={styles.descripcionProducto}>
        <p>{props.nombre}</p>
        <div className={styles.infoLog} >
          < Image className='info'
            src={require('../public/image/info.png')}
            width={23}
            height={23}
          />
        </div>
      </div>

      <div className={styles.colorPrecio}>
        <div className={styles.color} id={props.color}>
        </div>
        <p className={styles.precio}>{props.precio}</p>
        <Image className={styles.cart}
          src={require('../public/image/Cart.png')}
          width={25}
          height={25} 
        />
      </div>
    </div>

  );
}

export default Destacados;