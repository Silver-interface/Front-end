import React from 'react'
import styles from '@/src/styles/Producto.module.css';
import Image from 'next/image';

function Producto(props) {

  const { onClick, imagen, alt, nombre, colores, talla, precio } = props;

    return (
     
        <div  onClick={onClick} className={styles.producto}>

          {/* imagen del producto, los props serian los atributos de la api */}
          <div className={styles.imageProducto}>
            <Image
              src={props.imagen}
              width={246}
              height={246}
              alt={props.nombre}
            />
          </div>

          <div className={styles.nombreProducto}>
            <p>{props.nombre}</p>
          </div>

          <div className={styles.talla}>
            <p>Tallas: {props.talla}</p>
            <Image
              src={require('@/public/image/info.png')}
              width={25}
              height={25}
            />
          </div>

          <div className={styles.colorPrecio}>
            <div className={styles.color}>
              {props.colores && props.colores.map((color, index) => (  //opciones de color a traves de props
                <div id={index} style={{ backgroundColor: color }}> </div>
              ))}
            </div>

            <p className={styles.precio}><b>{props.precio} </b></p>
            <Image className={styles.cart}
              src={require('@/public/image/Cart.png')}
              width={25}
              height={25}
            />
          </div>
        </div>
      
    );
  }


export default Producto;