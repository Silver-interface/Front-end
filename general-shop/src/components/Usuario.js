import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/authContext';
import styles from '../styles/NavbarHome.module.css';


function Usuario() {
  const { isAuthenticated, user, logout } = useAuth();

  console.log(isAuthenticated);
  console.log(user);

  return (
    <div >
      {isAuthenticated ? (
        <>
          <div className={styles.logout}>
            <span>Hola  </span>
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
