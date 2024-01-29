import React, { useState } from 'react'
import styles from '../src/styles/login.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'



const Login = ({ onLogin }) => {  //prop onLogin para notificar a _app.js cuando el usuario ha iniciado sesión 

  //Declaracion de Hooks
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3002/auth/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log("Respuesta del servidor", data);



      if (data === "NOT_FOUND_USER") {
        Swal.fire({
          title: "Usuario no encontrado",
          text: "No tienes una cuenta, registrese",
          icon: "warning"
        });
        router.push('/registro');

      } else if (data === "PASSWORD_INCORRECT") {
        Swal.fire({
          title: "Contraseña incorrecta",
          text: "Intentelo de nuevo",
          icon: "warning"
        });
        console.log(data)
      }
      else {
        const token = data.token;


        if (data.token) {
          // Token obtenido con éxito, almacenarlo en localStorage
          localStorage.setItem('token', token);
          console.log("token recibido:", token);
          router.push('/');
          console.log("Success")
        } else {
          console.error("El servidor no proporcionó un token en la respuesta.");
        }
      }

    } catch (error) {
      console.error(error);
    };

  }

  return (
    <section>

      <div className={`container ${styles.main}`}>
        <div className={`row ${styles.cardlog}`}>
          <div className={`col p-0 position-relative`}>

            <Image src="/image/containerlog.jpg" fill className={styles.image} object-fit="contain" />
          </div>
          <div className="col">
            <Image src="/image/ingresar.png" className={styles.ingreso}
              width={285}
              height={62}>
            </Image>
            <Image src="/image/line.png" className={styles.line}
              width={541}
              height={2}
            ></Image>

            <form className={styles.form}

              onSubmit={onSubmit}>

              <div className="mb-2">
                <label for="exampleInputEmail1" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)} value={email}
                  required />

                <div id="emailHelp" className="form-text">Ingresa un correo al que tengas acceso.</div>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)} value={password}
                  required />

                <div id="passwordHelp" className="form-text">La contraseña debe ser de longitud mínima 5, y debe contener letras mayúsculas, letras minúsculas y números.</div>
              </div>
              <div className="mb-4 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Recuerdame.</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#f6a444' }}>Iniciar Sesión</button>
              <div className={styles.registrate}>
                O si no tienes una cuenta <br></br>
                <a href='/registro' style={{ color: 'inherit', textDecoration: 'inherit' }} ><strong>REGISTRATE</strong></a>
              </div>
              <div className={styles.home}>
                < a href='/'><Image src="/image/home.png"
                  width={30}
                  height={30}
                ></Image></a>Regresar
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Login
