import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import styles from '@/src/styles/administrarProducto.module.css';
import { ChromePicker } from 'react-color';
import { Modal } from 'react-bootstrap';

function EditarProducto({ closeModal, selectedProduct }) {
  const [ID_PRODUCTO, setID_PRODUCTO] = useState("");
  const [IMAGEN, setIMAGEN] = useState(null);
  const [NOMBRE_PRODUCTO, setNOMBRE_PRODUCTO] = useState("");
  const [DESCRIPCION, setDESCRIPCION] = useState("");
  const [PRECIO, setPRECIO] = useState("");
  const [NOMBRE_MARCA, setNOMBRE_MARCA] = useState("");
  const [ID_SECCION, setID_SECCION] = useState("");
  const [tallaStock, setTallaStock] = useState([]);
  const [selectedTallaInfo, setSelectedTallaInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState({});
  

  const submit = async () => {
    try {
      const inventario = tallaStock.map(({ ID_TALLA, STOCK }) => ({
        ID_PRODUCTO,
        ID_TALLA,
        STOCK
      }));

      const formData = {
        ID_PRODUCTO, IMAGEN, NOMBRE_PRODUCTO, DESCRIPCION, PRECIO, ID_SECCION,
        marca: {
          NOMBRE_MARCA,
        },
        color: {
          NOMBRE_COLOR: color.nombre,
          CODIGO_COLOR: color.codigo
        },

        inventario
      };
      
      const response = await fetch("http://localhost:3000/productos/update", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      console.log('Datos enviados correctamente');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }

  };

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        if (selectedProduct) {
          setID_PRODUCTO(selectedProduct.ID_PRODUCTO || "");
          setIMAGEN(selectedProduct.IMAGEN || "");
          setNOMBRE_PRODUCTO(selectedProduct.NOMBRE_PRODUCTO || "");
          setDESCRIPCION(selectedProduct.DESCRIPCION || "");
          setPRECIO(selectedProduct.PRECIO || "");
          setNOMBRE_MARCA(selectedProduct.marca.NOMBRE_MARCA || "");
          setID_SECCION(selectedProduct.seccion.ID_SECCION || "");

          //Obtener color.nombre y color.codigo (inicialización)
          setColor({
            nombre: selectedProduct.color ? selectedProduct.color.NOMBRE_COLOR : "",
            codigo: selectedProduct.color ? selectedProduct.color.CODIGO_COLOR : ""
          });

          // Obtener el inventario de tallas
          const tallaStockInicial = selectedProduct.inventario.map(item => ({
            ID_TALLA: item.ID_TALLA,
            STOCK: item.STOCK
          }));
          setTallaStock(tallaStockInicial);
        }
      } catch (error) {
        console.error('Error al cargar los detalles del producto:', error);
      }
    };
    loadProductDetails();
  }, [selectedProduct]);


  const imagenChange = (event) => {
    setIMAGEN(event.target.value);
  };

  const opcionesSeccion = [
    { value: 1, label: '1 - Hombre' },
    { value: 2, label: '2 - Mujer' }
  ];


  // Manejar cambios en el stock de una talla
  const stockChange = (idTalla, newStock) => {
    setSelectedTallaInfo({ ID_TALLA: idTalla, STOCK: newStock });
    setTallaStock(prevState =>
      prevState.map(talla =>
        talla.ID_TALLA === idTalla ? { ...talla, STOCK: newStock } : talla
      )
    );
  };

  //Manejar cambio de color
  const colorChange = (newColor) => {
    setColor({
      nombre: newColor.name,
      codigo: newColor.hex
    });
  };


  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div>
      {selectedProduct && (
        <div className={styles.modalContainer} key={selectedProduct.ID_PRODUCTO}>
          <div className={styles.modalContent}>
            <form onSubmit={submit}>
              <div className={styles.productDetails}>
                <div className={styles.imgProduct}>
                  <Image
                    src={selectedProduct.IMAGEN}
                    width={246}
                    height={246}
                  />
                  <div>
                    <label className='form-label'>URL Imagen</label>
                    <input type="text" className="form-control" style={{ width: '300px' }} value={IMAGEN} onChange={imagenChange} />
                  </div>
                </div>
                <div className={styles.infoProduct}>
                  <div className={styles.formContainer}>
                    <div className={styles.form1}>
                      <div><label className='form-label'>Nombre del producto</label>
                        <input type="text" className="form-control" value={NOMBRE_PRODUCTO}
                          onChange={(e) => { setNOMBRE_PRODUCTO(e.target.value) }} required />
                      </div>

                      <div><label className='form-label'>Precio (COP)</label>
                        <input type="num" className="form-control" value={PRECIO.toLocaleString()}
                          onChange={(e) => { setPRECIO(e.target.value) }} required />
                      </div>

                      <div><label className='form-label'>Descripción</label>
                        <textarea type="text" className="form-control" value={DESCRIPCION}
                          onChange={(e) => { setDESCRIPCION(e.target.value) }} rows={2} required />
                      </div>

                      <div>
                        <label className='form-label me-2'>Color</label>
                        <button className="btn btn-primary my-1" style={{ backgroundColor: "#f6a444" }} onClick={handleShowModal}>Seleccionar color</button>
                        <Modal show={showModal} onHide={handleCloseModal}>
                          <Modal.Header>
                            <Modal.Title>Seleccionar color</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="d-flex justify-content-center align-items-center">
                            <ChromePicker
                              color={color.codigo}
                              onChange={colorChange}
                            /></Modal.Body>
                          <Modal.Footer>
                            <button className="btn btn-primary my-1" style={{ backgroundColor: "#f6a444" }} onClick={handleCloseModal}>Cerrar</button>
                          </Modal.Footer>
                        </Modal>

                        <div className="d-flex align-items-center">
                          <input type="text" className="form-control" value={color.nombre} onChange={(e) => setColor({ ...color, nombre: e.target.value })} />
                          <div style={{ backgroundColor: color.codigo }} className={styles.colorCircle}></div>
                        </div>
                      </div>

                    </div>
                    <div className={styles.form2}>
                      <div><label className='form-label'>Marca</label>
                        <input type="text" className="form-control" value={NOMBRE_MARCA}
                          onChange={(e) => { setNOMBRE_MARCA(e.target.value) }} required />
                      </div>

                      <div><label className='form-label'>Sección</label>
                        <select id="seccion" className="form-select my-0" onChange={(e) => setID_SECCION(e.target.value)} value={ID_SECCION}>
                          <option value="">Seleccione una opción</option>
                          {opcionesSeccion.map((opcion) => (
                            <option key={opcion.value} value={opcion.value}>
                              {opcion.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className='form-label'>Talla - Cantidad</label>
                        {tallaStock.map(({ ID_TALLA, STOCK }) => (
                          <div key={ID_TALLA} className="d-flex align-items-end my-1" >
                            <label className='form-label me-3' style={{ width: '55px' }}>{selectedProduct.inventario.find(item => item.ID_TALLA === ID_TALLA).talla.NOMBRE_TALLA}</label>
                            <input type="number" className="form-control" style={{ width: '60px' }} value={STOCK} min={0} onChange={e => stockChange(ID_TALLA, e.target.value)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.submit}>
                <button type='submit' className="btn btn-primary my-0" style={{ backgroundColor: "#f6a444" }}>Guardar Cambios</button>
              </div>
            </form>
            <div onClick={closeModal}>
              <Image className={styles.close}
                src={require('@/public/image/Close.png')}
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditarProducto;