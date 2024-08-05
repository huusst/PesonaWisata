import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/js/not_found.json'
import AddtoCart from '../../../modal/addtocart';

function HeaderDetail({ 
    Detailkuliner, 
    kategori, 
    menuData, 
    id_destinasi,
    showAlert,
    messageAlert,
    nameAlert,
    statusLogin,
    openModal,
    openModalInfo
}) {
    const [activeTab, setActiveTab] = useState(kategori[0].id_kategori);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    const [id_detail, setId] = useState();
    const [img_detail, setImg] = useState();
    const [harga_detail, setHarga] = useState();
    const [nama_detail, setNama] = useState();


    const handleOpenModal = (id, harga, nama, img) => {
        setId(id);
        setHarga(harga);
        setImg(img);
        setNama(nama);
        setOpen(true);
        setClose(false);
    };

    const handleCloseModal = () => {
        setClose(true);
        setTimeout(() => {
            setOpen(false);
        }, 180);
    };

    const openCity = (id_kategori) => {
        setActiveTab(id_kategori);
    };

    const getDataByCategory = (id_kategori) => {
        return menuData.filter(item => item.id_kategori === id_kategori);
    };

    return (
        <div>
            <div className="cover">
                <div>
                    {Detailkuliner.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='d-flex flex-row'>
                                    <span className='mx-1 text-bold text-size-14'>Menu {item.nama}</span>
                                </div>

                                <div className="w3-bar w3-black d-flex">
                                    {kategori.map((item) => (
                                        <button
                                            key={item.id_kategori}
                                            className={`w3-bar-item ${activeTab === item.id_kategori ? 'active' : ''}`}
                                            onClick={() => openCity(item.id_kategori)}
                                        >
                                            {item.nama_kategori_menu}
                                        </button>
                                    ))}
                                </div>


                                {kategori.map((item, index) => {
                                    return (
                                        <div
                                            key={item.id_kategori}
                                            className="w3-container city"
                                            style={{ display: activeTab === item.id_kategori ? 'flex' : 'none', flexWrap: 'wrap' }}
                                        >
                                            {getDataByCategory(item.id_kategori).length === 0 ? (
                                                <div className='w-100 d-flex py-5 flex-column align-item-center'>
                                                    <div className='d-flex' style={{ height: 200, width: 200 }}>
                                                        <Lottie
                                                            animationData={animationData}
                                                            loop={true}
                                                            autoplay={true}
                                                        />
                                                    </div>
                                                    <p className='text-default text-size-14 text-bold'>Menu belum tersedia</p>
                                                </div>
                                            ) : (
                                                <>
                                                    {getDataByCategory(item.id_kategori).map((data, index) => (
                                                        <div className="container" key={index}>
                                                            <div className="card">
                                                                <img className="card__image" src={data.img} alt={data.name} />
                                                                <div className="card__data">
                                                                    <div className="card__info px-2">
                                                                        <div className='d-flex flex-column mx-2'>
                                                                            <span className="text-bold text-size-10">{data.nama}</span>
                                                                            <span className="text-size-10">{Number(data.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                                                        </div>
                                                                    </div>
                                                                    <button className="card__add" onClick={() => handleOpenModal(data.id, data.harga, data.nama, data.img)}>
                                                                        <i className="fa-solid fa-cart-shopping"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>

            {id_detail && nama_detail && harga_detail && img_detail ? (
                <AddtoCart 
                existPesanan={true} 
                id_destinasi={id_destinasi} 
                id_menu={id_detail} 
                isOpen={open} 
                isClose={close} 
                closeModal={handleCloseModal} 
                nama={nama_detail} 
                img={img_detail} 
                harga={harga_detail}
                showAlert={showAlert}
                messageAlert={messageAlert}
                nameAlert={nameAlert}
                statusLogin={statusLogin}
                openModal={openModal}
                openModalInfo={openModalInfo}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default HeaderDetail;
