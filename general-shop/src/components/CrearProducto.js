import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import styles from '@/src/styles/administrarProducto.module.css';
import { ChromePicker } from 'react-color';
import { Modal } from 'react-bootstrap';


function CrearProducto({ closeModalCreate }) {
	const [IMAGEN, setIMAGEN] = useState(null);
	const [NOMBRE_PRODUCTO, setNOMBRE_PRODUCTO] = useState("");
	const [DESCRIPCION, setDESCRIPCION] = useState("");
	const [PRECIO, setPRECIO] = useState("");
	const [NOMBRE_MARCA, setNOMBRE_MARCA] = useState("");
	const [ID_SECCION, setID_SECCION] = useState("");
	const [tallas, setTallas] = useState([]);
	const [inventarioR, setInventarioR] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [color, setColor] = useState({});

	const submit = async () => {	
		try {

			const formData = {
				IMAGEN, NOMBRE_PRODUCTO, DESCRIPCION, PRECIO, ID_SECCION,
				ID_TALLA: 1,

				marca: {
					NOMBRE_MARCA,
				},
				color: {
					NOMBRE_COLOR: color.nombre,
					CODIGO_COLOR: color.codigo
				},

				inventario: inventarioR.map(item => ({
					ID_TALLA: item.ID_TALLA,
					STOCK: item.STOCK
					
				}))
				
			};
			
			const response = await fetch("http://localhost:3000/productos/insert", {
				method: 'POST',
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

	const opcionesSeccion = [
		{ value: 1, label: '1 - Hombre' },
		{ value: 2, label: '2 - Mujer' }
	];
	useEffect(() => {
		const tallas = [
			{ ID_TALLA: 1, NOMBRE_TALLA: 'Talla S' },
			{ ID_TALLA: 2, NOMBRE_TALLA: 'Talla M' },
			{ ID_TALLA: 3, NOMBRE_TALLA: 'Talla L' },
			{ ID_TALLA: 4, NOMBRE_TALLA: 'Talla XL' },
		];
		// Creamos un inventario inicial con stock 0 para todas las tallas
		const inventarioInicial = tallas.map(talla => ({
			ID_TALLA: talla.ID_TALLA,
			STOCK: 0
		}));
		setInventarioR(inventarioInicial);
		setTallas(tallas);
	}, []);

	// Manejar cambios en el stock de una talla
	const stockChange = (ID_TALLA, newStock) => {
		setInventarioR(prevInventario => {
			return prevInventario.map(item =>
				item.ID_TALLA === ID_TALLA ? { ...item, STOCK: newStock } : item
			);
		});
	};

	//Manejar cambio de color
	const colorChange = (newColor) => {
		setColor({
			nombre: newColor.name,
			codigo: newColor.hex
		});
	};

	//modal colores
	const handleShowModal = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};


	return (
		<div>
			<div className={styles.modalContainer}>
				<div className={styles.modalContent}>
					<form onSubmit={submit}>
						<div className={styles.productDetails}>
							<div className={styles.imgProduct}>
								<Image
									src={require("@/public/image/imagen.png")}
									width={246}
									height={246}
								/>
								<div>
									<label className='form-label'>URL Imagen</label>
									<input type="text" className="form-control" style={{ width: '300px' }} value={IMAGEN} onChange={(e) => { setIMAGEN(e.target.value) }} required />
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
											{tallas.map(({ ID_TALLA, NOMBRE_TALLA }) => (
												<div key={ID_TALLA} className="d-flex align-items-end my-1">
													<label className='form-label me-3' style={{ width: '55px' }}>{NOMBRE_TALLA}</label>
													<input
														type="number"
														className="form-control"
														style={{ width: '60px' }}
														value={inventarioR.find(item => item.ID_TALLA === ID_TALLA)?.STOCK}
														min={0}
														onChange={e => stockChange(ID_TALLA, e.target.value)}
													/>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.submit}>
							<button type='submit' className="btn btn-primary my-0" style={{ backgroundColor: "#f6a444" }}>Agregar producto</button>
						</div>
					</form>
					<div onClick={closeModalCreate}>

						<Image className={styles.close}
							src={require('@/public/image/Close.png')}
							width={30}
							height={30}
						/>
					</div>
				</div>
			</div>

		</div>
	);
}

export default CrearProducto;