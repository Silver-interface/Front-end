import React from 'react';
import styles from '../styles/Secciones.module.css';
import Image from 'next/image';

function Secciones() {
    return (
     <div className={styles.secciones}>
     <Image src={require('../public/image/img12.png')}
     width={1440}
     height={73} 
     />
     <div className={styles.tituloS}>
        <p><strong>SECCIONES</strong></p>
     </div>
     </div>
    );
}

export default Secciones;