import {React, useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/styles.css';
import ContentDetailwisataWisata from './components/content';
import DesaIcon from "./../assets/img/DesaIcon_blue.png"
import WisataNongkoIjo from "./../assets/img/WisataNongkoIjo.png"

import HeaderDetail from './components/header';

function WisataDetail() {
    const { id } = useParams();
    const [namaDesa, setnamaDesa] = useState('');
    const [alamatDesa, setalamatDesa] = useState('');
    const [Detailwisata, setDetailwisata] = useState([]);
    const [loading, setLoading] = useState(false);
  

  const Detailwisatas = [
    { "id": 1, "nama": 'Nongko Ijo', "harga": '20000', "koordinat": "-7.735115, 111.684778", "alamat":"Kare, Kec. Kare, Kabupaten Madiun, Jawa Timur", "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime perferendis obcaecati in quo consequatur, officiis iure ab sint eveniet soluta quis, reprehenderit ducimus doloremque et! Tenetur nisi autem doloribus rem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea quod aliquam ex, eum doloremque consectetur autem dignissimos deserunt unde libero nostrum labore quos perferendis? Mollitia labore deserunt aspernatur vitae quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime perferendis obcaecati in quo consequatur, officiis iure ab sint eveniet soluta quis, reprehenderit ducimus doloremque et! Tenetur nisi autem doloribus rem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea quod aliquam ex, eum doloremque consectetur autem dignissimos deserunt unde libero nostrum labore quos perferendis? Mollitia labore deserunt aspernatur vitae quos!", "link_iframe":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.514559832501!2d111.68221217484371!3d-7.7351142922833285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79afe6906b5b9b%3A0x596fc20d052be1ff!2sHutan%20Pinus%20NONGKO%20IJO!5e0!3m2!1sid!2sid!4v1716019800932!5m2!1sid!2sid", "imageUrl": WisataNongkoIjo },
  ];


const getData = useCallback(async () => {
  setLoading(true);
  try {
    const response = await axios.get(`http://localhost:3001/api/wisata/detail/${id}`)
    if (response) {
      setDetailwisata(response.data.data)
      setnamaDesa(response.data.data[0].nama)
      setalamatDesa(response.data.data[0].alamat)
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
        <div className='desawisata-header my-bottom-4'>
            <div className='py-5'>
            <span className='text-size-20 text-bold text-white'>Wisata {namaDesa}</span>
            <div className='d-flex flex-row py-2'>
                <img width={20} height={25} src={DesaIcon} alt='not found' />
                <span className='mx-1 text-size-14 text-white'>{alamatDesa}</span>
            </div>
            </div>
        </div>
      {Detailwisata.length !== 0 && (
        <div className='d-flex flex-column'>
          <HeaderDetail Detailwisata={Detailwisata}/>
          <ContentDetailwisataWisata Detailwisata={Detailwisata}/>
        </div>
      )}
    </section>
  );
}

export default WisataDetail;
