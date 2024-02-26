import { React, useEffect, useState } from 'react';
import DesaKare from "./../assets/img/DesaKare.png"
import DesaBodag from "./../assets/img/DesaBodag.png"
import DesaBrumbun from "./../assets/img/DesaBrumbun.png"
import DesaKepel from "./../assets/img/DesaKepel.png"
import DesaIcon from "./../assets/img/DesaIcon_blue.png"

function ContentDesaWisata() {
    const DesaWisataData = [
        {
            "title": "Desa Wisata Kare",
            "jumlah": 15,
            "img": DesaKare
        },
        {
            "title": "Desa Wisata Bodag",
            "jumlah": 7,
            "img": DesaBodag
        },
        {
            "title": "Desa Wisata Brumbun",
            "jumlah": 4,
            "img": DesaBrumbun
        },
        {
            "title": "Desa Wisata Kepel",
            "jumlah": 2,
            "img": DesaKepel
        },
    ];

    const [hasBeenVisible, setHasBeenVisible] = useState(false); // Variabel status tambahan

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

    return (
        <div className="Leanding-content-desawisata">
            <div className='d-flex flex-row my-bottom-2'>
                <img src={DesaIcon} alt='not found' />
                <span className='mx-1 text-bold text-size-14'>Temukan Desa Wisata di Madiun yang Menarik</span>
            </div>
            <div className='desawisata-container my-bottom-4 py-1'>
                {DesaWisataData.map((item, index) => {
                    return(
                    <a key={index} className={`card-desawisata  ${hasBeenVisible ? 'fadeAnimasiUp' : ''}`} style={{ animationDelay: `${index / 3}s` }} href='/landing'>
                        <div className='content-card'>
                            <div className='d-flex flex-column p-2'>
                                <span className='title-card'>
                                    {item.title}
                                </span>
                                <span className='subtitle-card'>
                                    {item.jumlah} Destinasi Wisata
                                </span>
                            </div>
                        </div>
                        <img src={item.img} alt='not found' />
                    </a>
                )
            })}
            </div>
        </div>
    );
}

export default ContentDesaWisata;
