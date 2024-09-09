import { React, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/styles.css';
import ContentDetailwisataWisata from './components/content';
import Lottie from 'lottie-react';
import animationData from '../assets/js/loading.json';
import not_found from '../assets/js/not_found.json'

import HeaderDetail from './components/header';
import Rating from '../../landingPage/comonents/rating';
import moment from 'moment';
import { debounce } from 'lodash';

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
  const [rate, setRate] = useState('');
  const [selected, setSelected] = useState('');
  const [Detailwisata, setDetailwisata] = useState([]);
  const [ulasanData, setUlasanData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/detail/${id}`)
      if (response) {
        setDetailwisata(response.data.data)
        setnamaDesa(response.data.data[0].nama)
        setalamatDesa(response.data.data[0].alamat)
        settelpDesa(response.data.data[0].no_telp)
        setRate(response.data.data[0].rate)
      }
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error);
        // setLoading(false)
      }
    }
  }, [id])

  const setKeyword = (value) => {
    setLoading(true);
    setSelected(value);
    debounceGetData(value);
  };

  const debounceGetData = useCallback(
    debounce((value) => {
      getUlasan(value);
    }, 1000),
    []
  );

  const getUlasan = async (value = '') => {
    setUlasanData([]);
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/ulasan/${id}?keyword=${value}`)
      if (response) {
        setUlasanData(response.data.data)
        setLoading(false)
      }
    } catch (error) {
      if (error.response.status === 422) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    getData();
    getUlasan();
  }, [getData]);
  
  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD hh:mm');
  };

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
            openModal={openModal} />

          <div className="container-rating">
            <div className='d-flex flex-row'>
              <span className='mx-1 text-bold text-size-14'>Ulasan Wisatawan</span>
            </div>
            <div className='card-rating'>
              <div className='left-card-rating'>
                <span>{rate}</span>
                <Rating rating={rate} />
              </div>
              <div className='right-card-rating'>
                <button className={selected === '' ? "active" : ""} onClick={() => setKeyword('')}>Semua</button>
                <button className={selected === '5' ? "active" : ""} onClick={() => setKeyword('5')}>5 Bintang</button>
                <button className={selected === '4' ? "active" : ""} onClick={() => setKeyword('4')}>4 Bintang</button>
                <button className={selected === '3' ? "active" : ""} onClick={() => setKeyword('3')}>3 Bintang</button>
                <button className={selected === '2' ? "active" : ""} onClick={() => setKeyword('2')}>2 Bintang</button>
                <button className={selected === '1' ? "active" : ""} onClick={() => setKeyword('1')}>1 Bintang</button>
              </div>
            </div>
            <div className='list-ulasan'>
              {loading ? (
                <div>
                  <div className='d-flex w-100 align-item-center justify-content-center' style={{ height: 250, width: 10 }}>
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {ulasanData.length === 0 ? (
                      <div className='w-100 d-flex py-1 flex-column align-item-center'>
                        <div className='d-flex' style={{ height: 200, width: 200 }}>
                          <Lottie
                            animationData={not_found}
                            loop={true}
                            autoplay={true}
                          />
                        </div>
                        <p className='text-default text-size-14 text-bold'>Ulasan tidak tersedia</p>
                      </div>
                  ) : (
                    <>
                      {ulasanData.map((item, index) => {
                        return (
                          <div className='card-ulasan' key={index}>
                            <img src={`${process.env.REACT_APP_BACKEND_API_URL}/uploads/img/profile/${item.detail_wisatawan.profile}`} />
                            <div className='detail-card-ulasan'>
                              <span className='user-title'>{item.detail_wisatawan.name}</span>
                              <Rating rating={item.rate} />
                              <p className='py-2' style={{ whiteSpace: 'pre-wrap' }}>{item.ulasan}</p>
                              <span className='date-text'>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                        )
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WisataDetail;
