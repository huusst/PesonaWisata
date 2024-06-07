import React, { useState } from 'react';

function HeaderDetail({ Detailwisata, kategori, menuData }) {
    const [activeTab, setActiveTab] = useState(kategori[0].id_kategori);

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
                    {Detailwisata.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='d-flex flex-row'>
                                    <span className='mx-1 text-bold text-size-14'>Menu {item.nama}</span>
                                </div>

                                <div className="w3-bar w3-black d-flex">
                                    {/* {kategori.map((item, index) => {
                                        return (
                                            <button className={`w3-bar-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => openCity(item.id)}>{item.nama_kategori_menu}</button>
                                        )
                                    })} */}
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

                                            {getDataByCategory(item.id_kategori).map((data, index) => (
                                                <div className="container" key={index}>
                                                    <div className="card">
                                                        <img className="card__image" src={data.img} alt={data.name} />
                                                        <div className="card__data">
                                                            <div className="card__info">
                                                                <h2>{data.name}</h2>
                                                            </div>
                                                            <h3 className="card__price">${data.price.toFixed(2)}</h3>
                                                            <button className="card__add">
                                                                <i className="fa-solid fa-cart-shopping"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    )
                                })}


                                {/* 
                                <div className="w3-container city" style={{ display: activeTab === 2 ? 'flex' : 'none' }}>

                                    <div class="container">
                                        <div class="card">
                                            <img class="card__image" src={img5} />
                                            <div class="card__data">
                                                <div class="card__info">
                                                    <h2>Nombre Comida</h2>
                                                </div>
                                                <h3 class="card__price">$7.50</h3>
                                                <button class="card__add"><i className="fa-solid fa-cart-shopping"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="card">
                                            <img class="card__image" src={img6} />
                                            <div class="card__data">
                                                <div class="card__info">
                                                    <h2>Nombre Comida</h2>
                                                </div>
                                                <h3 class="card__price">$7.50</h3>
                                                <button class="card__add"><i className="fa-solid fa-cart-shopping"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="card">
                                            <img class="card__image" src={img7} />
                                            <div class="card__data">
                                                <div class="card__info">
                                                    <h2>Nombre Comida</h2>
                                                </div>
                                                <h3 class="card__price">$7.50</h3>
                                                <button class="card__add"><i className="fa-solid fa-cart-shopping"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="card">
                                            <img class="card__image" src={img8} />
                                            <div class="card__data">
                                                <div class="card__info">
                                                    <h2>Nombre Comida</h2>
                                                </div>
                                                <h3 class="card__price">$7.50</h3>
                                                <button class="card__add"><i className="fa-solid fa-cart-shopping"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w3-container city" style={{ display: activeTab === 3 ? 'flex' : 'none' }}>

                                    <div class="container">
                                        <div class="card">
                                            <img class="card__image" src={img9} />
                                            <div class="card__data">
                                                <div class="card__info">
                                                    <h2>Nombre Comida</h2>
                                                </div>
                                                <h3 class="card__price">Rp8,000</h3>
                                                <button class="card__add"><i className="fa-solid fa-cart-shopping"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container">
                                        <div class="card">
                                            <img class="card__image" src={img10} />
                                            <div class="card__data">
                                                <div class="card__info">
                                                    <h2>Nombre Comida</h2>
                                                </div>
                                                <h3 class="card__price">Rp8,000</h3>
                                                <button class="card__add"><i className="fa-solid fa-cart-shopping"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container">
                                        <div class="card">
                                            <img class="card__image" src={img11} />
                                            <div class="card__data">
                                                <div class="card__info">
                                                    <h2>Nombre Comida</h2>
                                                </div>
                                                <h3 class="card__price">Rp8,000</h3>
                                                <button class="card__add"><i className="fa-solid fa-cart-shopping"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container">
                                        <div class="card">
                                            <img class="card__image" src={img12} />
                                            <div class="card__data">
                                                <div class="card__info">
                                                    <h2>Nombre Comida</h2>
                                                </div>
                                                <h3 class="card__price">Rp8,000</h3>
                                                <button class="card__add"><i className="fa-solid fa-cart-shopping"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                </div> */}

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default HeaderDetail;
