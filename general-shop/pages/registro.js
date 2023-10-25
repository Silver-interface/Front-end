import React from 'react'
import styles from '@/styles/login.module.css'
import Image from 'next/image'

const Registro = () => {
  return (
    <div className={`container ${styles.main}`}>
      <div className={`row ${styles.cardlog}`}>
        <div className={`col p-0 position-relative`}>
          <Image src="/image/containerlog.jpg" fill className={styles.image} object-fit="contain" />
        </div>
        <div className="col">
          <form className={`row ${styles.form}`}>
            <div className="col-md-12 mb-3">
              <select className="form-select my-5" aria-label="Default select example">
                <option defaultValue>Tipo de Identificación</option>
                <option value="1">Cédula</option>
                <option value="2">Pasaporte</option>
                <option value="3">Cédula de Extranjeria</option>
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="documento" className="form-label">Documento de Identidad</label>
              <input type="text" className="form-control" placeholder="Número de documento" aria-label="Documento" />
            </div>
            <div className="col-md-12 mb-3">
              <label for="validationServerUsername" className="form-label">Correo Electrónico</label>
              <input type="text" className="form-control" placeholder="Correo" aria-label="Correo Electronico" />
            </div>
            <div className="col-12 mb-3 has-validation">
              <input type="text" className="form-control" placeholder="Primer Nombre" aria-label="Primer Nombre" />
              <div id="validationServerUsernameFeedback" className="invalid-feedback">
                Por Favor, verifique su nombre.
              </div>
            </div>
            <div className="col-12 mb-3">
              <input type="text" className="form-control" placeholder="Apellido" aria-label="Apellido" />
            </div>
            <div className="col-12 mb-3">
              <input type="password" id="inputPassword5" class="form-control" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="passwordHelpBlock"/>
                <div id="passwordHelpBlock" class="form-text">

                Su contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no debe contener espacios, caracteres especiales ni emoji.                </div>
            </div>

            <div className="col-12 mb-3">
              <input type="password" id="inputPassword5" class="form-control" placeholder="Confirmación de Contraseña" aria-label="Confirmación de Contraseña" aria-describedby="passwordHelpBlock"/>
                <div id="passwordHelpBlock" class="form-text">
                  Debe ser igual a la contraseña.
                </div>
            </div>
            <div className="col-md-12 mb-3">
              <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registro