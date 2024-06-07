import {React, useState, useEffect} from 'react';
import '../assets/css/styles.css';
import ContentDetailwisataWisata from './components/content';
import DesaIcon from "./../assets/img/DesaIcon_blue.png"
import WisataTawangMangu from "./../assets/img/WisataTawangMangu.png"
import HeaderDetail from './components/menulist';

import img1 from '../assets/img/ayam.png'
import img2 from '../assets/img/Nasi.png'
import img3 from '../assets/img/mie.png'
import img4 from '../assets/img/bakso.png'

import img5 from '../assets/img/esjeruk.png'
import img6 from '../assets/img/esteh.jpg'
import img7 from '../assets/img/kopitubruk.png'
import img8 from '../assets/img/KopiKare.png'

import img9 from '../assets/img/tempegoreng.jpg'
import img10 from '../assets/img/tahupetis.png'
import img11 from '../assets/img/kentanggoreng.png'
import img12 from '../assets/img/anekafrozen.png'

function KulinerDetail() {
    const [namaDesa, setnamaDesa] = useState('');
    const [alamatDesa, setalamatDesa] = useState('');

    const Detailwisata = [
      { "id": 1, "nama": 'Resto Amanah', "kategori": "kuliner", "alamat":"Kare, Kec. Kare, Kabupaten Madiun, Jawa Timur", "harga": null, "koordinat": "-7.735115, 111.684778", "link_iframe":"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3953.3904123187626!2d111.699846!3d-7.748349!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79aff2833d7301%3A0xd66901fc900f0c3b!2sSekar%20Wilis%20Resto%20Kare!5e0!3m2!1sid!2sid!4v1716020544690!5m2!1sid!2sid", "alamat":"Kare, Kec. Kare, Kabupaten Madiun, Jawa Timur", "imageUrl": WisataTawangMangu },
    ];
    const Kategori = [
      { 'id_kategori': 1, 'nama_kategori_menu': 'Makanan' },
      { 'id_kategori': 2, 'nama_kategori_menu': 'Minuman' },
      { 'id_kategori': 3, 'nama_kategori_menu': 'Snack' },
      { 'id_kategori': 4, 'nama_kategori_menu': 'Dessert' },
    ];

    const menuData = [
      { 'id': 1, 'id_kategori': 1, 'img': img1, 'name': 'Makanan 1', 'price':  15000 },
      { 'id': 2, 'id_kategori': 1, 'img': img2, 'name': 'Makanan 2', 'price':  12000 },
      { 'id': 3, 'id_kategori': 1, 'img': img3, 'name': 'Makanan 3', 'price':  13000 },
      { 'id': 4, 'id_kategori': 2, 'img': img5, 'name': 'Minuman 1', 'price':  9000 },
      { 'id': 5, 'id_kategori': 2, 'img': img6, 'name': 'Minuman 2', 'price':  5000 },
      { 'id': 6, 'id_kategori': 2, 'img': img7, 'name': 'Minuman 3', 'price':  3000 },
      { 'id': 7, 'id_kategori': 3, 'img': img9, 'name': 'Snack 1', 'price':  10000 },
      { 'id': 8, 'id_kategori': 3, 'img': img10, 'name': 'Snack 2', 'price':  11000 },
      { 'id': 9, 'id_kategori': 3, 'img': img11, 'name': 'Snack 3', 'price':  10000 },
      { 'id': 10, 'id_kategori': 4, 'img': img4, 'name': 'Snack 1', 'price':  10000 },
      { 'id': 11, 'id_kategori': 4, 'img': img8, 'name': 'Snack 2', 'price':  11000 },
      { 'id': 12, 'id_kategori': 4, 'img': img12, 'name': 'Snack 3', 'price':  10000 }
    ];

  useEffect(() => {
    setnamaDesa(Detailwisata[0].nama)
    setalamatDesa(Detailwisata[0].alamat)
}, [namaDesa]);

  return (
    <section className='desawisata'>
        <div className='desawisata-header my-bottom-4'>
            <div className='py-5'>
            <span className='text-size-20 text-bold text-white'>Kuliner {namaDesa}</span>
            <div className='d-flex flex-row py-2'>
                <img width={20} height={25} src={DesaIcon} alt='not found' />
                <span className='mx-1 text-size-14 text-white'>{alamatDesa}</span>
            </div>
            </div>
        </div>
        <div className='d-flex flex-column'>
          <HeaderDetail Detailwisata={Detailwisata}  kategori={Kategori} menuData={menuData}/>
          <ContentDetailwisataWisata Detailwisata={Detailwisata}/>
        </div>  
    </section>
  );
}

export default KulinerDetail;
