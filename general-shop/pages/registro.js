"use client"
import React, { useState } from 'react'
import styles from '../src/styles/registro.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Link from 'next/link'

//componente alert
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


const Registro = () => {

  //Declaracion de Hooks
  const router = useRouter();

  const [NOMBRE_USUARIO, setNOMBRE_USUARIO] = useState("");
  const [APELLIDO_USUARIO, setAPELLIDO_USUARIO] = useState("");
  const [TIPO_DOCUMENTO, setTIPO_DOCUMENTO] = useState("");
  const [DOCUMENTO, setDOCUMENTO] = useState("");
  const [CORREO, setCORREO] = useState("");
  const [CONTRASEÑA, setCONTRASEÑA] = useState("");


  //logica para el POST
  const onSubmit = async (e) => {
    e.preventDefault();

    //validacion de contenido de la contraseña

    const inputPassword = document.getElementById("inputPassword5").value;
    const confirmPassword = document.getElementById("inputPassword6").value;

    if (inputPassword.length < 5) {  // Check longitud
      Toast.fire({
        icon: "warning",
        title: "Contraseña corta"
      });
      return;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(inputPassword)) {  // Check intercambio de letras  lookaheads
      Toast.fire({
        icon: "warning",
        title: "Incluya letras mayusculas y minusculas en la contraseña"
      });
      return;

    } else if (!/\d/.test(inputPassword)) {  //Check numeros
      Toast.fire({
        icon: "warning",
        title: "Incluya almenos un número"
      });
      return;
    }
    else if (confirmPassword != inputPassword) {
      Toast.fire({
        icon: "warning",
        title: "La contraseña no coincide",
        timer: 5000
      });
      return;
    }


    try {
      const res = await fetch("http://localhost:3000/register/", {
        method: 'POST',
        body: JSON.stringify({ CORREO, CONTRASEÑA, NOMBRE_USUARIO, APELLIDO_USUARIO, DOCUMENTO, TIPO_DOCUMENTO }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();

      if (data.error === "ALREADY_USER") {
        Swal.fire({
          title: "Usuario existente",
          text: "El usuario ya ha sido creado, puedes ingresar",
          icon: "warning"
        });
        router.push('/login');
      } else {
        Swal.fire({
          title: "Usuario creado",
          text: "Ya puedes ingresar",
          icon: "success"
        });
        router.push('/login');
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
            <Image src="/image/registroFondo.jpeg" fill className={styles.image} object-fit="contain" />

          </div>
          <div className="col">
            <Image src="/image/registrate.png" className={styles.register}
              width={285}
              height={62}>
            </Image>

            <form className={`row ${styles.form}`}
              onSubmit={onSubmit}
            >

              <div className="col-md-12 ">
                <select className="form-select my-4" aria-label="Default select example"
                  onChange={(e) => setTIPO_DOCUMENTO(e.target.value)} value={TIPO_DOCUMENTO}
                >

                  <option defaultValue >Tipo de Identificacion</option>
                  <option value="Cedula" >Cédula</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Cedula Extranjeria">Cédula de Extranjeria</option>
                </select>

              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="documento" className="form-label">Documento de Identidad</label>

                <input type="text" className="form-control" placeholder="Número de documento" aria-label="Documento"
                  onChange={(e) => setDOCUMENTO(e.target.value)} value={DOCUMENTO}
                  required />

              </div>

              <div className="col-md-12 mb-3">
                <label for="validationServerUsername" className="form-label">Datos personales</label>

                <input type="email" className="form-control" placeholder="Correo electrónico" aria-label="Correo Electronico"
                  onChange={(e) => setCORREO(e.target.value)} value={CORREO} pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                  required />

              </div>

              <div className="col-12 mb-3 has-validation">
                <input type="text" className="form-control" placeholder="Nombre" aria-label="Primer Nombre"
                  onChange={(e) => setNOMBRE_USUARIO(e.target.value)} value={NOMBRE_USUARIO}
                  required />


                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                  Por favor, verifique su nombre.
                </div>
              </div>

              <div className="col-12 mb-3">

                <input type="text" className="form-control" placeholder="Apellido" aria-label="Apellido"
                  onChange={(e) => setAPELLIDO_USUARIO(e.target.value)} value={APELLIDO_USUARIO}
                  required />
              </div>

              <div className="col-12 mb-3">
                <input type="password" id="inputPassword5" class="form-control" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="passwordHelpBlock"
                  onChange={(e) => setCONTRASEÑA(e.target.value)} value={CONTRASEÑA}
                  required />

                <div id="passwordHelpBlock" class="form-text">

                  La contraseña debe ser de longitud mínima 5, contener letras mayúsculas, letras minúsculas y números. Sin espacios ni caracteres especiales.</div>

              </div>

              <div className="col-12 mb-3">
                <input type="password" id="inputPassword6" class="form-control" placeholder="Confirmación de contraseña" aria-label="Confirmación de Contraseña" aria-describedby="passwordHelpBlock"
                  required />
              </div>
              <div className="col-md-12 mb-3">
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#f6a444' }}>Registrarse</button>
              </div>
              <div className={styles.redlogin} >
                <Link href="/login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                  <Image src="/image/maleUser.png"
                    width={47}
                    height={47}>
                  </Image>
                  YA TIENES UNA CUENTA?
                </Link>
              </div>
              <div className={styles.home}>
                <Link href='/'><Image src="/image/home.png"
                  width={30}
                  height={30}
                ></Image></Link>Regresar
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Registro
