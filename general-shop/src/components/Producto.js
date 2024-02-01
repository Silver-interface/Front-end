import React from 'react'
import styles from '@/src/styles/Producto.module.css';
import Image from 'next/image';

//mapeo de colores a valores hexadecimales
const colorMap = {
  Negro: '#000000',
  Blanco: '#FFFFFF',
  Azul: '#0000ff',
  Gris: '#808080',
  Rojo: '#ff0000'
}

export const obtenerCirculosDeColores = (colores) => {
  return colores.map((colorKeyword, index) => (
    <div
      key={index}
      style={{ backgroundColor: colorFromBasedeDatos(colorKeyword) }}
      className={styles.colorCircle}
    ></div>
  ));
};

// Función para obtener el color correspondiente
const colorFromBasedeDatos = (keyword) => {
  return colorMap[keyword] || 'transparent'; // Si la palabra clave no está en el mapeo, usa transparente como valor predeterminado
};

function Producto({ _id, image, name, color, price }) {   //(atributos de la api)


  return (
    <div key={_id} className={styles.product}>
      <Image className={styles.imageProduct}
        src={image}
        width={246}
        height={278}
      />

      <div className={styles.nameProduct}>
        <p>{name}</p>
        <div className={styles.infoLog}>
          <Image
            src={require('@/public/image/info.png')}
            width={22}
            height={22}
          />
        </div>
      </div>

      <div className={styles.colorPrice}>
        <div>
          {obtenerCirculosDeColores(color)}
        </div>

        <p className={styles.price}><b>${price} </b></p>
        <div className={styles.cart}>
          <Image
            src={require('@/public/image/Cart.png')}
            width={25}
            height={25}
          />
        </div>

      </div>
    </div>
  );
}


export default Producto;