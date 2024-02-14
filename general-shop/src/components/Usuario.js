import React, { useEffect, useState } from 'react';
import Image from 'next/image';


//lógica para mostrar el perfil del usuario cuando se hace clic en el icono de usuario. 

function Usuario({ isAuthenticated, onLogout }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('token not found');
          return;
        }
        const response = await fetch('http://localhost:3002/user/User', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    if (isAuthenticated) {
      loadUser();
      
    }else {
      setUserName(null);
    }
  }, [isAuthenticated]);
 
  console.log("UsuarioIcon - isAuthenticated:", isAuthenticated);
  
const ProfileClick = () => {
  setShowProfileModal(true);
};


return (
  <div >
    <div onClick={ProfileClick}>
      {isAuthenticated ? (
        <>
          <Image src={require('@/public/image/User.png')} width={45} height={45} />
          <span>{userName}</span>
        </>
      ) : (
        <a href='/login'>
        <Image src={require('@/public/image/User.png')}   width={45} height={45} />
        </a>
      )}
    </div>
    {isAuthenticated && (
      <div className={styles.logout} onClick={onLogout}>
        <Image src={require('@/public/image/logout.png')} width={45} height={45} />
      </div>
    )}
    {showProfileModal && isAuthenticated && (
      <strong>Editar perfil</strong>
    )}
  </div>
);
}

export default Usuario;


