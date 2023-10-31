import React from 'react';
import styles from '../styles/Portada.module.css';
import Image from 'next/image';

function Portada() {
  return (
    <div className={styles.principal}>
      <Image src={require('../public/image/principal.png')}
        width={1440}
        height={774}
      />
      <div className={styles.descripcion}>
        <p>GENERAL SHOP TE PONE A LA <div className={styles.moda}>MODA</div></p>
      </div>
    </div>

  );
}

export default Portada;