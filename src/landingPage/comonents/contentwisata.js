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
    const cardData = [
        { "id": 1, "nama": 'Wisata Nongko Ijo', "kategori": "Wisata", "harga": '20000', "imageUrl": WisataNongkoIjo },
        { "id": 2, "nama": 'Wisata Air Terjun Kertoimbo', "kategori": "Wisata", "harga": 'GRATIS', "imageUrl": WisataAirTerjunKertoimbo },
        { "id": 3, "nama": 'Wisata Air Terjun Selampir', "kategori": "Wisata", "harga": '20000', "imageUrl": WisataAirTerjunSelampir },
        { "id": 4, "nama": 'Wisata Air Terjun TambakLare', "kategori": "Wisata", "harga": 'GRATIS', "imageUrl": WisataAirTerjunTambakLare },
        { "id": 5, "nama": 'Wisata Bumi Perkemahan', "kategori": "Wisata", "harga": 'GRATIS', "imageUrl": WisataBumiPerkemahan },
        { "id": 6, "nama": 'Wisata Aswin Loka', "kategori": "Wisata", "harga": 'GRATIS', "imageUrl": WisataAirAswinLoka },
        { "id": 7, "nama": 'Wisata Perkebunan Kopi', "kategori": "Wisata", "harga": 'GRATIS', "imageUrl": WisataPerkebunanKopi },
        { "id": 8, "nama": 'Wisata Tawang Mangu', "kategori": "Wisata", "harga": 'GRATIS', "imageUrl": WisataTawangMangu },
    ];

    const harga = "100000";
    const hargaFormatted = Number(harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasBeenVisible, setHasBeenVisible] = useState(false); // Variabel status tambahan
    const [maxSlide, setmaxSlide] = useState(false);

    function handleScroll() {
        // Mengambil elemen scroll-images dan child pertama
        const scrollImages = document.querySelector('.scroll-images');
        const firstChild = scrollImages?.querySelector('.child');

        if (firstChild) {
            // Mengambil posisi dan lebar scroll-images serta posisi child pertama
            const scrollImagesRect = scrollImages.getBoundingClientRect();
            const firstChildRect = firstChild.getBoundingClientRect();

            // Menentukan apakah posisi child pertama terlihat dalam viewport dan berada dalam batas lebar scroll-images
            const isVisible = firstChildRect.top < window.innerHeight && firstChildRect.left >= scrollImagesRect.left && firstChildRect.right <= scrollImagesRect.right;

            // Jika child pertama terlihat dalam viewport dan berada dalam batas lebar scroll-images, set hasBeenVisible menjadi true
            if (!hasBeenVisible && isVisible) {
                setHasBeenVisible(true);
            }
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasBeenVisible]);

    const nextSlide = () => {
        const container = document.querySelector('.scroll-images');
        const card = document.querySelector('.child');
        if (container) {
            const cardwidth = card.offsetWidth;
            const widthswipe = cardwidth + 16
            let newIndex = currentIndex + 1;
            if (newIndex >= cardData.length - 4) {
                // newIndex = 0;
                setmaxSlide(true);
            }
            setCurrentIndex(newIndex);
            container.scrollTo({
                left: widthswipe * newIndex,
                behavior: 'smooth'
            });
        }
    };

    const prevSlide = () => {
        setmaxSlide(false);
        const container = document.querySelector('.scroll-images');
        const card = document.querySelector('.child');
        if (container) {
            const children = container.children;
            const cardwidth = card.offsetWidth;
            const widthswipe = cardwidth + 16
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = children.length - 1;
            }
            setCurrentIndex(newIndex);
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
                {currentIndex > 0 && (
                    <button className="left" onClick={prevSlide}>
                        <i className="fa fa-angle-left"></i>
                    </button>
                )}

                <div className="scroll-images">
                    {cardData.map((item, index) => {
                        return (
                            <a href='/' key={index} className={`child ${hasBeenVisible ? 'animasi' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
                                <div className='cover-img'>
                                    <img src={item.imageUrl} alt='foto kosong' />
                                </div>
                                <div className='text-child'>
                                    <div className='d-flex flex-column'>
                                        <a className='text-bold text-black text-size-12'>{item.nama}</a>
                                        <a className='text-size-10 text-black'>{item.kategori}</a>
                                    </div>
                                    {item.harga == "GRATIS" ? (
                                        <a className='text-default text-bold'>{item.harga}</a>
                                    ) : (
                                        <a className='text-default text-bold'>{Number(item.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</a>
                                    )}
                                </div>
                            </a>
                        )
                    })}
                </div>
                {maxSlide === false && cardData.length > 4 && (
                    <button className="right" onClick={nextSlide}>
                        <i className="fa fa-angle-right"></i>
                    </button>
                )}
            </div>
            {cardData.length > 4 && (
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
