import Image from "next/image";
import styles from '@/src/styles/TituloProducto.module.css';


function TitleProducto() {
    return (
      <div className={styles.titleProducto}>
        <Image src={require('@/public/image/img12.png')}
          width={1440}
          height={73} 
        />
        <div className={styles.titulo}>
          <p><strong>PRODUCTOS</strong></p>
        </div>
      </div>
    );
  }
  
  export default TitleProducto;