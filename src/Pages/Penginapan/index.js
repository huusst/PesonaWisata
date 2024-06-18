import { React, useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Lottie from 'lottie-react';
import animationData from './../assets/js/loading.json';
import Alert from '../../modal/alert';

import PenginapanContent from './components/Penginapancontent';

function PenginapanPage() {

  const [PenginapanDatas, setPenginapanDatas] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [kelasPenginapan, setKelasPenginapan] = useState([]);
  const [kategoriPenginapan, setKategoriPenginapan] = useState([]);
  const [message, setMessage] = useState('');
  const [onshow, setOnshow] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchKeyword = (event) => {
    setLoading(true);
    const value = event.target.value;
    setKeyword(value);
    debounceGetData(value, kelasPenginapan, kategoriPenginapan);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedKelasPenginapan = checked
      ? [...kelasPenginapan, value]
      : kelasPenginapan.filter((item) => item !== value);

    setKelasPenginapan(updatedKelasPenginapan);
    setLoading(true);
    debounceGetData(keyword, updatedKelasPenginapan, kategoriPenginapan);
  };

  const handleCheckboxChangeKategori = (event) => {
    const { value, checked } = event.target;
    const updatedkategoriPenginapan = checked
      ? [...kategoriPenginapan, value]
      : kategoriPenginapan.filter((item) => item !== value);

    setKategoriPenginapan(updatedkategoriPenginapan);
    setLoading(true);
    debounceGetData(keyword, kelasPenginapan, updatedkategoriPenginapan);
  };

  const debounceGetData = useCallback(
    debounce((searchTerm, filterKelas, filterkategori) => {
      getData(searchTerm, filterKelas, filterkategori);
    }, 1000),
    []
  );

  const toogleOnclose = () => {
    setOnshow(false);
  };

  // function StarRating({ count }) {
  //   return (
  //     <div>
  //       {Array.from({ length: count }, (_, index) => (
  //         <i className="fa-solid fa-star text-warning" key={index}></i>
  //       ))}
  //     </div>
  //   );
  // }

  const getData = async (searchTerm = '', filterKelas = [], filterkategori = []) => {
    setLoading(true);
    try {
      const url = `http://localhost:3001/api/penginapan/get_all?keyword=${searchTerm}&filter[kelas_penginapan]=${filterKelas.join(',')}&filter[kategori_penginapan]=${filterkategori.join(',')}`;
      const response = await axios.get(url);
      if (response) {
        setPenginapanDatas(response.data.data);
        setLoading(false);
        toogleOnclose();
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setOnshow(true);
        setLoading(false);
        setPenginapanDatas(error.response.data.data);
        setMessage(error.response.data.message);
        setTimeout(() => {
          toogleOnclose();
        }, 1000);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    getData(keyword, kelasPenginapan, kategoriPenginapan);
  }, []);

  return (
    <section className='desawisata'>
      <div className='desawisata-header my-bottom-4'>
        <span className='text-white'><a className='text-white' href='/'>Home</a> / Penginapan</span>
      </div>
      <div className='d-flex flex-row justify-content-center w-100'>
        <div>
          <div className="sidebar-desawisata">
            <span className='fw-bold'><i className="fa-solid fa-search"></i> Temukan penginapan tujuanmu?</span>
            <div className="form-group py-3">
              <input
                type="text"
                className="form-control"
                placeholder="Cari"
                value={keyword}
                onChange={searchKeyword}
              />
            </div>
          </div>

          <div className="sidebar-desawisata-rating my-4">

            <div className='my-bottom-1'>
              <span className='fw-bold'><i className="fa-solid fa-filter"></i> Filter</span>
              </div>
            <span className=''>Kategori</span>
            <div className='py-3'>
              <div className="form-group d-flex flex-row">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Hotel" onChange={handleCheckboxChangeKategori} />
                <div className='mx-2'>
                  <span>Hotel</span>
                </div>
              </div>
              <div className="form-group d-flex flex-row">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Homestay" onChange={handleCheckboxChangeKategori} />
                <div className='mx-2'>
                  <span>Homestay</span>
                </div>
              </div>
            </div>
            <span className=''>Bintang</span>
            <div className='py-3'>
              <div className="form-group d-flex flex-row">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="5" onChange={handleCheckboxChange} />
                <div className='mx-2 text-warning'>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="form-group d-flex flex-row">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="4" onChange={handleCheckboxChange} />
                <div className='mx-2 text-warning'>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="form-group d-flex flex-row">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="3" onChange={handleCheckboxChange} />
                <div className='mx-2 text-warning'>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="form-group d-flex flex-row">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="2" onChange={handleCheckboxChange} />
                <div className='mx-2 text-warning'>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="form-group d-flex flex-row">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="1" onChange={handleCheckboxChange} />
                <div className='mx-2 text-warning'>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {PenginapanDatas != 0 ? (
          <PenginapanContent dataPenginapan={PenginapanDatas} isLoading={loading} />
        ) : (
          <div>
            <div className="cover-kuliner-page">
              <div className="child-cardkuliner-loading">
                <div className='d-flex' style={{ height: 200, width: 200 }}>
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                  />
                </div>
              </div>
              <div className="child-cardkuliner-loading">
                <div className='d-flex' style={{ height: 200, width: 200 }}>
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                  />
                </div>
              </div>
              <div className="child-cardkuliner-loading">
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


      {message !== '' && (
        <Alert show={onshow} onClose={toogleOnclose} status={"Info"} message={message} />
      )}
    </section>
  );
}

export default PenginapanPage;
