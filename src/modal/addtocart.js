
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/styles.css';
import not_found_image from './../Pages/assets/img/image_notfound.png'

function AddtoCart({ isOpen, isClose, closeModal, nama, img, harga, id}) {
    const [jumlah, setJumlah] = useState(1);

    const add = (e) => {
        setJumlah(jumlah + 1);
    }

    const min = (e) => {
        if (jumlah > 1) {
            setJumlah(jumlah - 1);
        }
    }

    useEffect(() => {
        setJumlah(1);
    }, [closeModal])

    return (

        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className={`modal-content ${isClose ? 'animasiDown' : 'animasiUp'}`}>
                <div className='cover-close'>
                    <span className='text-bold text-size-14'>Add to Cart</span>
                    <span className="close" onClick={closeModal}>&times;</span>
                </div>
                <form className='form py-1'>
                    <div className='item-menu'>
                        <div className="cover-img">
                            <img className='rounded-10' src={img} alt={`Slide`} style={{ width: '100%', height: '50%' }} />
                        </div>
                        <div className='text-item-menu'>
                        <a className='text-bold text-black text-size-14'>{nama}</a>
                        <a className='text-black text-size-14'>{Number(harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</a>
                        </div>
                    </div>
                    <div className='jumlah_add'>
                        <span onClick={add}><i className="fa-solid fa-plus"></i></span>
                        <input className='w-10 border-none align-item-center' value={jumlah} onChange={(e) => setJumlah(e.target.value)}></input>
                        <span onClick={min}><i className="fa-solid fa-minus"></i></span>
                    </div>
                    <button className='button-form' type="submit">Tambah Keranjang
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddtoCart;
