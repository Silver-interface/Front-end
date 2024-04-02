import React from 'react';
import NavbarHome from '@/src/components/NavbarHome.js';
import Separador from '@/src/components/Separador.js';
import Portada from '@/src/components/Portada.js';
import Popular from '@/src/components/Popular.js';
import Destacados from '@/src/components/Destacados.js';
import Secciones from '@/src/components/Secciones.js';
import Categorias from '@/src/components/Categorias.js';
import Footer from '@/src/components/Footer.js';

const Home = () => {
  return (
    <>
      <NavbarHome />
      <Separador />
      <Portada />
      <Popular />
      <Destacados />
      <Separador />
      <Secciones />
      <Categorias />
      <Footer />
    </>
  );
};

export default Home;