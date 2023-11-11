import React from 'react';
import styles from '@/src/styles/Categorias.module.css';
import Image from 'next/image';

function Categorias() {
    return (
        <div className={styles.categoriaSecciones}>
            <Image src={require('@/public/image/img11.jpg')}
                width={1080}
                height={541}
            />
            <div className={styles.contenedor}>
                <div className={styles.seccionMujer}>
                    <Image src={require('@/public/image/mujer.png')}
                        width={280}
                        height={279}
                    />
                    <div>MUJER</div>
                </div>


                <div className={styles.seccionHombre}>
                    <Image src={require('@/public/image/hombre.png')}
                        width={279}
                        height={279}
                    />
                    <div>HOMBRE</div>
                </div>

                <div className={styles.seccionEco}>
                    <Image src={require('@/public/image/ecofriendly.png')}
                        width={279}
                        height={279}
                    />
                    <div>ECOFRIENDLY</div>
                </div>
            </div>

        </div>
    );
}

export default Categorias;