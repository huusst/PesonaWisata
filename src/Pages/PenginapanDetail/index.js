import { React, useState, useEffect, useCallback } from 'react';
import ContentDetailwisataWisata from './components/content';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from "./../assets/js/loading.json"

import HeaderDetail from './components/price';
import KamarDetailPenginapan from './components/kamar';
import PaketHomestayPenginapan from './components/paket_homestay';

function PenginapanDetail({ openModalInfo }) {
  const { id } = useParams();
  const [namaDesa, setnamaDesa] = useState('');
  const [DataDetailPenginapan, setDataDetailPenginapan] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/penginapan/${id}`)
      if (response) {
        setDataDetailPenginapan(response.data.data)
        setnamaDesa(response.data.data[0].nama)
        setLoading(false)
      }
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error);
        setLoading(false)
      }
    }
  }, [id])

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <section className='desawisata'>
      <div className='desawisata-header my-bottom-1'>
        <span className='text-white'><a className='text-white' href='/'>Home</a> / <a className='text-white' href='/penginapan'>Penginapan</a> / {namaDesa}</span>
      </div>
      <div className='d-flex flex-column'>
        {!loading ? (
          <>
            {DataDetailPenginapan.length !== 0 ? (
              <>
                <HeaderDetail Detailwisata={DataDetailPenginapan} />
                <ContentDetailwisataWisata DetailPenginapan={DataDetailPenginapan} />
                {DataDetailPenginapan[0].kategori === "Hotel" ? (
                  <KamarDetailPenginapan id={id} 
                  openModalInfo={openModalInfo}/>
                ) : (
                  <PaketHomestayPenginapan id={id} 
                  openModalInfo={openModalInfo}/>
                )}
              </>
            ) : (
              <div className="mx-5 py-5">
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
          </>
        ) : (
          <div className="mx-5 py-5">
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
    </section>
  );
}

export default PenginapanDetail;
