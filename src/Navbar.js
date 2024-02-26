import React, { useState, useEffect } from 'react';
import './index.css'; // Impor file CSS untuk styling navbar

function Navbar() {
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

    return (
        <nav className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            {/* Tambahkan elemen-elemen navbar di sini */}
            <span className={isScrolled ? 'title-website text-black' : 'title-website text-white'} href="#home">PesonaMadiun</span>
            <ul>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="/landing">Dashboard</a></li>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="/">Tentang Kami</a></li>
                <li><a className={isScrolled ? 'nav-items scrolled' : 'nav-items'} href="#services">Bantuan</a></li>
                <li>
                    <a className={isScrolled ? 'button-masuk rounded-10 text-black scrolled' : 'button-masuk rounded-10'} href="#services">Masuk</a> 
                    <a className={isScrolled ? 'button-daftar rounded-10 mx-1' : 'button-daftar rounded-10 mx-1'} href="#services">Daftar</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
