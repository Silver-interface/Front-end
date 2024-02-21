import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/authContext';
import styles from '../styles/NavbarHome.module.css';


function Usuario() {
  const {isAuthenticated, logout} = useAuth();

  console.log(isAuthenticated);
  return (
    
    <div >
      
        {isAuthenticated ? (
          <>
            <Image src={require('@/public/image/User.png')} width={45} height={45} />
            <span>hola usuario</span>
          </>
        ) : (
          <a href='/login'>
          <Image src={require('@/public/image/User.png')}   width={45} height={45} />
          </a>
        )}
     
      {isAuthenticated && (
        <div className={styles.logout} onClick={logout}>
          <Image src={require('@/public/image/logout.png')} width={45} height={45} />
        </div>
      )}
      
    </div>
  );
  }
  
  export default Usuario;
    