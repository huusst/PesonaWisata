import { React, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ContentDetailDesaWisata from './components/content';
import HeaderDetail from './components/header';

function DesaWisataDetail() {
  const { id } = useParams();
  const [namaDesa, setnamaDesa] = useState('');
  const [DataDetailDesawisata, setDataDetailDesawisata] = useState([]);
  const [DataWisata, setDataWisata] = useState([]);
  const [DataKuliner, setDataKuliner] = useState([]);
  const [DataPenginapan, setDataPenginapan] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/desawisata/${id}`)
      if (response) {
        setDataDetailDesawisata(response.data.data)
        setnamaDesa(response.data.data[0].nama_desaWisata)
      }
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.msg);
      }
    }
  }, [id])

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <section className='desawisata'>
      <div className='desawisata-header my-bottom-4'>
        <span className='text-white'><a className='text-white' href='/'>Home</a> / <a className='text-white' href='/desawisata'>Desa Wisata</a> / {namaDesa}</span>
      </div>
      {DataDetailDesawisata != null && (
        <div className='d-flex flex-column'>
          <HeaderDetail DetailDesa={DataDetailDesawisata} />
          <ContentDetailDesaWisata nama_desa={namaDesa} id={id} />
        </div>
      )}
    </section>
  );
}

export default DesaWisataDetail;
