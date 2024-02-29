
const sendEmail = async (formData, cart) => {
    try {
      // Crea el cuerpo del correo electrónico con el resumen de la compra
      const emailBody = `
        <h1>Resumen de la compra</h1>
        <p>Nombre: ${formData.name}</p>
        <p>Apellido: ${formData.lastName}</p>
        <p>Identificación: ${formData.IdNumber}</p>
        <p>Correo electrónico: ${formData.email}</p>
        <p>Numero de contacto: ${formData.phoneNumber}</p>
        <p>Dirección de envío: ${formData.address}</p>
        <h2>Productos:</h2>
        <ul>
          ${cart.map((item) => `<li>${item.IMAGEN} ${item.NOMBRE_PRODUCTO} - ${item.TALLA} - Cantidad: ${item.CANTIDAD} unidades - Precio:${item.PRECIO}  </li>`).join('')}
        </ul>
        <p>Total: $${getTotalPrice()}</p>
      `;
  
      // Envía el correo electrónico
      await transporter.sendMail({
        from: 'generalshop093@gmail.com', // Dirección de correo electrónico del remitente
        to: formData.email, // Dirección de correo electrónico del destinatario
        subject: 'Resumen de la compra', // Asunto del correo electrónico
        html: emailBody, // Cuerpo HTML del correo electrónico
      });
  
      console.log('Correo electrónico enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  };
  module.exports = { sendEmail };