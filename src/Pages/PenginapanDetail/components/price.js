import React, { useState, useEffect } from 'react';
import DesaIcon from "./../../assets/img/DesaIcon_blue.png"

function HeaderDetail({ Detailwisata }) {
    const namaDesa = Detailwisata[0].nama;
    const alamatDesa = Detailwisata[0].alamat;
    const kelas = Detailwisata[0].kelas;
    const harga = Detailwisata[0].harga_terendah;
    const kategori = Detailwisata[0].kategori;

    const handleScrollToKamar = () => {
        const element = document.getElementById('kamar');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const StarRating = ({ count }) => {
        return (
            <div>
                {Array.from({ length: count }, (_, index) => (
                    <i className="fa-solid fa-star text-warning" key={index}></i>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="cover">
                <div className='d-flex flex-row justify-content-beetwen'>
                    <div className='my-top-2'>
                        <span className='text-size-20 text-bold text-black'>{namaDesa}</span>
                        <div className='d-flex flex-row align-item-center py-2'>
                            <span className={`budge-default px-2`}>{kategori}</span>
                            <StarRating count={kelas}/>
                        </div>
                        <div className='d-flex flex-row align-item-center py-2'>
                            <img width={14} height={16} src={DesaIcon} alt='not found' />
                            <span className='mx-1 text-size-10 text-black'>{alamatDesa}</span>
                        </div>
                    </div>
                    {kategori === "Hotel" ? (
                    <div className='d-flex flex-column my-3'>
                        <span className='text-secondary text-size-10'>Harga/Kamar/Malam Mulai dari</span>
                        <span className='text-default text-size-18 text-bold my-2'>{Number(harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                        <button className='button-price' onClick={handleScrollToKamar}>Pilih Kamar</button>
                    </div>
                    ):(
                    <div className='d-flex flex-column my-3'>
                        <span className='text-secondary text-size-10'>Harga Paket Mulai dari</span>
                        <span className='text-default text-size-18 text-bold my-2'>{Number(harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                        <button className='button-price' onClick={handleScrollToKamar}>Pilih Paket</button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderDetail;
