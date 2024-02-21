import React from 'react';
import styles from '@/src/styles/Filtro.module.css'
import { obtenerCirculosDeColores } from '@/src/components/Producto';

function Filtro() {
  return (

    <div className={styles.filtroContainer}>
      <div>
        <h2>Filtrar productos</h2>
        <hr />

        <div className={styles.filtroTalla}>
          <h3>Talla</h3>
          <div>XS</div>
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
        </div>

        <div className={styles.filtroSeccion}>
          <h3>Sección</h3>
          <ul>
            <p><input type="radio" />Hombre</p>
            <p><input type="radio" />Mujer</p>
          </ul>

        </div>
        <div className={styles.filtroColor}>
          <h3>Color</h3>
          {obtenerCirculosDeColores(['Negro', 'Blanco', 'Azul', 'Gris', 'Rojo'])}
        </div>
      </div>
    </div>
  )
}

export default Filtro