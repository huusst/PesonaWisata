import { React, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/js/loading.json'
import not_found from '../../assets/js/not_found.json'
import { useNavigate } from 'react-router-dom';

function ContentDesaWisata({ dataDesaWisata, isLoading }) {

    const [hasBeenVisible, setHasBeenVisible] = useState(false); // Variabel status tambahan
    const navigate = useNavigate();

    useEffect(() => {
        function handleScroll() {
            // Mengambil posisi card-desawisata teratas
            const desawisataContainer = document.querySelector('.card-desawisata');
            const topPosition = desawisataContainer.getBoundingClientRect().top;

            // Menentukan apakah card-desawisata sudah masuk ke dalam viewport
            const isVisible = topPosition < window.innerHeight;

            // Jika card-desawisata belum pernah terlihat dan saat ini terlihat, set hasBeenVisible menjadi true
            if (!hasBeenVisible && isVisible) {
                setHasBeenVisible(true);
            }
        }

        // Memanggil fungsi handleScroll saat halaman dimuat dan setiap kali terjadi scroll
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Panggil handleScroll saat halaman pertama kali dimuat

        // Membersihkan event listener saat komponen tidak lagi digunakan
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasBeenVisible]);

    const Navigate = (href) => {
        navigate(`${href}`);
    };

    return (
        <div className="content-desawisata">
            {isLoading ? (
                <div className='desawisata-container justify-content-center'>
                    <div className='d-flex' style={{ height: 200, width: 200 }}>
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            autoplay={true}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className='desawisata-container'>
                        {dataDesaWisata === null ? (
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
                        ) : (
                            <>
                                {dataDesaWisata.map((item, index) => {
                                    return (
                                        <span onClick={() => Navigate(`/desawisata/${item.id_desaWisata}`)} key={index} className={`card-desawisata  ${hasBeenVisible ? 'fadeAnimasiUp' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
                                            <div className='content-card'>
                                                <div className='d-flex flex-column p-2'>
                                                    <span className='title-card'>
                                                        {item.nama_desaWisata}
                                                    </span>
                                                    <span className='subtitle-card'>
                                                        {item.data_wisata.jumlah_wisata} Destinasi Wisata
                                                    </span>
                                                </div>
                                            </div>
                                            <img src={item.sampul_desaWisata} alt='not found' />
                                        </span>
                                    )
                                })}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ContentDesaWisata;
