import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import styles from '@/src/styles/catalogo.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../libs/cartSlice';
import { obtenerCirculosDeColores } from '@/src/components/Producto';
import { useRouter } from 'next/router';
import { fetchAllProducts } from '@/utils/api-products';

function ProductoDetalle() {
  const router = useRouter();
  const [selectProduct, setSelectProduct] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('default');
  const [cantidad, setCantidad] = useState(1);
  const [product, setProduct] = useState(null);
  const { _id } = router.query; //Obtener el ID del producto de la URL
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProductDetails = async (_id) => {
       try {
          const response = await fetchAllProducts(_id); // Utiliza la función para cargar los detalles del producto por ID
          setSelectProduct(response.length > 0 ? response[0] : null); // Establece los detalles del producto en el estado
       } catch (error) {
          console.error('Error al cargar los detalles del producto:', error);
       }
    };
    if (_id) {
       loadProductDetails(_id); // Carga los detalles del producto solo si hay un ID de producto disponible
    }
 }, [_id]);

  const VentanaClose = () => {
    setSelectProduct(null);
    router.push('/catalogo/catalogo')
  }

  //Logica Stock y tallas
  const CambiodeTalla = (event) => {
    setTallaSeleccionada(event.target.value);
  };

  //logica para ingresar cantidad deseada
  const incrementarCantidad = () => {
    //verificar si la cantidad actual es menor al stock antes de incrementar
    if (cantidad < obtenerStockporTalla(tallaSeleccionada)) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }else {
      setCantidad(1);
    }
  };

  //obtener talla como parámetro
  const obtenerStockporTalla = (talla) => {
    if (selectProduct.size && selectProduct.size.sizes) {
      try {
        const jsonString = selectProduct.size.sizes;
        //tallasInfo contiene un objeto que representa las tallas y su stock
        const tallasInfo = JSON.parse(jsonString);
        // Busca la talla seleccionada y devuelve el stock
        const tallaInfo = tallasInfo.find((info) => info.size === talla);

        if (tallaInfo) {
          console.log('Talla seleccionada', tallaInfo);
          return tallaInfo.stock;
        } else {
          console.log('La talla seleccionada no está disponible');
          return 0;
        }
      } catch (error) {
        console.error('Error al parsear la cadena JSON', error);
      }
    }
    return 1; //Valor predeterminado si no se encuentra la talla
  };

console.log(selectProduct);
  return (
    <div>
      {/* Detalle del producto */}
      {selectProduct && (
        <div key={selectProduct._id} className={styles.modalContainer} onClick={VentanaClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

            <div className={styles.productDetails} >
              <div className={styles.imgProduct}>
                <Image
                  src={selectProduct.image}
                  width={246}
                  height={278}
                />
              </div>
              <div className={styles.infoProduct}>
                <strong>{selectProduct.name}</strong> <br />
                <small> Ref: {selectProduct._id}  |  {obtenerStockporTalla(tallaSeleccionada)} Artículos disponibles</small><br />
                <strong>${selectProduct.price}  </strong><br />
                <div className={styles.selectStock}>
                  <select value={tallaSeleccionada} onChange={CambiodeTalla} className={styles.select}>
                    <option defaultValue="default" >Seleccione una Talla</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  <div className={styles.cantidad}>
                    <button onClick={decrementarCantidad} disabled={cantidad === 1} >
                      <strong>-</strong>
                    </button>
                    <strong>{cantidad}</strong>
                    <button onClick={incrementarCantidad} disabled={cantidad >= obtenerStockporTalla(tallaSeleccionada)} >
                      <strong>+</strong>
                    </button>
                  </div>

                </div>
                <button className={styles.carrito} onClick={() => dispatch(addToCart(selectProduct))}><b>Agregar producto</b>
                  <Image src={require('@/public/image/Shopping Cart.png')}
                    width={20}
                    height={20}
                  />
                </button>
                <p>Sección: {selectProduct.seccion}</p>
                <p>Descripción: {selectProduct.description}</p>
                <p>Marca: {selectProduct.brand}</p>
                <p>Colores disponibles</p>
                {obtenerCirculosDeColores(selectProduct.color)}
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