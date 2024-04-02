import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/authContext';
import styles from '../styles/NavbarHome.module.css';
import Link from 'next/link';

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
        <Link href='/login'>
          <Image src={require('@/public/image/User.png')} width={45} height={45} />
        </Link>
      )}
    </div>
  );
}

export default Usuario;
