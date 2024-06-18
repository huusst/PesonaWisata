import { React, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';

import not_found_image from './../../assets/img/image_notfound.png'
import animationData from "./../../assets/js/loading.json"

import gambar1 from "./../../assets/img/kamar1.jpg"
import gambar2 from "./../../assets/img/kamar2.jpg"
import gambar3 from "./../../assets/img/kamarmandi.jpg"
import gambar4 from "./../../assets/img/kamarmandi1.jpg"
import gambar5 from "./../../assets/img/kamar3.jpg"
import gambar6 from "./../../assets/img/kamar4.jpg"
import gambar7 from "./../../assets/img/kamarmandi2.jpg"
import gambar8 from "./../../assets/img/kamarmandi3.jpg"

function KamarDetailPenginapan({ id }) {
    const [DetailKamar, setDataDetailKamar] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialSlideState, setinitialSlideState] = useState();

    const DetailKamars = [
        {
          "nama_kamar": 'Standard Couple',
          "deskripsi": "Kamar Standard dengan 1 Ranjang ukuran Double, fasilitas LCD TV , AC dengan kamar mandi sharing (di luar kamar) yang membuat harga menjadi lebih terjangkau.  Kapasitas kamar max 2 orang dewasa, selebihnya ada charge tambahan. Perlu diingat Kamar kami non smoking, mohon bagi yang merokok untuk merokok di balkon.",
          "harga": "200000",
          "kapasitas": "2",
          "jumlah_kamar": "2",
          "bebas_rokok": "true",
          "fasilitas_sarapan": "true",
          "id": 1,
          "imageUrl": [
            {
              "id": 1,
              "url": gambar1,
            },
            {
              "id": 2,
              "url": gambar2,
            },
            {
              "id": 3,
              "url": gambar3,
            },
            {
              "id": 4,
              "url": gambar4,
            },
          ]
        },
        {
          "id": 2,
          "nama_kamar": 'Standard Couple',
          "deskripsi": "Kamar Standard dengan 1 Ranjang ukuran Double, fasilitas LCD TV , AC dengan kamar mandi sharing (di luar kamar) yang membuat harga menjadi lebih terjangkau.  Kapasitas kamar max 2 orang dewasa, selebihnya ada charge tambahan. ",
          "harga": "200000",
          "kapasitas": "2",
          "jumlah_kamar": "2",
          "bebas_rokok": "false",
          "fasilitas_sarapan": "true",
          "imageUrl": [
            {
              "id": 1,
              "url": gambar1,
            },
            {
              "id": 2,
              "url": gambar2,
            },
            {
              "id": 3,
              "url": gambar3,
            },
            {
              "id": 4,
              "url": gambar4,
            },
          ]
        },
        {
          "id": 3,
          "nama_kamar": 'Standard Family',
          "deskripsi": "Kamar Standard dengan 1 Ranjang ukuran Double, fasilitas LCD TV , AC dengan kamar mandi dalam yang membuat harga menjadi lebih mahal dari lainnya.  Kapasitas kamar max 2 orang dewasa, selebihnya ada charge tambahan.",
          "harga": "450000",
          "kapasitas": "4",
          "jumlah_kamar": "5",
          "bebas_rokok": "true",
          "fasilitas_sarapan": "true",
          "imageUrl": []
        }
      ];

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/api/penginapan/kamar/${id}`)
            if (response) {
                setDataDetailKamar(response.data.data)
                const initialSlideState = response.data.data.reduce((acc, item) => {
                    acc[item.id] = 0;
                    return acc;
                }, {});
                setCurrentSlides(initialSlideState)
                setLoading(false)
                console.log(response.data.data)
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


    const [currentSlides, setCurrentSlides] = useState(initialSlideState);

    const prevSlide = (id, length) => {
        setCurrentSlides(prev => ({
            ...prev,
            [id]: prev[id] === 0 ? length - 1 : prev[id] - 1
        }));
        console.log('id', id)
    };

    const nextSlide = (id, length) => {
        setCurrentSlides(prev => ({
            ...prev,
            [id]: prev[id] === length - 1 ? 0 : prev[id] + 1
        }));
        console.log('id', id)
    };

    return (
        <div className="cover-detail my-top-2 flex-column" id='kamar'>
            <div className='d-flex flex-row my-bottom-1'>
                <span className='mx-1 text-bold text-size-14'>Kamar yang tersedia</span>
            </div>
            <div>

                {!loading ? (
                    <>
                        {DetailKamar.length !== 0 ? (
                            <>

                                {DetailKamar.map((item, index) => {
                                    return (
                                        <div className='card-kamar' key={item.id}>
                                            <div className='container-image'>
                                                {item.imageUrl.length === 0 ? (
                                                    <div className="mySlides active">
                                                        <img className='rounded-10' src={not_found_image} alt={`Slide ${currentSlides[item.id] + 1}`} style={{ width: '100%', height: '50%' }} />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="mySlides active">
                                                            <div className="numbertext">{currentSlides[item.id] + 1} / {item.imageUrl.length}</div>
                                                            <img className='rounded-10' src={item.imageUrl[currentSlides[item.id]].url} alt={`Slide ${currentSlides[item.id] + 1}`} style={{ width: '100%', height: '50%' }} />
                                                        </div>
                                                        <a className="prev" onClick={() => prevSlide(item.id, item.imageUrl.length)}>❮</a>
                                                        <a className="next" onClick={() => nextSlide(item.id, item.imageUrl.length)}>❯</a>
                                                    </>
                                                )}
                                                {/* <div className="caption-container">
                                    <span className='py-2' id="caption">Lihat detail</span>
                                </div> */}
                                            </div>
                                            <div className='mx-4 d-flex flex-column w-25'>
                                                <span className='text-bold my-bottom-1'>{item.nama_kamar}</span>
                                                <span className='text-size-10'>{item.deskripsi}</span>
                                            </div>
                                            <div className='mx-4 d-flex flex-column w-25'>
                                                <span className='text-bold my-bottom-1'>Detail</span>
                                                <div className='d-flex flex-column'>
                                                    <div className='d-flex align-items-center  py-1'>
                                                        <i className="fa-solid fa-user text-size-12"></i>
                                                        <span className='text-size-12 mx-2'>{item.kapasitas} Tamu</span>
                                                    </div>
                                                    {item.fasilitas_sarapan == "true" && (
                                                        <div className='d-flex align-items-center py-1'>
                                                            <i className="fa-solid fa-utensils text-size-12"></i>
                                                            <span className='text-size-12 mx-2'>Termasuk sarapan</span>
                                                        </div>
                                                    )}
                                                    {item.bebas_rokok == "true" && (
                                                        <div className='d-flex align-items-center  py-1'>
                                                            <i className="fa-solid fa-ban-smoking text-size-12"></i>
                                                            <span className='text-size-12 mx-2'>Bebas asap rokok</span>
                                                        </div>
                                                    )}
                                                    <div className='d-flex align-items-center  py-1'>
                                                        <span className='text-size-14 text-danger'>Sisa {item.jumlah_kamar} kamar tersedia!</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mx-4 d-flex flex-column w-10'>
                                                <span className='text-bold my-bottom-1'>Harga/Kamar/Malam</span>
                                                <span className='text-default text-size-18 text-bold my-2'>{Number(item.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                                <button className='button-price'>Pesan</button>
                                            </div>
                                        </div>
                                    )
                                })}
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
        </div>
    );
}

export default KamarDetailPenginapan;
