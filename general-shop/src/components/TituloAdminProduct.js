import Image from "next/image";
import styles from '@/src/styles/TituloAdminProduct.module.css';


function TitleAdminProduct() {
    return (
      <div className={styles.titleAdmin}>
        <Image src={require('@/public/image/img12.png')}
          width={1440}
          height={73} 
        />
        <div className={styles.titulo}>
          <p><strong>ADMINISTRAR PRODUCTOS</strong></p>
        </div>
      </div>
    );
  }
  
  export default TitleAdminProduct;