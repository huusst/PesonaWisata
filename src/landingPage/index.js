import { React, useEffect, useState } from 'react';
import Header from './comonents/header';
import axios from 'axios';
import './assets/css/styles.css';
import ContentDesaWisata from './comonents/contentdesawisata';
import ContentWisata from './comonents/contentwisata';
import ContentKuliner from './comonents/contentKuliner';

function Landing() {
  const [DesaWisataDatas, setDesaWisataData] = useState([]);
  const [WisataDatas, setWisataData] = useState([]);
  const [KulinerDatas, setKulinerData] = useState([]);


  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/desawisata/get_all')
      if (response) {
        setDesaWisataData(response.data.data)
      }
      const response_wisata = await axios.get('http://localhost:3001/api/wisata/get_all')
      if (response_wisata) {
        setWisataData(response_wisata.data.data)
      }
      const response_kuliner = await axios.get('http://localhost:3001/api/kuliner/get_all')
      if (response_kuliner) {
        setKulinerData(response_kuliner.data.data)
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error.response.data.msg);
      }
    }
  }


  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      <Header />
      {DesaWisataDatas.length > 0 && (
        <ContentDesaWisata dataDesaWisata={DesaWisataDatas} />
      )}
      {WisataDatas.length > 0 && (
        <ContentWisata dataWisata={WisataDatas} />
      )}
      {KulinerDatas.length > 0 && (
        <ContentKuliner dataKuliner={KulinerDatas} />
      )}
    </div>
  );
}

export default Landing;
