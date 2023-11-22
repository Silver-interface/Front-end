import React from 'react';
import styles from '../styles/Popular.module.css';
import Image from 'next/image';

function Popular() {
  return (
    <div className={styles.popular}>
      <Image src={require('@/public/image/img12.png')}
        width={1440}
        height={73} 
      />
      <div className={styles.titulo}>
        <p><strong>LO MAS POPULAR</strong></p>
      </div>
    </div>
  );
}

export default Popular;