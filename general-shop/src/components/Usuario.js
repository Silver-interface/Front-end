import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/authContext';
import styles from '../styles/NavbarHome.module.css';

function Usuario() {
  const { isAuthenticated, userData, logout } = useAuth();

  return (
    <div >
      {isAuthenticated ? (
        <>
          <div className={styles.logout}>
            <span>Hola {userData.NOMBRE_USUARIO} </span>
            <Image src={require('@/public/image/User.png')} width={45} height={45} />
            <Image src={require('@/public/image/logout.png')} width={45} height={45}  onClick={logout} />
          </div>
        </>
      ) : (
        <a href='/login'>
          <Image src={require('@/public/image/User.png')} width={45} height={45} />
        </a>
      )}
    </div>
  );
}

export default Usuario;
