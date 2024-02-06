import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../libs/cartSlice';
import NavbarHome from '@/src/components/NavbarHome';
import styles from '@/src/styles/carrito.module.css';

const Carrito = () => {

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
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
            <div>Precio</div>
            <div>Cantidad</div>
            <div>Acciones</div>
            <div>Precio Total</div>
          </div>
          {cart.map((item) => (
            <div className={styles.body}>
              <div className={styles.image}>
                <Image src={item.image} width={82} height={93} alt={item.name} />
              </div>
              <p>{item.name}</p>
              <p>$ {item.price}</p>
              <p>{item.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(incrementQuantity(item._id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(item._id))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(item._id))}>
                  x
                </button>
              </div>
              <p>$ {item.quantity * item.price}</p>
            </div>
          ))}
          <h2>Precio Total: $ {getTotalPrice()}</h2>
        </>
      )}
    </div>
    </>
  );
};

export default Carrito;