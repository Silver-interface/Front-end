import React from 'react'
import styles from '@/styles/Home.module.css'

const Login = () => {
    return (
        <div className={styles.main}>
            <h1>Inicio de Sesión</h1>
            <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Ingresa un correo al que tengas acceso.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                    <div id="passwordHelp" className="form-text">La contraseña debe ser de longitud mínima 5, y debe contener letras mayúsculas, letras minúsculas y números.</div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Recuerdame.</label>
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    )
}

export default Login