import React, { useState, useEffect } from 'react';
import DesaIcon from "./../../assets/img/DesaIcon_blue.png"
import Lottie from 'lottie-react';
import animationData from './../../assets/js/loading.json';
import not_found from './../../assets/js/not_found.json'
import { useNavigate } from 'react-router-dom';

const PenginapanContent = ({ dataPenginapan, isLoading }) => {
    const [hasBeenVisible, setHasBeenVisible] = useState(false);

    function handleScroll() {
        const scrollImages = document.querySelector('.cover-kuliner-page');
        const firstChild = scrollImages?.querySelector('.child-cardPenginapan');

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


    function StarRating({ count }) {
        return (
            <div>
                {Array.from({ length: count }, (_, index) => (
                    <i className="fa-solid fa-star text-warning" key={index}></i>
                ))}
            </div>
        );
    }

    const navigate = useNavigate();
    const Navigate = (href) => {
        navigate(`${href}`);
    };

    return (
        <div>
            <div className="cover-kuliner-page">
                {isLoading ? (
                    <>
                        <div className="child-cardPenginapan-loading">
                            <div className='d-flex' style={{ height: 200, width: 200 }}>
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    autoplay={true}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {dataPenginapan === null ? (
                            <div className="cover-kuliner-page-notfound">
                                <div className='w-100 d-flex py-1 flex-column align-item-center'>
                                    <div className='d-flex' style={{ height: 200, width: 200 }}>
                                        <Lottie
                                            animationData={not_found}
                                            loop={true}
                                            autoplay={true}
                                        />
                                    </div>
                                    <p className='text-default text-size-14 text-bold'>Oops, data belum terdaftar</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {dataPenginapan.map((item, index) => {
                                    return (
                                        <span onClick={() => Navigate(`/penginapan/${item.id}`)} key={index} className={`child-cardPenginapan ${hasBeenVisible ? 'animasi' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
                                            <div className='cover-img'>
                                                <img src={item.imageUrl} alt='foto kosong' />
                                            </div>
                                            <div className='text-child'>
                                                <div className='d-flex flex-column'>
                                                    <a className='text-bold text-black text-size-16'>{item.nama}</a>
                                                    <a className='text-size-10 text-black py-1'>{item.kategori}</a>
                                                    <StarRating count={item.kelas} />
                                                    <div className='d-flex flex-row py-3'>
                                                        <img width={15} height={20} src={DesaIcon} alt='not found' />
                                                        <a className='text-size-10 text-secondary mx-2'>{item.alamat}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    )
                                })}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PenginapanContent;
