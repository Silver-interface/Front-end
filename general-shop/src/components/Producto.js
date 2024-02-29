import styles from '@/src/styles/Producto.module.css';
import Image from 'next/image';


function Producto({ ID_PRODUCTO, IMAGEN, NOMBRE_PRODUCTO, COLOR, PRECIO }) {   //(atributos de la api)

  return (
    <div key={ID_PRODUCTO} className={styles.product}>
      <Image className={styles.imageProduct}
        src={IMAGEN}
        width={420}
        height={280}
      />

      <div className={styles.nameProduct}>
        <p>{NOMBRE_PRODUCTO}</p>
        <div className={styles.infoLog}>
          <Image
            src={require('@/public/image/info.png')}
            width={22}
            height={22}
          />
        </div>
      </div>

      <div className={styles.colorPrice}>
      <div style={{ backgroundColor: COLOR }} className={styles.colorCircle}></div>
      
        <p className={styles.price}><b>${PRECIO.toLocaleString()} </b></p>
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