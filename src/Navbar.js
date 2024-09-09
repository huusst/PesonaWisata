import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar({ openModal, openModalRegister, statusLogin, setStatusLogin, name, profile }) {
    const navigate = useNavigate();
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
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/logout?keyword=wisatawan`)
            if (data) {
                setStatusLogin(false);
                window.location.reload();
            }
        } catch (error) {
            //   if (error.response.status === 401) {
            console.log(error);
            //   }
        }
    }

    const Navigate = (href) => {
        navigate(`${href}`);
    };

    return (
        <nav className={isScrolled ? 'navbars scrolled' : 'navbars'}>
            {/* Tambahkan elemen-elemen navbar di sini */}
            <span className={isScrolled ? 'title-website text-black' : 'title-website text-white'} onClick={() => Navigate('/')}>GoMadiun</span>
            <ul>
                {/* <li><span className={isScrolled ? 'nav-items scrolled' : 'nav-items'} onClick={() => Navigate('/')}>Dashboard</span></li> */}
                {/* <li><span className={isScrolled ? 'nav-items scrolled' : 'nav-items'} onClick={() => Navigate('/coming_soon')}>Tentang Kami</span></li>
                <li><span className={isScrolled ? 'nav-items scrolled' : 'nav-items'} onClick={() => Navigate('/coming_soon')}>Bantuan</span></li> */}
                {statusLogin === "belum_login" && (
                    <li>
                        <span className={isScrolled ? 'button-masuk rounded-10 text-black scrolled' : 'button-masuk rounded-10'} onClick={openModal}>Masuk</span>
                        <span className={isScrolled ? 'button-daftar rounded-10 mx-3' : 'button-daftar rounded-10 mx-3'} onClick={openModalRegister}>Daftar</span>
                    </li>
                )}
                {statusLogin === "login" && (
                    <>
                        <li><span className={isScrolled ? 'nav-items scrolled' : 'nav-items'} onClick={() => Navigate('/keranjang')}><i className="fa-solid fa-cart-shopping mx-1"/> keranjang</span></li>

                        <div className="dropdown">
                            <span className={`${isScrolled ? 'text-dark' : 'text-white'} dropdown-toggle`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_API_URL}/uploads/img/profile/${profile}`}
                                    className="rounded-circle"
                                    height="30"
                                    alt="noprofile"
                                    loading="lazy"
                                />
                                <span className='mx-1'></span>
                                <span className='mx-2'>{name}</span>
                            </span>
                            <ul className="mt-3 dropdown-menu px-3" aria-labelledby="dropdownMenuButton1">
                                <span className="dropdown-item my-top-1" onClick={() => Navigate('/setting')}><i className="fa-solid fa-user mx-right-1"></i> <span>Profile</span></span>
                                <span className="dropdown-item my-3" onClick={() => Navigate('/pesananku')}><i className="fa-solid fa-cart-shopping mx-right-1"></i> <span>Pesanan Saya</span></span>
                                <span className="dropdown-item my-bottom-1" onClick={Logout}><i className="fa-solid fa-arrow-right-from-bracket mx-right-1"></i> <span>Logout</span></span>
                            </ul>
                        </div>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
