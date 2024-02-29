import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import styles from '@/src/styles/catalogo.module.css';
import { ApiProducts } from '@/utils/api-products';
import { useRouter } from 'next/router';

function EditarProducto( {closeModal, selectedProduct}) {
  const router = useRouter();
  
  const [tallaSeleccionada, setTallaSeleccionada] = useState('default');
  const [cantidad, setCantidad] = useState(1);

	useEffect(() => {
		const loadProductDetails = async () => {
			try {
				if (selectedProduct) {
					const productId = selectedProduct.ID_PRODUCTO;
					const response = await ApiProducts(productId);
					console.log(response);
				}
			} catch (error) {
				console.error('Error al cargar los detalles del producto:', error);
			}
		};
		loadProductDetails(); // Carga los detalles del producto solo si hay un selectedProduct disponible
	
	}, [selectedProduct]);

  return (
    <div>
			{selectedProduct && ( 
      <div className={styles.modalContainer}>
				<div className={styles.modalContent}>
					<div className={styles.productDetails}>
						<div className={styles.imgProduct}>
							<Image
							src={selectedProduct.IMAGEN}
							width={246}
							height={246}
							/>
						</div>
					</div>
				</div>
			</div>
			)}
    </div>
  );
}

export default EditarProducto;