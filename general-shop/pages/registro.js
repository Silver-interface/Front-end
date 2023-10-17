import React from 'react'

const Registro = () => {
  return (
    <>
      <div className='p-5'>
        <h1>Registrarse</h1>
        <form>
          <div className="mb-3">
            <select className="form-select my-5" aria-label="Default select example">
              <option selected>Tipo de Identificación</option>
              <option value="1">Cédula</option>
              <option value="2">Pasaporte</option>
              <option value="3">Cédula de Extranjeria</option>
            </select>
            <label for="documento" className="form-label">Documento de Identidad</label>
            <input type="number" className="form-control" id="Identificacion" aria-describedby="number" />
          </div>
          <div className="mb-3">
            <label for="nombreCompleto" className="form-label">Nombre Completo</label>
            <input type="name" className="form-control" id="nombreCompleto" aria-describedby="name" />
          </div>
          <div className="mb-3">
            <label for="nombreCompleto" className="form-label">Nombre Completo</label>
            <input type="name" className="form-control" id="nombreCompleto" aria-describedby="name" />
          </div>
          <div className="mb-3">
            <label for="nombreCompleto" className="form-label">Nombre Completo</label>
            <input type="name" className="form-control" id="nombreCompleto" aria-describedby="name" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Recuerdame.</label>
          </div>
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
      </div>
    </>
  )
}

export default Registro