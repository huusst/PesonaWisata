import React from 'react';
import Header from './comonents/header';
import './assets/css/styles.css';
import ContentDesaWisata from './comonents/contentdesawisata';
import ContentWisata from './comonents/contentwisata';

function Landing() {
  return (
    <div>
      <Header/>
      <ContentDesaWisata/>
      <ContentWisata/>
      <ContentDesaWisata/>
    </div>
  );
}

export default Landing;
