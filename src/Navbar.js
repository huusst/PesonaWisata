import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';

function Navbar({ openModal, openModalRegister, statusLogin, setStatusLogin, name, profile }) {
    // State untuk menentukan apakah navbar sedang discroll atau tidak
    const [isScrolled, setIsScrolled] = useState(false);

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

    const Logout = async () => {
        try {
            const data = await axios.post(`http://localhost:3001/api/wisatawan/logout`)
            if (data) {
                setStatusLogin(false);
                // window.location.reload();
            }
        } catch (error) {
            //   if (error.response.status === 401) {
            console.log(error);
            //   }
        }
    }

    return (
        <nav className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            {/* Tambahkan elemen-elemen navbar di sini */}
            <span className={isScrolled ? 'title-website text-black' : 'title-website text-white'} href="#home">PesonaMadiun</span>
            <ul>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="/">Dashboard</a></li>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="/coming_soon">Tentang Kami</a></li>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="/coming_soon">Bantuan</a></li>
                {statusLogin === "belum_login" && (
                    <li>
                        <a className={isScrolled ? 'button-masuk rounded-10 text-black scrolled' : 'button-masuk rounded-10'} onClick={openModal}>Masuk</a>
                        <a className={isScrolled ? 'button-daftar rounded-10 mx-3' : 'button-daftar rounded-10 mx-3'} onClick={openModalRegister}>Daftar</a>
                    </li>
                )}
                {statusLogin === "login" && (
                    <>
                        <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="/keranjang"><i className="fa-solid fa-cart-shopping"></i></a></li>

                        <div className="dropdown">
                            <a className={`${isScrolled ? 'text-dark' : 'text-white'} dropdown-toggle`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img
                                    src={`http://localhost:3001/uploads/img/profile/${profile}`}
                                    className="rounded-circle"
                                    height="30"
                                    alt="noprofile"
                                    loading="lazy"
                                />
                                <span className='mx-1'></span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#"><i className="fa-solid fa-user"></i> <span className='mx-2'>Profile</span></a></li>
                                <li><a className="dropdown-item" href="#"><i className="fa-solid fa-cart-shopping"></i> <span className='mx-2'>Pesanan Saya</span></a></li>
                                <li><a className="dropdown-item" onClick={Logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> <span className='mx-2'>Logout</span></a></li>
                            </ul>
                        </div>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
