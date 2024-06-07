import { React, useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from './../assets/js/loading.json';
import Alert from '../../modal/alert';

import KulinerContent from './components/contentkuliner';

function KulinerPage() {

  const [KulinerDatas, setKulinerDatas] = useState([]);
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
        ? `http://localhost:3001/api/kuliner/get_all?keyword=${searchTerm}`
        : 'http://localhost:3001/api/kuliner/get_all';

      const response = await axios.get(url);
      if (response) {
        setKulinerDatas(response.data.data);
        setLoading(false);
        toogleOnclose();
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setOnshow(true);
        setLoading(false);
        setKulinerDatas(error.response.data.data);
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
        <span className='text-white'><a className='text-white' href='/'>Home</a> / Kuliner</span>
      </div>
      <div className='d-flex flex-row justify-content-center w-100'>

        <div className="sidebar-desawisata">
          <span className='fw-bold'>Temukan tempat kuliner Anda</span>
          <div className="form-group py-3">
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Cari" value={keyword} onChange={searchKeyword} />
          </div>
        </div>

        {KulinerDatas != 0 ? (
          <KulinerContent datakuliner={KulinerDatas} isLoading={loading}/>
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

export default KulinerPage;
