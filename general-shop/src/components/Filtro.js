import styles from '@/src/styles/Filtro.module.css';


function Filtro() {
  return (
    <div className={styles.filtroContenedor}>

      <div>Talla</div>
      <select>
        <option value="opcion1" type="checkbox">S</option>
        <option value="opcion2" type="checkbox">M</option>
        <option value="opcion3" type="checkbox">L</option>
        <option value="opcion3" type="checkbox">XL</option>
      </select>

      <div>Seccion</div>
      <select>
        <option value="opcion1" type="checkbox">Hombre</option>
        <option value="opcion2" type="checkbox">Mujer</option>
      </select>
    </div>


  );
}

export default Filtro;