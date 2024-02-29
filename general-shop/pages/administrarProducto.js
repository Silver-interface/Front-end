import React, { useState, useEffect } from 'react';
import Footer from '@/src/components/Footer';
import NavbarHome from '@/src/components/NavbarHome';
import TitleAdminProduct from '@/src/components/TituloAdminProduct';
import styles from '@/src/styles/administrarProducto.module.css';
import { ApiProducts } from '@/utils/api-products';
import Image from 'next/image';
import { useRouter } from 'next/router';
import EditarProducto from '@/src/components/editarProducto';


function administrarProducto() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [productMatch, setProductMatch] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const loadProducts = async () => {
      const data = await ApiProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);
  const openModal = (product) => {
    console.log(product);
    setSelectedProduct(product);
    setModalOpen(true);
    console.log(selectedProduct);
  };
  useEffect(() => {
    openModal(product);
    console.log(selectedProduct);
  }, [selectedProduct]);

  
  
  const closeModal = () => {
    setModalOpen(false);
  };

  const removeTilde = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const searchProduct = (text) => {
    const normalizedText = removeTilde(text.toLowerCase());
    const searchTerms = normalizedText.split(" ");
    if (!text) {
      setProductMatch([]);
    } else {
      const matches = products.filter((product) => {
        // Combinar propiedades relevantes para la búsqueda (nombre, descripción, sección, marca, color)
        const properties = `${product.NOMBRE_PRODUCTO} ${product.DESCRIPCION} ${product.seccion.NOMBRE_SECCION} ${product.marca.NOMBRE_MARCA} ${product.color.NOMBRE_COLOR}`;
        const combinedProperties = removeTilde(properties).toLowerCase();
        return searchTerms.every((term) => combinedProperties.includes(term));
      });
      setProductMatch(matches);
    }
  };


  return (
    <div>
      <NavbarHome />
      <TitleAdminProduct />
      <div className={styles.container}>
        <div className={styles.Barrabusqueda}>
          <div>
            <Image src={require('@/public/image/Search.png')}
              width={26}
              height={27} />
          </div>
          <input type='text' className={styles.caja} placeholder='  Buscar producto'
            onChange={(e) => {
              setSearchText(e.target.value);
              searchProduct(e.target.value);
            }}></input>

        </div>
        <table className={styles.table} >
          <thead className={styles.header}>
            <tr>
              <th scope="col" className={styles.colum}>ID</th>
              <th scope="col" className={styles.colum}>IMAGEN</th>
              <th scope="col" className={styles.colum}>NOMBRE</th>
              <th scope="col" className={styles.colum}>DESCRIPCION</th>
              <th scope="col" className={styles.colum}>SECCIÓN</th>
              <th scope="col" className={styles.colum}>MARCA</th>
              <th scope="col" className={styles.colum}>COLOR</th>
              <th scope="col" className={styles.colum}>PRECIO</th>
              <th scope="col" className={styles.colum}>CANTIDAD x TALLA</th>
              <th scope="col" className={styles.colum}>ACCIONES</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {(searchText ? productMatch : products).map((product) => (
              <tr key={product.ID_PRODUCTO}>
                <td>{product.ID_PRODUCTO}</td>
                <td><Image src={product.IMAGEN} width={100} height={100} /></td>
                <td>{product.NOMBRE_PRODUCTO}</td>
                <td>{product.DESCRIPCION}</td>
                <td>{product.seccion.NOMBRE_SECCION}</td>
                <td>{product.marca.NOMBRE_MARCA}</td>
                <td>{product.color.NOMBRE_COLOR}</td>
                <td>${product.PRECIO.toLocaleString()}</td>
                <td>
                  {product.inventario.map(item => (
                    <div key={item.ID_INVENTARIO}>
                      {item.talla.NOMBRE_TALLA} : {item.STOCK}
                      un
                    </div>
                  ))}
                </td>
                <td><div className={styles.acciones}>
                  <button className={styles.editButton} onClick={() => openModal(product)}>Editar</button>
                  <button className={styles.deleteButton}>Eliminar</button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalOpen && <EditarProducto product={selectedProduct} closeModal={closeModal} />}
      </div>
      <Footer />

    </div>
  )
}

export default administrarProducto