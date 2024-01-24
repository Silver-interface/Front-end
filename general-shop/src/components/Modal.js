import React from 'react'

const Modal = ({ userName, onClose }) => {
  return (
    <div>
      <p>¡Hola, {userName}!</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default Modal