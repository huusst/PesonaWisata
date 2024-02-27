import React from 'react';
import Header from './comonents/header';
import './assets/css/styles.css';
import ContentDesaWisata from './comonents/contentdesawisata';
import ContentWisata from './comonents/contentwisata';
import ContentPaketWisata from './comonents/contentpaketwisata';

function Landing() {
  return (
    <div>
      <Header/>
      <ContentDesaWisata/>
      <ContentWisata/>
      <ContentPaketWisata/>
    </div>
  );
}

export default Landing;
