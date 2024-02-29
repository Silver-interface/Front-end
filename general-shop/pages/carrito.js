import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart, removeAllFromCart,} from "../libs/cartSlice";
import NavbarHome from "@/src/components/NavbarHome";
import styles from "@/src/styles/carrito.module.css";

const Carrito = () => {
  const [VentanaOpen, setVentanaOpen] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [IdType, setIdType] = useState("");
  const [IdNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.CANTIDAD * item.PRECIO,
      0
    );
  };

  // const sendEmail = async (e) => {
  //   e.preventDefault();
  //    const response = await fetch("/API CARRITO", {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, address, name, lastName, IdNumber, IdType, phoneNumber cart })
  //   }) 

  //   );
  // };

  //prueba

  const sendEmail = async (e) => {
    e.preventDefault();

    // Mostrar una alerta de compra exitosa
    alert('¡Compra exitosa!');

    // Limpiar el carrito
    dispatch(removeAllFromCart()); // Suponiendo que tengas una acción llamada removeAllFromCart que elimina todos los elementos del carrito

    // Limpiar los campos del formulario o restablecerlos a su valor inicial si es necesario
    setName('');
    setLastName('');
    setIdType('');
    setIdNumber('');
    setEmail('');
    setAddress('');
    setPhoneNumber('');
  };

  return (
    <>
      <NavbarHome />
      <div className={styles.container}>
        {cart.length === 0 ? (
          <h1>Tu carrito está vacío!</h1>
        ) : (
          <>
            <div className={styles.header}>
              <div>Imagen</div>
              <div>Producto</div>
              <div>Talla</div>
              <div>Precio</div>
              <div>Cantidad</div>
              <div>Acciones</div>
              <div>Precio Total</div>
            </div>
            {cart.map((item) => (
              <div className={styles.body}>
                <div className={styles.image}>
                  <Image
                    src={item.IMAGEN}
                    width={82}
                    height={93}
                    alt={item.NOMBRE_PRODUCTO}
                  />
                </div>
                <p>{item.NOMBRE_PRODUCTO}</p>
                <p>{item.TALLA}</p>
                <p>$ {item.PRECIO.toLocaleString()}</p>
                <p>{item.CANTIDAD}</p>
                <div className={styles.buttons}>
                  <button onClick={() => dispatch(incrementQuantity(item.ID_PRODUCTO))}>
                    +
                  </button>
                  <button onClick={() => dispatch(decrementQuantity(item.ID_PRODUCTO))}>
                    -
                  </button>
                  <button onClick={() => dispatch(removeFromCart(item.ID_PRODUCTO))}>
                    x
                  </button>
                </div>
                <p>$ {item.CANTIDAD * item.PRECIO}</p>
              </div>
            ))}
            <h2>Precio Total: $ {getTotalPrice().toLocaleString()}</h2>
            <button
              onClick={() => setVentanaOpen(true)}
              className={styles.buttonPagar}
            >
              <p className={styles.buttonText}>Generar compra</p>
            </button>
            {VentanaOpen && (
              <div
                className={styles.modalContainer}
                onClick={() => setVentanaOpen(false)}
              >
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`container ${styles.main}`}>
                    <div className={`row ${styles.cardlog}`}>
                      <div className="col">
                        <form className={`row ${styles.form}`}
                          onSubmit={sendEmail}>

                          <div className="col-md-12 mb-3">
                            <label
                              for="validationServerUsername"
                              className="form-label"
                            >
                              <h3>Datos personales</h3>
                              <small>Diligencia correctamente tus datos personales para confirmar tu compra</small>
                            </label>

                            <div className="col-md-12 ">
                              <select
                                className="form-select my-4"
                                aria-label="Default select example"
                                onChange={(e) => setIdType(e.target.value)}
                                value={IdType}
                              >
                                <option defaultValue>
                                  Tipo de Identificacion
                                </option>
                                <option value="Cedula">Cédula</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Cedula Extranjeria">
                                  Cédula de Extranjeria
                                </option>
                              </select>
                            </div>

                            <div className="col-md-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Número de documento"
                                aria-label="Documento"
                                onChange={(e) => setIdNumber(e.target.value)}
                                value={IdNumber}
                                required
                              />
                            </div>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Correo electrónico"
                              aria-label="Correo Electronico"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                              required
                            />
                          </div>

                          <div className="col-12 mb-3 has-validation">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nombre"
                              aria-label="Primer Nombre"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              required
                            />

                            <div
                              id="validationServerUsernameFeedback"
                              className="invalid-feedback"
                            >
                              Por favor, verifique su nombre.
                            </div>
                          </div>

                          <div className="col-12 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Apellido"
                              aria-label="Apellido"
                              onChange={(e) => setLastName(e.target.value)}
                              value={lastName}
                              required
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="Número de contacto"
                              aria-label="Celular"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              value={phoneNumber}
                              pattern="[0-9]*"
                              required
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <input
                              type="address"
                              id="inputaddress5"
                              class="form-control"
                              placeholder="Dirección de envío"
                              aria-label="Dirección"
                              aria-describedby="addressHelpBlock"
                              onChange={(e) => setAddress(e.target.value)}
                              value={address}
                              required
                            />
                            <div id="addressHelpBlock" class="form-text">
                              Debes agregar una dirección.
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ backgroundColor: "#f6a444" }}
                              onClick={(e) => sendEmail(e)}

                            // sendEmail({ name, lastName, IdNumber, email, address, phoneNumber }, cart);
                            // setVentanaOpen(false);
                            // }}
                            >
                              Confirmar compra
                            </button>
                          </div>
                          <div className={styles.home}>
                            <button onClick={() => setVentanaOpen(false)}>
                              <Image
                                src="/image/Cart.png"
                                width={30}
                                height={30}
                              ></Image>
                              Regresar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Carrito;
