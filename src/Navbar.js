import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import logo from "./landingPage/assets/img/logo192.png"

function Navbar({ openModal, openModalRegister, statusLogin, setStatusLogin }) {
    // State untuk menentukan apakah navbar sedang discroll atau tidak
    const [isScrolled, setIsScrolled] = useState(false);

    // Mengubah state isScrolled saat discroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // const Logout = async () => {
    //     try {
    //       const data = await axios.post(`http://localhost:3001/api/wisatawan/logout`)
    //       if (data) {
    //         setStatusLogin(false);
    //         // window.location.reload();
    //       }
    //     } catch (error) {
    //     //   if (error.response.status === 401) {
    //           console.log(error);
    //     //   }
    //     }
    //   }

    return (
        <nav className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            {/* Tambahkan elemen-elemen navbar di sini */}
            <span className={isScrolled ? 'title-website text-black' : 'title-website text-white'} href="#home">PesonaMadiun</span>
            <ul>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="/">Dashboard</a></li>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="/#">Tentang Kami</a></li>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="#">Bantuan</a></li>
                {!statusLogin ? (
                <li>
                    <a className={isScrolled ? 'button-masuk rounded-10 text-black scrolled' : 'button-masuk rounded-10'} onClick={openModal}>Masuk</a>
                    <a className={isScrolled ? 'button-daftar rounded-10 mx-3' : 'button-daftar rounded-10 mx-3'} onClick={openModalRegister}>Daftar</a>
                </li>
                ) : (
                <div class="dropdown">
                    <a class={`${isScrolled ? 'text-dark' : 'text-white'} dropdown-toggle`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img
                            src={logo}
                            class="rounded-circle"
                            height="30"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                        />
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#"><i className="fa-solid fa-user"></i> <span className='mx-2'>Profile</span></a></li>
                        <li><a className="dropdown-item" href="#"><i className="fa-solid fa-cart-shopping"></i> <span className='mx-2'>Pesanan Saya</span></a></li>
                        {/* <li><a className="dropdown-item" onClick={Logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> <span className='mx-2'>Logout</span></a></li> */}
                    </ul>
                </div>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
