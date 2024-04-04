import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import styles from '@/src/styles/catalogo.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../libs/cartSlice';
import { ApiProducts } from '@/utils/api-products';
import { useRouter } from 'next/router';

function ProductoDetalle({ product, onClose }) {
  const router = useRouter();
  const { ID_PRODUCTO } = router.query;
  const [tallaSeleccionada, setTallaSeleccionada] = useState('default');
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const response = await ApiProducts(ID_PRODUCTO);
      } catch (error) {
        console.error('Error al cargar los detalles del producto:', error);
      }
    };
    loadProductDetails(); // Carga los detalles del producto solo si hay un ID de producto disponible

  }, [ID_PRODUCTO]);

  //Logica Stock y tallas
  const CambiodeTalla = (event) => {
    setTallaSeleccionada(event.target.value);
  };

  //logica para ingresar cantidad deseada
  const incrementarCantidad = () => {
    const stockDisponible = obtenerStockporTalla(product, tallaSeleccionada)?.STOCK || 0;
    if (cantidad < stockDisponible) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    } else {
      setCantidad(1);
    }
  };

  useEffect(() => {
    setCantidad(1); // Reiniciar la cantidad a 1 cuando cambie la talla seleccionada
  }, [tallaSeleccionada]);

  //obtener talla como parámetro
  const obtenerStockporTalla = (product, talla) => {
    if (product && product.inventario) {
      const inventario = product.inventario;
      // const tallaInfo = inventario.find((item) => item.talla.NOMBRE_TALLA === talla);
      return inventario.find((item) => item.talla.NOMBRE_TALLA === talla);
    }
    return null;
  };
  const tallaInfo = obtenerStockporTalla(product, tallaSeleccionada);


  const VentanaClose = () => {
    onClose();
  }

  return (
    <div>
      {/* Detalle del producto */}
      {product && (
        <div key={product.ID_PRODUCTO} className={styles.modalContainer} onClick={VentanaClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

            <div className={styles.productDetails} >
              <div className={styles.imgProduct}>
                <Image
                  src={product.IMAGEN}
                  width={246}
                  height={278}
                />
              </div>
              <div className={styles.infoProduct}>
                <strong>{product.NOMBRE_PRODUCTO}</strong> <br />
                <small> Ref: {product.ID_PRODUCTO}  |  {obtenerStockporTalla(product, tallaSeleccionada)?.STOCK} Artículos disponibles</small><br />
                <strong>${product.PRECIO}  </strong><br />
                <div className={styles.selectStock}>
                  <select value={tallaSeleccionada} onChange={CambiodeTalla} className={styles.select}>
                    <option defaultValue="default" >Seleccione una Talla</option>
                    {product.inventario && product.inventario.map((item) => (
                      <option key={item.ID_TALLA} value={item.talla.NOMBRE_TALLA}>{item.talla.NOMBRE_TALLA}</option>
                    ))}

                  </select>
                  <div className={styles.cantidad}>
                    <button onClick={decrementarCantidad} disabled={product.inventario.STOCK === 1} ><strong>-</strong></button>
                    <strong>{cantidad}</strong>
                    <button onClick={incrementarCantidad} disabled={product.inventario.STOCK >= obtenerStockporTalla(tallaSeleccionada)} ><strong>+</strong></button>
                  </div>

                </div>

                <button className={styles.carrito}
                  onClick={() => {
                    const stockDisponible = obtenerStockporTalla(product, tallaSeleccionada)?.STOCK || 0;
                    if (stockDisponible > 0 && cantidad <= stockDisponible) {
                      dispatch(addToCart({
                        ID_PRODUCTO: product.ID_PRODUCTO,
                        IMAGEN: product.IMAGEN,
                        NOMBRE_PRODUCTO: product.NOMBRE_PRODUCTO,
                        TALLA: tallaSeleccionada,
                        ID_TALLA: tallaInfo.ID_TALLA,
                        CANTIDAD: cantidad,
                        PRECIO: product.PRECIO
                      }));
                    } else {
                      alert("No hay suficiente stock disponible");
                    }
                  }}
                  disabled={
                    obtenerStockporTalla(product, tallaSeleccionada) === 0 ||
                    cantidad > obtenerStockporTalla(product, tallaSeleccionada)
                  }
                >
                  <b>Agregar producto</b>
                  <Image src={require('@/public/image/Shopping Cart.png')} width={20} height={20} />
                </button>

                <p><b>Sección</b>: {product.seccion.NOMBRE_SECCION}</p>
                <p><b>Descripción</b>: {product.DESCRIPCION}</p>
                <p><b>Marca</b>: {product.marca.NOMBRE_MARCA}</p>
                <p><b>Color disponible: </b> {product.color.NOMBRE_COLOR}</p>
                <div style={{ backgroundColor: product.color.CODIGO_COLOR }} className={styles.colorCircle}></div>
              </div>
              <div>
                <Image className={styles.close}
                  src={require('@/public/image/Close.png')}
                  width={30}
                  height={30}
                  onClick={VentanaClose}
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ProductoDetalle