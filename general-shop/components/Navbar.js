import React from 'react';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">General Shop</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> 
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/registro">Registrarse</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/login">Iniciar Sesión</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Secciones
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Ellos</a></li>
              <li><a className="dropdown-item" href="#">Ellas</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#">Carrito de Compras</a></li>
            </ul>
          </li>
        </ul>
        <form className="d-flex" role="Buscar">
          <input className="form-control me-2" type="Buscar" placeholder="Talla, Hombre, Mujer, XL..." aria-label="Buscar"/>
          <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Navbar