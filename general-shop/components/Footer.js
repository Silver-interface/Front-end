import React from 'react';
import styles from '../styles/Footer.module.css';
import Image from 'next/image';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.contacto}><p>CONTACTANOS</p>
                <div className='numero'>PBX: 01 8000 41 37 57</div>
            </div>
            
            <div className={styles.empresa}><p>QUIENES SOMOS</p></div>
            <div className={styles.soporte}><p>SOPORTE</p></div>
            <div className={styles.redes}><p>REDES SOCIALES</p>
                <Image className={styles.tiktok} src={require('../public/image/TikTok.png')}
                 width={84}
                 height={84}/>
                <Image className={styles.facebook} src={require('../public/image/Facebook.png')}
                width={83}
                height={83} />
                <Image className={styles.instagram} src={require('../public/image/Instagram.png')} 
                width={72}
                height={72} />
            </div>
        </div>

    );
}

export default Footer;