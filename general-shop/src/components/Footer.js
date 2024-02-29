import React from 'react';
import styles from '../styles/Footer.module.css';
import Image from 'next/image';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.contacto}><p>CONTACTANOS</p>
      <Image className={styles.phone} src={require('@/public/image/phone.png')}
          width={80}
          height={80} />
        <small>  PBX: 01 8000 41 37 57</small> 
        <p>  <small>(604) 445 70 98</small></p>
      </div>

      <div className={styles.empresa}><p>QUIENES SOMOS</p>
      <Image className={styles.code} src={require('@/public/image/code.png')}
          width={80}
          height={80} />
          <small>Somos una tienda virtual de camisetas básicas, inspirada en desarrolladores FullStack </small>
      </div>
      <div className={styles.soporte}><p>SOPORTE</p>
      <small>Escríbanos </small>
          <Image className={styles.gmail} src={require('@/public/image/Gmail.png')}
          width={90}
          height={90} />
          <small>generalshop093@gmail.com</small>
      </div>

      <div className={styles.redes}><p>REDES SOCIALES</p>
        <small>Siguenos en nuestras redes sociales</small>
        <Image className={styles.tiktok} src={require('@/public/image/TikTok.png')}
          width={70}
          height={70} />
        <Image className={styles.facebook} src={require('@/public/image/Facebook.png')}
          width={70}
          height={70} />
        <Image className={styles.instagram} src={require('@/public/image/Instagram.png')}
          width={70}
          height={70} />
      </div>
    </div>

  );
}

export default Footer;