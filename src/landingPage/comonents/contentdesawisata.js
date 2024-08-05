import { React, useEffect, useState } from 'react';
import DesaIcon from "./../assets/img/DesaIcon_blue.png"
import { useNavigate } from 'react-router-dom';

function ContentDesaWisata({ dataDesaWisata }) {

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
        <div className="Leanding-content-desawisata">
            <div className='d-flex flex-row my-bottom-2'>
                <img src={DesaIcon} alt='not found' />
                <span className='mx-1 text-bold text-size-14'>Temukan Desa Wisata di Kabupaten Madiun yang Menarik</span>
            </div>
            <div className='desawisata-container my-bottom-4 py-1'>
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
            </div>
        </div>
    );
}

export default ContentDesaWisata;
