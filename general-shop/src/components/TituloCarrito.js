import Image from "next/image";
import styles from '@/src/styles/TituloCarrito.module.css';


function TituloCarrito() {
    return (
      <div className={styles.titleCarrito}>
        <Image src={require('@/public/image/img12.png')}
          width={1440}
          height={73} 
        />
        <div className={styles.titulo}>
          <p><strong>RESUMEN DE COMPRA</strong></p>
        </div>
      </div>
    );
  }
  
  export default TituloCarrito;