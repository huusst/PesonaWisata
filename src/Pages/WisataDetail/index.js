import { React, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/styles.css';
import ContentDetailwisataWisata from './components/content';

import HeaderDetail from './components/header';

function WisataDetail({
  showAlert,
  messageAlert,
  nameAlert,
  statusLogin,
  openModal
}) {
  const { id } = useParams();
  const [namaDesa, setnamaDesa] = useState('');
  const [alamatDesa, setalamatDesa] = useState('');
  const [telpDesa, settelpDesa] = useState('');
  const [Detailwisata, setDetailwisata] = useState([]);
  // const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/detail/${id}`)
      if (response) {
        setDetailwisata(response.data.data)
        setnamaDesa(response.data.data[0].nama)
        setalamatDesa(response.data.data[0].alamat)
        settelpDesa(response.data.data[0].no_telp)
      }
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error);
        // setLoading(false)
      }
    }
  }, [id])

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <section className='desawisata'>
      <div className='desawisata-header my-bottom-4'>
        <div className='py-5'>
          <span className='text-size-20 text-bold text-white'>Wisata {namaDesa}</span>
          <div className='d-flex flex-row my-2 align-item-center'>
            <i className="fa-solid fa-location-dot text-white"></i>
            <span className='mx-2 text-size-14 text-white'>{alamatDesa}</span>
          </div>
          <div className='d-flex flex-row align-item-center'>
            <i className="fa-solid fa-phone   text-white"></i>
            <span className='mx-2 text-white'>{telpDesa}</span>
          </div>
        </div>
      </div>
      {Detailwisata.length !== 0 && (
        <div className='d-flex flex-column'>
          <HeaderDetail Detailwisata={Detailwisata} />
          <ContentDetailwisataWisata
            Detailwisata={Detailwisata}
            showAlert={showAlert}
            messageAlert={messageAlert}
            nameAlert={nameAlert} 
            statusLogin={statusLogin}
            openModal={openModal}/>
        </div>
      )}
    </section>
  );
}

export default WisataDetail;
