import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Kuliner = ({ datakuliner, nama_desa }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const [maxSlide, setmaxSlide] = useState(false);

    function handleScroll() {
        const scrollImages = document.querySelector('.scroll-images-kuliner');
        const firstChild = scrollImages?.querySelector('.child-kuliner');

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
    });

    const nextSlide = () => {
        const container = document.querySelector('.scroll-images-kuliner');
        const card = document.querySelector('.child-kuliner');
        if (container) {
            const cardwidth = card.offsetWidth;
            const widthswipe = cardwidth + 16
            let newIndex = currentIndex + 1;
            if (newIndex >= datakuliner.length - 4) {
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
        const container = document.querySelector('.scroll-images-kuliner');
        const card = document.querySelector('.child-kuliner');
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

    const navigate = useNavigate();
    const Navigate = (href) => {
        navigate(`${href}`);
    };

    return (
        <div>
            <div className="cover">
                <div className='d-flex flex-row'>
                    <span className='mx-1 text-bold text-size-14'>Tempat Kuliner {nama_desa}</span>
                </div>

                {currentIndex > 0 && (
                    <button className="left" onClick={prevSlide}>
                        <i className="fa fa-angle-left"></i>
                    </button>
                )}

                <div className="scroll-images-kuliner">
                    {datakuliner.map((item, index) => {
                        return (
                            <span onClick={() => Navigate(`/kuliner/${item.id}`)} key={index} className={`child-kuliner ${hasBeenVisible ? 'animasi' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
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
                            </span>
                        )
                    })}
                </div>
                {maxSlide === false && datakuliner.length > 4 && (
                    <button className="right" onClick={nextSlide}>
                        <i className="fa fa-angle-right"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Kuliner;
