import React from 'react';
import styles from '@/src/styles/Categorias.module.css';
import Image from 'next/image';
import Link from 'next/link';


function Categorias() {
  return (
    <div className={styles.categoriaSecciones}>
      <Image src={require('@/public/image/img11.jpg')}
        width={1080}
        height={541}
      />
      <div className={styles.contenedor}>
        <div className={styles.seccionMujer}>
          <Link href="/catalogo?seccion=Mujer">
          <Image src={require('@/public/image/mujer.png')}
            width={280}
            height={279}
          />
           </Link>
          <div>MUJER</div>      
          
        </div>
        <div className={styles.seccionHombre}>
          <Link href="/catalogo?seccion=Hombre">
          <Image src={require('@/public/image/hombre.png')}
            width={279}
            height={279}
          />
          </Link>
          <div>HOMBRE</div>
          
        </div>
      </div>

    </div>
  );
}

export default Categorias;