import React, { useState, useEffect } from 'react';
import WisataAirAswinLoka from "./../assets/img/WisataAirAswinLoka.png"
import WisataAirTerjunKertoimbo from "./../assets/img/WisataAirTerjunKertoimbo.png"
import WisataAirTerjunSelampir from "./../assets/img/WisataAirTerjunSelampir.png"
import WisataAirTerjunTambakLare from "./../assets/img/WisataAirTerjunTambakLare.png"
import WisataBumiPerkemahan from "./../assets/img/WisataBumiPerkemahan.png"
import WisataNongkoIjo from "./../assets/img/WisataNongkoIjo.png"
import WisataPerkebunanKopi from "./../assets/img/WisataPerkebunanKopi.png"
import WisataTawangMangu from "./../assets/img/WisataTawangMangu.png"

const Slider = () => {
    // Daftar data card slider
    const cardDatapaket = [
        { "id": 1, "nama": 'Wisata Bumi Perkemahan', "harga": 'GRATIS', "imageUrl": WisataBumiPerkemahan },
        { "id": 2, "nama": 'Wisata Aswin Loka', "harga": 'GRATIS', "imageUrl": WisataAirAswinLoka },
        { "id": 3, "nama": 'Wisata Perkebunan Kopi', "harga": 'GRATIS', "imageUrl": WisataPerkebunanKopi },
        { "id": 4, "nama": 'Wisata Tawang Mangu', "harga": 'GRATIS', "imageUrl": WisataTawangMangu },
        { "id": 5, "nama": 'Wisata Nongko Ijo', "harga": 'GRATIS', "imageUrl": WisataNongkoIjo },
        { "id": 6, "nama": 'Wisata Air Terjun Kertoimbo', "harga": 'GRATIS', "imageUrl": WisataAirTerjunKertoimbo },
        { "id": 7, "nama": 'Wisata Air Terjun Selampir', "harga": 'GRATIS', "imageUrl": WisataAirTerjunSelampir },
        { "id": 8, "nama": 'Wisata Air Terjun TambakLare', "harga": 'GRATIS', "imageUrl": WisataAirTerjunTambakLare },
        
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
            const children = container.children;
            const cardwidth = card.offsetWidth;
            const widthswipe = cardwidth + 16
            let newIndex = currentIndexpaket + 1;
            if (newIndex >= cardDatapaket.length - 4) {
                // newIndex = 0;
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
                        return (
                            <div key={index} className={`child-paket ${hasBeenVisiblepaket ? 'animasi' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
                                <div className='cover-img'>
                                    <img src={item.imageUrl}></img>
                                </div>
                                <h4 >{item.nama}</h4>
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
