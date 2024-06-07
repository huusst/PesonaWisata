import React, { useState, useEffect } from 'react';

const Slider = ({ dataKuliner }) => {

    const [currentIndexpaket, setcurrentIndexpaket] = useState(0);
    const [hasBeenVisiblepaket, sethasBeenVisiblepaket] = useState(false); // Variabel status tambahan
    const [maxSlidepaket, setmaxSlidepaket] = useState(false);

    function handleScroll() {
        // Mengambil elemen scroll-images dan child pertama
        const scrollImages = document.querySelector('.scroll-paket');
        const firstChild = scrollImages?.querySelector('.child-kuliner');

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
        const card = document.querySelector('.child-kuliner');
        if (container) {
            const cardwidth = card.offsetWidth;
            const widthswipe = cardwidth + 16
            let newIndex = currentIndexpaket + 1;
            if (newIndex >= dataKuliner.length - 4) {
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
        const card = document.querySelector('.child-kuliner');
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
                <div className='d-flex flex-row my-4'>
                    <span className='mx-1 text-bold text-size-14'>Kuliner Populer di Kabupaten Madiun</span>
                </div>
                {currentIndexpaket > 0 && (
                    <button className="left" onClick={prevSlide}>
                        <i className="fa fa-angle-left"></i>
                    </button>
                )}

                <div className="scroll-paket">
                    {dataKuliner.map((item, index) => {
                        const harga_paket = item.harga - item.harga_potongan;
                        return (
                            <a href={`/kuliner/${item.id}`} key={index} className={`child-kuliner ${hasBeenVisiblepaket ? 'animasi' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
                                <div className='cover-img'>
                                    <img src={item.imageUrl} alt='foto kosong' />
                                </div>
                                <div className='text-child'>
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex align-item-center'>
                                            <a className='text-size-10 text-black'>{item.kategori}</a>
                                            <i className='d-flex mx-1 text-black'>.</i>
                                            {item.status_buka == "Buka" ? (
                                                <a className='text-size-10 text-black'>Sedang {item.status_buka}</a>
                                            ) : (
                                                <a className='text-size-10 text-danger'>Sedang {item.status_buka}</a>
                                            )}
                                        </div>
                                        <a className='text-bold text-black text-size-12 my-1'>{item.nama}</a>
                                    </div>

                                </div>
                            </a>
                        )
                    })}
                </div>
                {maxSlidepaket === false && dataKuliner.length > 4 && (
                    <button className="right" onClick={nextSlide}>
                        <i className="fa fa-angle-right"></i>
                    </button>
                )}
            </div>
            {dataKuliner.length > 4 && (
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
