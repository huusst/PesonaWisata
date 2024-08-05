import { React, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from "./../assets/js/loading.json"

import ContentDetailwisataWisata from './components/content';
import HeaderDetail from './components/menulist';

function KulinerDetail({
  showAlert,
  messageAlert,
  nameAlert,
  statusLogin,
  openModal,
  openModalInfo
}) {
  const { id } = useParams();
  const [DataDetailKuliner, setDataDetailKuliner] = useState([]);
  const [DataMenuKuliner, setDataMenuKuliner] = useState([]);
  const [DataKategoriMenuKuliner, setKategoriMenuKuliner] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/kuliner/${id}`)
      if (response) {
        setDataDetailKuliner(response.data.data)

        const response_kategori = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/kuliner/menu/kategori/${id}`)
        if (response_kategori) {
          setKategoriMenuKuliner(response_kategori.data.data)

          const response_menu = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/kuliner/menu/${id}`)
          if (response_menu) {
            setDataMenuKuliner(response_menu.data.data)
            setLoading(false)
          }
        }
      }
    } catch (error) {
      if (error.response.status === 422) {
        // console.log(error);
        setLoading(false)
      }
    }
  }, [id])

  useEffect(() => {  

    getData();
  }, [getData]);

  return ( 
    <section className='desawisata'>

      <div className='desawisata-header my-bottom-4'>
        {!loading ? (
          <>
            {DataDetailKuliner.map((item, index) => {
              return (
                <div className='py-5' key={index}>
                  <span className='text-size-20 text-bold text-white'>Kuliner {item.nama}</span>
                  <div className='d-flex flex-row my-2 align-item-center'>
                    <i className="fa-solid fa-location-dot text-white"></i>
                    <span className='mx-2 text-size-14 text-white'>{item.alamat}</span>
                  </div>
                  <div className='d-flex flex-row align-item-center'>
                    <i className="fa-solid fa-phone   text-white"></i>
                    <span className='mx-2 text-white'>{item.no_telp}</span>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <div className="mx-5 py-4 w-80">
            <div className="d-flex justify-content-center align-item-center my-3">
              <div className="d-flex" style={{ height: 125, width: 200 }}>
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='d-flex flex-column'>
        {!loading ? (
          <>
          {DataKategoriMenuKuliner.length !== 0 ? (
            <HeaderDetail 
            Detailkuliner={DataDetailKuliner} 
            kategori={DataKategoriMenuKuliner} 
            menuData={DataMenuKuliner} 
            id_destinasi={id}
            showAlert={showAlert}
            messageAlert={messageAlert}
            nameAlert={nameAlert}
            statusLogin={statusLogin}
            openModal={openModal}
            openModalInfo={openModalInfo}
            />
          ):(
            <div></div>
          )}
            <ContentDetailwisataWisata Detailwisata={DataDetailKuliner}/>
          </>
        ) : (
          <div>
            <div className="cover">
              <div className='desawisata-container justify-content-center py-5'>
                <div className='d-flex' style={{ height: 200, width: 200 }}>
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default KulinerDetail;
