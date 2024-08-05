import { React, useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import './assets/css/styles.css';
import ContentDesaWisata from './comonents/contentdesawisata';
import ContentWisata from './comonents/contentwisata';
import ContentKuliner from './comonents/contentKuliner';
import DesaIcon from "./assets/img/DesaIcon.png"
import KulinerIcon from "./assets/img/KulinerIcon.png"
import PenginapanIcon from "./assets/img/PenginapanIcon.png"
import Lottie from 'lottie-react';
import animationData from './../Pages/assets/js/loading.json';
import not_found from './../Pages/assets/js/not_found.json';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [loadingsearch, setLoadingSearch] = useState(false);
  const [DesaWisataDatas, setDesaWisataData] = useState([]);
  const [WisataDatas, setWisataData] = useState([]);
  const [KulinerDatas, setKulinerData] = useState([]);
  const [RecomendasiDatas, setRecomendasiDatas] = useState([]);
  const [message, setmessage] = useState('');
  const [budget, setBudget] = useState('');
  const [jumlah, setJumlah] = useState(1);
  const navigate = useNavigate();

  const menu = [
    {
      "title": "Desa Wisata",
      "img": DesaIcon,
      "href": "/desawisata"
    },
    {
      "title": "Kuliner",
      "img": KulinerIcon,
      "href": "/kuliner"
    },
    {
      "title": "Penginapan",
      "img": PenginapanIcon,
      "href": "/penginapan"
    },
  ];

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/desawisata/get_all`)
      if (response) {
        setDesaWisataData(response.data.data)
      }
      const response_wisata = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/get_all`)
      if (response_wisata) {
        setWisataData(response_wisata.data.data)
      }
      const response_kuliner = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/kuliner/get_all`)
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


  const add = () => {
    setLoadingSearch(true);
    const value = jumlah + 1
    setJumlah(value);
    debounceGetData(budget, value);
  }

  const min = () => {
    setLoadingSearch(true);
    if (jumlah > 1) {
      setLoadingSearch(true);
      const value = jumlah - 1
      setJumlah(value);
      debounceGetData(budget, value);
    }
  }


  const searchKeyword = (event) => {
    setLoadingSearch(true);
    const value = event.target.value;
    setBudget(value);
    debounceGetData(value, jumlah);
  };

  const debounceGetData = useCallback(
    debounce((budget, jumlah) => {
      cetak(budget, jumlah);
    }, 1000),
    []
  );

  const cetak = async (budget, jumlah) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/recomend`,
        {
          dana: budget,
          jumlah: jumlah
        }
      )
      if (response) {
        setmessage(response.data.message);
        setRecomendasiDatas(response.data.data)
        setLoadingSearch(false);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setmessage(error.response.data.error);
        setRecomendasiDatas([])
        setLoadingSearch(false);
      }
    }
  }
  const Navigate = (href) => {
    navigate(`${href}`);
  };

  return (
    <div>
      <div className="Leanding-header">
        <div className="top-header">
        </div>
        <div className='content-header'>
          <div className={`${budget === '' ? 'd-flex' : 'show-hide'} flex-row justify-content-beetwen w-50 py-2 px-5`}>
            {menu.map((item, index) => {
              return (
                <span className={`menu-header text-white`} onClick={() => Navigate(item.href)} key={index}>
                  <div className='d-flex flex-column align-item-center'>
                    <div>
                      <img src={item.img} alt='not found' />
                    </div>
                    <span>{item.title}</span>
                  </div>
                </span>
              )
            })}
          </div>
          <div className={`${budget === '' ? 'text-content' : 'show-hide'}`}>
            <span className='title'>Temukan paket wisata dengan bugdet yang Anda miliki</span>
            <span className='subtitle'>Liburan dengan kami bersahabat dengan kantong Anda</span>
          </div>
          <div className='form-header w-100 py-5'>
            <input className='input-budget w-50 p-3 rounded-15 border-none text-size-14' type='number' placeholder='Berapa budget kamu?' value={budget}
              onChange={searchKeyword}></input>
            <div className='py-1 rounded-15 border-none mx-2 bg-white'>
              <div className='d-flex flex-row align-item-center'>
                <span className='text-secondary px-left-1'>{jumlah} Orang</span>
                <div className='d-flex flex-column mx-3'>
                  <button className='button-plus text-secondary' onClick={add}><i className="fa fa-angle-up"></i></button>
                  <button className='button-min text-secondary' onClick={min}><i className="fa fa-angle-down"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`footer-header ${budget === '' ? 'my-top-5' : ''}`}>
        </div>
      </div>

      {budget === '' ? (
        <>
          {DesaWisataDatas.length > 0 && (
            <ContentDesaWisata dataDesaWisata={DesaWisataDatas} />
          )}
          {WisataDatas.length > 0 && (
            <ContentWisata dataWisata={WisataDatas} />
          )}
          {KulinerDatas.length > 0 && (
            <ContentKuliner dataKuliner={KulinerDatas} />
          )}
        </>
      ) : (
        <div className="cover-recomend">
          <div className='d-flex flex-row my-bottom-2'>
            <span className='mx-1 text-bold text-size-14'>Hasil Pencarian</span>
          </div>
          {!loadingsearch ? (
            <>
              {
                RecomendasiDatas.length === 0 ? (
                  <div>
                    <div className='w-100 d-flex py-1 flex-column align-item-center'>
                      <div className='d-flex' style={{ height: 200, width: 200 }}>
                        <Lottie
                          animationData={not_found}
                          loop={true}
                          autoplay={true}
                        />
                      </div>
                      <p className='text-default text-size-14 text-bold'>{message}</p>
                    </div>
                  </div>
                ) : (
                  <div className='cover-recomended-item'>
                    {RecomendasiDatas.map((item, index) => {
                      return (
                        <span onClick={() => Navigate(`wisata/${item.id_wisata}`)} key={index} className={`child-recomendasi animasi`} style={{ animationDelay: `${index / 3}s` }}>
                          {item.recommended ? (
                            <span className='recomended-badge'>RECOMENDED</span>
                          ) : (
                            <span></span>
                          )}
                          <div className='cover-img'>
                            <img src={item.sampul_destinasi} alt='foto kosong' />
                          </div>
                          <div className='text-child'>
                            <div className='d-flex flex-column'>
                              <span className='text-bold text-black text-size-12'>{item.nama_destinasi}</span>
                            </div>
                            <span className='text-default text-bold'>{Number(item.harga_tiket).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                          </div>
                        </span>
                      )
                    })}
                  </div>
                )
              }
            </>
          ) : (
            <div className='d-flex w-100 justify-content-center'>
              <div className='d-flex' style={{ height: 200, width: 200 }}>
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Landing;
