import React, { useState, useEffect } from 'react';

const Penginapan = ({ dataPenginapan, nama_desa }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const [maxSlide, setmaxSlide] = useState(false);

    function handleScroll() {
        const scrollImages = document.querySelector('.scroll-images-penginapan');
        const firstChild = scrollImages?.querySelector('.child-penginapan');

        if (firstChild) {
            const scrollImagesRect = scrollImages.getBoundingClientRect();
            const firstChildRect = firstChild.getBoundingClientRect();

            const isVisible = firstChildRect.top < window.innerHeight && firstChildRect.left >= scrollImagesRect.left && firstChildRect.right <= scrollImagesRect.right;

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
        const container = document.querySelector('.scroll-images-penginapan');
        const card = document.querySelector('.child-penginapan');
        if (container) {
            const cardwidth = card.offsetWidth;
            const widthswipe = cardwidth + 16
            let newIndex = currentIndex + 1;
            if (newIndex >= dataPenginapan.length - 4) {
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
        const container = document.querySelector('.scroll-images-penginapan');
        const card = document.querySelector('.child-penginapan');
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
                <div className='d-flex flex-row'>
                    <span className='mx-1 text-bold text-size-14'>Tempat Penginapan {nama_desa}</span>
                </div>

                {currentIndex > 0 && (
                    <button className="left" onClick={prevSlide}>
                        <i className="fa fa-angle-left"></i>
                    </button>
                )}

                <div className="scroll-images-penginapan">
                    {dataPenginapan.map((item, index) => {
                        return (
                            <a href={`/penginapan/${item.id_penginapan}`} key={index} className={`child-penginapan ${hasBeenVisible ? 'animasi' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
                                <div className='cover-img'>
                                    <img src={item.imageUrl} alt='foto kosong' />
                                </div>
                                <div className='text-child'>
                                    <div className='d-flex flex-column'>
                                        <a className='text-bold text-black text-size-12'>{item.nama}</a>
                                        <a className='text-size-10 text-black'>{item.kategori}</a>
                                    </div>
                                    
                                    <div className='d-flex flex-column py-2'>
                                        <a className='text-secondary text-size-8'>Mulai dari</a>
                                        <a className='text-default text-bold'>{Number(item.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</a>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
                {maxSlide === false && dataPenginapan.length > 4 && (
                    <button className="right" onClick={nextSlide}>
                        <i className="fa fa-angle-right"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Penginapan;