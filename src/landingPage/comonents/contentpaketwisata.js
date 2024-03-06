import React, { useState, useEffect } from 'react';
import WisataAirAswinLoka from "./../assets/img/WisataAirAswinLoka.png"
// import WisataAirTerjunKertoimbo from "./../assets/img/WisataAirTerjunKertoimbo.png"
// import WisataAirTerjunSelampir from "./../assets/img/WisataAirTerjunSelampir.png"
// import WisataAirTerjunTambakLare from "./../assets/img/WisataAirTerjunTambakLare.png"
import WisataBumiPerkemahan from "./../assets/img/WisataBumiPerkemahan.png"
import WisataNongkoIjo from "./../assets/img/WisataNongkoIjo.png"
import WisataPerkebunanKopi from "./../assets/img/WisataPerkebunanKopi.png"
import WisataTawangMangu from "./../assets/img/WisataTawangMangu.png"

const Slider = () => {
    // Daftar data card slider
    const cardDatapaket = [
        { "id": 1, "nama": 'Paket Kota Pendekar 1 hari', "harga_potongan" : "0", "harga": '150000', "imageUrl": WisataBumiPerkemahan },
        { "id": 2, "nama": 'Paket Jalan - Jalan di Madiun 8 jam', "harga_potongan" : "50000", "harga": '200000', "imageUrl": WisataAirAswinLoka },
        { "id": 3, "nama": 'Paket Keluarga 2 hari', "harga_potongan" : "0", "harga": '250000', "imageUrl": WisataPerkebunanKopi },
        { "id": 4, "nama": 'Paket Mahasiswa 1 hari', "harga_potongan" : "50000", "harga": '200000', "imageUrl": WisataTawangMangu },
        { "id": 5, "nama": 'Paket Explore Kare 2 hari', "harga_potongan" : "50000", "harga": '300000', "imageUrl": WisataNongkoIjo },
        
    ];

    const [currentIndexpaket, setcurrentIndexpaket] = useState(0);
    const [hasBeenVisiblepaket, sethasBeenVisiblepaket] = useState(false); // Variabel status tambahan
    const [maxSlidepaket, setmaxSlidepaket] = useState(false);

    function handleScroll() {
        // Mengambil elemen scroll-images dan child pertama
        const scrollImages = document.querySelector('.scroll-paket');
        const firstChild = scrollImages?.querySelector('.child-paket');

        if (firstChild) {
            // Mengambil posisi dan lebar scroll-images serta posisi child pertama
            const scrollImagesRect = scrollImages.getBoundingClientRect();
            const firstChildRect = firstChild.getBoundingClientRect();

            // Menentukan apakah posisi child pertama terlihat dalam viewport dan berada dalam batas lebar scroll-images
            const isVisible = firstChildRect.top < window.innerHeight && firstChildRect.left >= scrollImagesRect.left && firstChildRect.right <= scrollImagesRect.right;

            // Jika child pertama terlihat dalam viewport dan berada dalam batas lebar scroll-images, set hasBeenVisiblepaket menjadi true
            if (!hasBeenVisiblepaket && isVisible) {
                sethasBeenVisiblepaket(true);
            }
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasBeenVisiblepaket]);

    const nextSlide = () => {
        const container = document.querySelector('.scroll-paket');
        const card = document.querySelector('.child-paket');
        if (container) {
            const cardwidth = card.offsetWidth;
            const widthswipe = cardwidth + 16
            let newIndex = currentIndexpaket + 1;
            if (newIndex >= cardDatapaket.length - 4) {
                setmaxSlidepaket(true);
            }
            setcurrentIndexpaket(newIndex);
            container.scrollTo({
                left: widthswipe * newIndex,
                behavior: 'smooth'
            });
        }
    };

    const prevSlide = () => {
        setmaxSlidepaket(false);
        const container = document.querySelector('.scroll-paket');
        const card = document.querySelector('.child-paket');
        if (container) {
            const children = container.children;
            const cardwidth = card.offsetWidth;
            const widthswipe = cardwidth + 16
            let newIndex = currentIndexpaket - 1;
            if (newIndex < 0) {
                newIndex = children.length - 1;
            }
            setcurrentIndexpaket(newIndex);
            container.scrollTo({
                left: widthswipe * newIndex,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div>
            <div className="cover">
                <div className='d-flex flex-row my-bottom-2'>
                    <span className='mx-1 text-bold text-size-14'>Destinasi Wisata di Madiun</span>
                </div>
                {currentIndexpaket > 0 && (
                    <button className="left" onClick={prevSlide}>
                        <i className="fa fa-angle-left"></i>
                    </button>
                )}

                <div className="scroll-paket">
                    {cardDatapaket.map((item, index) => {
                        const harga_paket = item.harga - item.harga_potongan;
                        return (
                            <div key={index} className={`child-paket ${hasBeenVisiblepaket ? 'animasi' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
                                <div className='cover-img'>
                                    <img src={item.imageUrl} alt='not found'/>
                                </div>
                                <div className='text-child-paket'>
                                    <div className='d-flex flex-column'>
                                        <a className='text-bold text-black text-size-10'>{item.nama}</a>
                                    </div>
                                    <div className='d-flex flex-column'>
                                    {item.harga_potongan == "0" ? (
                                        <a className='text-default text-bold'></a>
                                    ) : (
                                        <a className='text-secondary text-size-8 text-coret'>{Number(item.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</a>
                                    )}
                                        <a className='text-default text-bold'>{Number(harga_paket).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {maxSlidepaket === false && cardDatapaket.length > 4 && (
                    <button className="right" onClick={nextSlide}>
                        <i className="fa fa-angle-right"></i>
                    </button>
                )}
            </div>
            {cardDatapaket.length > 4 && (
                <div className='d-flex justify-content-center my-bottom-2'>
                    <button className='btn-detail'>
                        <span>Lihat Semua</span><i className="mx-1 fa fa-angle-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Slider;
