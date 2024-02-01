import React, { useState, useEffect } from 'react';
import Footer from '@/src/components/Footer';
import NavbarHome from '@/src/components/NavbarHome';
import Producto from '@/src/components/Producto';
import TitleProducto from '@/src/components/TituloProducto';
import styles from '@/src/styles/catalogo.module.css';
import Image from 'next/image';
import { obtenerCirculosDeColores } from '@/src/components/Producto';

function catalogoPage() {

  const [products, setProducts] = useState([]);

  //Detalle del producto
  const [VentanaOpen, setVentanaOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('default');
  const [cantidad, setCantidad] = useState(0);

  const onClickProduct = (product) => {
    setVentanaOpen(true);
    setSelectProduct(product);
  };

  const VentanaClose = () => {
    setVentanaOpen(false);
    setSelectProduct(null);
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
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
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
    return 0; //Valor predeterminado si no se encuentra la talla
  };




  useEffect(() => {
    console.log('selectProduct:', selectProduct);
    const loadProducts = async () => {
      try {
        const response = await fetch("http://localhost:3002/item/items/");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <NavbarHome />
      <TitleProducto />
      <div className={styles.Card}>
        {products.map((product) => (
          <div key={product._id} onClick={() => onClickProduct(product)}>
            <Producto
              key={product._id}
              image={product.image}
              name={product.name}
              color={product.color}
              price={product.price}
            />
          </div>
        ))}
      </div>
      {/* Detalle del producto */}
      {VentanaOpen && (
        <div className={styles.modalContainer} onClick={VentanaClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

            {selectProduct && (
              <div className={styles.productDetails}>
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
                      <button onClick={decrementarCantidad} disabled={cantidad === 0} >
                        <strong>-</strong>
                      </button>
                      <strong>{cantidad}</strong>
                      <button onClick={incrementarCantidad} disabled={cantidad >= obtenerStockporTalla(tallaSeleccionada)} >
                        <strong>+</strong>
                      </button>
                    </div>

                  </div>
                  <button className={styles.carrito}><b>Agregar producto</b>
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
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}


export default catalogoPage;