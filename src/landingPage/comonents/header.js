import { React, useState, useEffect } from 'react';
import DesaIcon from "./../assets/img/DesaIcon.png"
import KulinerIcon from "./../assets/img/KulinerIcon.png"
import PenginapanIcon from "./../assets/img/PenginapanIcon.png"
import SewaIcon from "./../assets/img/SewaIcon.png"
import EventIcon from "./../assets/img/EventIcon.png"

function Header() {
    const menu = [
        {
            "title": "Desa Wisata",
            "img": DesaIcon,
            "href": "/desawisata"
        },
        {
            "title": "Kuliner",
            "img": KulinerIcon,
            "href": "/kuliner"
        },
        {
            "title": "Penginapan",
            "img": PenginapanIcon,
            "href": "/penginapan"
        },
        // {
        //     "title": "Events",
        //     "img": EventIcon,
        //     "href": "/coming_soon"
        // }
    ];

    const [budget, setBudget] = useState();
    const [jumlah, setJumlah] = useState(1);

    const add = () => {
        setJumlah(jumlah + 1);
    }

    const min = () => {
        if (jumlah > 1) {
            setJumlah(jumlah - 1);
        }
    }

    const result = () => {
        console.log("Budget ", budget);
        console.log("Jumlah ", jumlah);
    }

    useEffect(() => {
        result();
    }, [jumlah, budget]);

    return (
        <div className="Leanding-header">
            <div className="top-header">
            </div>
            <div className='content-header'>
                <div className='d-flex flex-row justify-content-beetwen w-50 py-2 px-5'>
                    {menu.map((item, index) => {
                        return (
                            <a className='menu-header text-white' href={item.href} key={index}>
                                <div className='d-flex flex-column align-item-center'>
                                    <div>
                                        <img src={item.img} alt='not found'/>
                                    </div>
                                    <span>{item.title}</span>
                                </div>
                            </a>
                        )
                    })}
                </div>
                <div className='text-content'>
                    <span className='title'>Temukan paket wisata dengan bugdet yang Anda miliki</span>
                    <span className='subtitle'>Liburan dengan kami bersahabat dengan kantong Anda</span>
                </div>
                <div className='form-header w-100 py-5'>
                    <input className='w-50 p-3 rounded-15 border-none text-size-14' type='number' placeholder='Berapa budget kamu?' value={budget}
                        onChange={(e) => setBudget(e.target.value)}></input>
                    <div className='py-1 rounded-15 border-none mx-2 bg-white'>
                        <div className='d-flex flex-row align-item-center'>
                            <span className='text-secondary px-left-1'>{jumlah} Orang</span>
                            <div className='d-flex flex-column mx-3'>
                                <button className='button-plus text-secondary' onClick={add} onChange={result}><i className="fa fa-angle-up"></i></button>
                                <button className='button-min text-secondary' onClick={min}><i className="fa fa-angle-down"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-header">
            </div>
        </div>
    );
}

export default Header;
