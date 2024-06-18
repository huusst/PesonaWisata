import { React, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ContentDesaWisata from './components/content';
import Alert from '../../modal/alert';
import { debounce } from 'lodash';
import Lottie from 'lottie-react';
import animationData from "./../assets/js/loading.json"

function DesaWisata() {

  const [DesaWisataDatas, setDesaWisataData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [onshow, setOnshow] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchKeyword = (event) => {
    setLoading(true);
    const value = event.target.value;
    setKeyword(value);
    debounceGetData(value);
  };

  const debounceGetData = useCallback(
    debounce((value) => {
      getData(value);
    }, 1000),
    []
  );

  const toogleOnclose = () => {
    setOnshow(false);
  };

  const getData = async (searchTerm = '') => {
    setLoading(true);
    try {
      const url = searchTerm
        ? `http://localhost:3001/api/desawisata/get_all?keyword=${searchTerm}`
        : 'http://localhost:3001/api/desawisata/get_all';

      const response = await axios.get(url);
      if (response) {
        setDesaWisataData(response.data.data);
        setLoading(false);
        toogleOnclose();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setOnshow(true);
        setLoading(false);
        setDesaWisataData(error.response.data.data);
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
    getData();
  }, []);

  return (
    <section className='desawisata'>
      <div className='desawisata-header my-bottom-4'>
        <span className='text-white'><a className='text-white' href='/'>Home</a> / Desa Wisata</span>
      </div>
      <div className='d-flex flex-row justify-content-center'>
        <div className="sidebar-desawisata">
          <span className='fw-bold'><i className="fa-solid fa-search"></i> Temukan desa wisata tujuanmu?</span>
          <div class="form-group py-3">
            <input
              type="text"
              className="form-control"
              placeholder="Cari"
              value={keyword}
              onChange={searchKeyword}
            />
          </div>
        </div>

        {DesaWisataDatas != 0 ? (
          <ContentDesaWisata dataDesaWisata={DesaWisataDatas} isLoading={loading} />
        ) : (
          <div className="content-desawisata">
            <div className='desawisata-container justify-content-center'>
              <div className='d-flex' style={{ height: 200, width: 200 }}>
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

      {message !== '' && (
        <Alert show={onshow} onClose={toogleOnclose} status={"Info"} message={message} />
      )}
    </section>
  );
}

export default DesaWisata;
