import React, { useEffect } from 'react';
import Swal from 'sweetalert2';


function EliminarProducto({ product, closeAlert }) {
  const submitDelete = async () => {
    try {
      const response = await fetch("http://localhost:3000/productos/delete", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ID_PRODUCTO: product.ID_PRODUCTO}),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      console.log('Producto eliminado correctamente');
      closeAlert();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      const confirmDelete = await Swal.fire({
        title: "Confirmar eliminación",
        html: `¿Estás seguro de eliminar el producto <span style="color: #f6a444">${product.NOMBRE_PRODUCTO}</span> con  <span style="color: #f6a444"> ID ${product.ID_PRODUCTO}</span>? Una vez eliminado, no podrás recuperarlo`,
        icon: "warning",
        showCancelButton: true,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        dangerMode: true,
      });

      if (confirmDelete.isConfirmed) {
        await submitDelete();
        Swal.fire({
          title: "Producto Eliminado",
          icon: "success",
          timer: 1000, 
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          closeAlert(); 
          window.location.reload();
        });
      } else {
        console.log("Delete cancelada");
        closeAlert();
      }
    } catch (error) {
      console.error('Error al mostrar la alerta de eliminación:', error);
    }
  };
  
  useEffect(() => {
    if (product) {
      confirmDelete();
    }
  }, [product, closeAlert]);

}

export default EliminarProducto;