import React, { useState, useEffect } from 'react';
import unsLogo from "./landingPage/assets/img/unsLogo.png"
import svLogo from "./landingPage/assets/img/svLogo.png"
import lppmLogo from "./landingPage/assets/img/lppmLogo.png"
import d3tiunsLogo from "./landingPage/assets/img/d3tiunsLogo.png"
import kabmadiunLogo from "./landingPage/assets/img/kabmadiunLogo.png"
import wonderfulLogo from "./landingPage/assets/img/wonderfulLogo.png"
import kedairekaLogo from "./landingPage/assets/img/kedairekaLogo.png"

const Footer = () => {

    const DataPatner = [
        { "id": 1, "imageUrl": unsLogo },
        { "id": 2, "imageUrl": svLogo },
        { "id": 3, "imageUrl": lppmLogo },
        { "id": 4, "imageUrl": d3tiunsLogo },
        { "id": 5, "imageUrl": kabmadiunLogo },
        { "id": 6, "imageUrl": wonderfulLogo },
        { "id": 7, "imageUrl": kedairekaLogo },
    ];

    const [hasBeenVisible, setHasBeenVisible] = useState(false);

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

    return (
        <div className='footers justify-content-beetwen'>
            <span className={'title-website text-white'} href="#home">PesonaMadiun</span>
            <div className='content-footer d-flex flex-column'>
                <span className={'subtitle text-white'} href="#home">Patner Kami</span>
                <div className='py-1'>
                    <img src={unsLogo} alt='foto kosong' className='p-1 bg-white rounded-15 mx-right-1 my-bottom-1' height={50}/>
                    <img src={svLogo} alt='foto kosong' className='p-1 bg-white rounded-15 mx-right-1 my-bottom-1' height={50}/>
                    <img src={lppmLogo} alt='foto kosong' className='p-1 bg-white rounded-15 mx-right-1 my-bottom-1' height={50}/>
                    <img src={d3tiunsLogo} alt='foto kosong' className='p-1 bg-white rounded-15 mx-right-1 my-bottom-1' height={50}/>
                    <img src={kabmadiunLogo} alt='foto kosong' className='p-1 bg-white rounded-15 mx-right-1 my-bottom-1' height={50}/>
                    <img src={wonderfulLogo} alt='foto kosong' className='p-1 bg-white rounded-15 mx-right-1 my-bottom-1' height={50}/>
                    <img src={kedairekaLogo} alt='foto kosong' className='p-1 bg-white rounded-15 mx-right-1 my-bottom-1' height={50}/>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <span className={'subtitle text-white'} href="#home">Kontak</span>
                <a className={'text-size-12 text-white py-1'} href="#home">gowisata.kabmadiun@gmail.com</a>
                <div className='d-flex flex-row'>
                        <a><i className="fa-brands fa-x-twitter text-white"></i></a>
                        <a><i className="fa-brands fa-facebook text-white px-1"></i></a>
                        <a><i className="fa-brands fa-instagram text-white"></i></a>
                        <a><i className="fa-brands fa-youtube text-white px-1"></i></a>
                        <a><i className="fa-brands fa-tiktok text-white"></i></a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
