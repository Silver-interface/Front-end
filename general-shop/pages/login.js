import React, { useState } from 'react'
import styles from '../src/styles/login.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';
import { useAuth } from '@/contexts/authContext';
import Link from 'next/link';

const Login = () => { 

  //Declaracion de Hooks
  const router = useRouter();
  const { login } = useAuth();
  const [CORREO, setCORREO] = useState("");
  const [CONTRASEÑA, setCONTRASEÑA] = useState("");

  const onSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          CORREO: CORREO,
          CONTRASEÑA: CONTRASEÑA,
        }),
      });
      const data = await res.json();
      
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        login(data);
        router.push('/');
      } else {
      Swal.fire({
        title: "Usuario no encontrado",
        text: "Datos ingresados incorrectos, verifique nuevamente.",
        icon: "error"
      });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        icon: "error"
      });
      }
    };
  

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
                  onChange={(e) => setCORREO(e.target.value)} value={CORREO}
                  required />

                <div id="emailHelp" className="form-text">Ingresa un correo al que tengas acceso.</div>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                  onChange={(e) => setCONTRASEÑA(e.target.value)} value={CONTRASEÑA}
                  required />

                <div id="passwordHelp" className="form-text">La contraseña debe ser de longitud mínima 5, y debe contener letras mayúsculas, letras minúsculas y números.</div>
              </div>
              {/* <div className="mb-4 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Recuerdame.</label>
              </div> */}
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#f6a444' }}>Iniciar Sesión</button>
              <div className={styles.registrate}>
                O si no tienes una cuenta <br></br>
                <Link href='/registro' style={{ color: 'inherit', textDecoration: 'inherit' }} ><strong>REGISTRATE</strong></Link>
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
