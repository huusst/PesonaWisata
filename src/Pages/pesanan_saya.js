import { React, useState, useCallback, useEffect } from 'react';
import unsLogo from "./../landingPage/assets/img/unsLogo.png"
import svLogo from "./../landingPage/assets/img/svLogo.png"
import lppmLogo from "./../landingPage/assets/img/lppmLogo.png"
import d3tiunsLogo from "./../landingPage/assets/img/d3tiunsLogo.png"
import kabmadiunLogo from "./../landingPage/assets/img/kabmadiunLogo.png"
import wonderfulLogo from "./../landingPage/assets/img/wonderfulLogo.png"
import kedairekaLogo from "./../landingPage/assets/img/kedairekaLogo.png"
import Lottie from 'lottie-react';
import not_found from './assets/js/not_found.json';
import axios from 'axios';
import loadingAnimation from './assets/js/loading.json';
// import Countdown from './countdown';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import QRCode from 'qrcode.react';
import useSnap from './hooks/useSnap';

function PesananKuPage({
    showAlert,
    messageAlert,
    nameAlert
}) {
    moment.locale('id');
    const [activeTab, setActiveTab] = useState(1);
    const [DataPesanan, setDataPesanan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [OpenSnap, setOpenSnap] = useState("");
    const [OpenDetail, setOpenDetail] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { snapEmbed } = useSnap();

    const getData = useCallback(async () => {
        setDataPesanan([])
        setLoading(true);
        try {
            let response
            if (activeTab === 1) {
                response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pesanan/belum_bayar`)
            } else if (activeTab === 2) {
                response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pesanan/eticket`)
            } else if (activeTab === 3) {
                response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pesanan/selesai`)
            } else if (activeTab === 4) {
                response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pesanan/dibatalkan`)
            }
            if (response) {
                setMessage("data ada")
                setDataPesanan(response.data.data)
                console.log(response.data.data)
                setLoading(false);
            }
        } catch (error) {
            if (error.response.status === 401) {
                setLoading(false);
                navigate('/');
            }
            else if (error.response.status === 422) {
                setMessage(error.response.data.message)
                setLoading(false);
            } else {
                console.log(error.response)
            }
        }
    }, [activeTab, navigate])

    useEffect(() => {
        getData();
    }, [getData]);


    // const BatalkanPesanan = async (id) => {
    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/pesanan/${id}`);

    //         if (response) {
    //             messageAlert(response.data.message);
    //             nameAlert('Success')
    //             showAlert();
    //             setTimeout(() => {
    //                 window.location.reload()
    //             }, 1000);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const BayarPesanan = async (id) => {
        setOpenSnap(id);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pesanan/bayar/${id}`);

            if (response) {

                snapEmbed(response.data.data.data_pembayaran_snap_token, `snap-container-${response.data.data.id_pembayaran}`, {
                    onSuccess: function (result) {
                        setOpenSnap('')
                        removeQueryParameters();
                        Navigate(`/pesananku`);
                        openMenu(2);
                    },
                    onPending: function (result) {
                        setOpenSnap('')
                        removeQueryParameters();
                        Navigate(`/pesananku`);
                    },
                    onClose: function () {
                        setOpenSnap('')
                        removeQueryParameters();
                        Navigate(`/pesananku`);
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const removeQueryParameters = () => {
        const url = new URL(window.location);
        url.search = ''; 
        window.history.replaceState({}, document.title, url.pathname);
    };

    const openMenu = (id) => {
        setActiveTab(id)
        setOpenSnap('')
    };

    const ToggleOpenDetail = (id) => {
        if (OpenDetail === id) {
            setOpenDetail('')
        } else {
            setOpenDetail(id)
        }
    };

    const formatDate = (dateString) => {
        return moment(dateString).format('YYYY-MM-DD HH:mm a');
    };

    const formatDateString = (dateString) => {
        return moment(dateString).format('DD MMMM YYYY HH:mm a');
    };

    const formatDateStringDay = (dateString) => {
        return moment(dateString).format('dddd, DD MMMM YYYY');
    };

    const formatTime = (dateString) => {
        return moment(dateString).format('hh:mm A');
    };
    const Navigate = (href) => {
        navigate(`${href}`);
    };



    return (
        <section>
            <div className='desawisata-header'></div>
            <h2 className="text-center my-top-3">Pesanan Saya</h2>
            <div className="pesanan-container">
                <div className="menu-pesanan">
                    <ul>
                        <li><span className={`menu-pesanan-items ${activeTab === 1 ? 'active' : ''}`} onClick={() => openMenu(1)}>Balum Bayar</span></li>
                        <li><span className={`menu-pesanan-items ${activeTab === 2 ? 'active' : ''}`} onClick={() => openMenu(2)}>E-Tiket</span></li>
                        <li><span className={`menu-pesanan-items ${activeTab === 3 ? 'active' : ''}`} onClick={() => openMenu(3)}>Selesai</span></li>
                        <li><span className={`menu-pesanan-items ${activeTab === 4 ? 'active' : ''}`} onClick={() => openMenu(4)}>Dibatalkan</span></li>
                    </ul>
                </div>
                <div style={{ display: activeTab === 1 ? 'flex' : 'none', flexWrap: 'wrap' }}>
                    {loading ? (
                        <div className='w-100 d-flex py-5 flex-column align-item-center my-top-5'>
                            <div className='d-flex' style={{ height: 196, width: 200 }}>
                                <Lottie
                                    animationData={loadingAnimation}
                                    loop={true}
                                    autoplay={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {DataPesanan.length === 0 ? (
                                <div className='w-100 d-flex py-5 flex-column align-item-center my-top-2'>
                                    <div className='d-flex' style={{ height: 200, width: 200 }}>
                                        <Lottie
                                            animationData={not_found}
                                            loop={true}
                                            autoplay={true}
                                        />
                                    </div>
                                    <p className='text-default text-size-14 text-bold'>{message}</p>
                                </div>
                            ) : (
                                <div className='container-pesanan justify-content-end'>
                                    {DataPesanan.map((pembayaran, index) => {
                                        return (
                                            <div className='card-pesanan belum_bayar' key={index}>
                                                <div className='d-flex flex-column justify-content-beetwen w-100'>
                                                    {/* <div className='d-flex flex-row justify-content-end my-top-1'>
                                                        {activeTab === 1 && (
                                                            <div className='d-flex flex-column align-pembayaran-end'>
                                                                <span className='text-size-10 text-secondary'>Batas pembayaran:</span>
                                                                <Countdown targetDate={pembayaran.batas_pembayaran} id_pembayaran={pembayaran.id_pembayaran} />
                                                            </div>
                                                        )}
                                                    </div> */}


                                                    {pembayaran.pesanan.map((item, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <div className='d-flex flex-column'>
                                                                    <div className='d-flex flex-column'>
                                                                        <span className='text-size-14 text-bold py-2'>{item.nama_destinasi}</span>
                                                                    </div>
                                                                    {item.detail_pesanan.map((item, index) => {
                                                                        return (
                                                                            <div className='d-flex flex-row under-line my-top-1 py-bottom-1 ' key={index}>
                                                                                <div className='cover-img-menu'>
                                                                                    <img src={item.sampul_menu} alt='foto kosong' />
                                                                                </div>
                                                                                <div className='d-flex flex-column mx-left-1 w-100'>
                                                                                    <span className='text-size-12 text-secondary text-bold'>{item.nama_menu}</span>
                                                                                    <div className='d-flex flex-column align-item-end'>
                                                                                        <span className='text-size-10 text-secondary'>x {item.jumlah}</span>
                                                                                        <span className='text-size-10 text-secondary'>{Number(item.harga_satuan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                    <div className='d-flex flex-column under-line px-2'>
                                                                        <div className='d-flex justify-content-beetwen'>
                                                                            <span className='text-size-10 text-secondary py-2'>{item.detail_pesanan.length} Menu</span>
                                                                            <span className='text-size-10 text-secondary py-2'>Total pesanan: <span className='text-default'>{Number(item.total_pesanan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                    {OpenSnap !== pembayaran.id_pembayaran && (
                                                        <div className='d-flex flex-column'>
                                                            <div className='d-flex flex-row justify-content-end'>
                                                                <div className='d-flex flex-column align-item-end my-3'>
                                                                    <span className='text-size-10 text-secondary'>Total Pembayaran</span>
                                                                    <span className='text-size-14 text-bold'>{Number(pembayaran.total_pembayaran).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                                                    {/* <span className='text-size-10 text-secondary'>+ Biaya Admin <span className='text-default'>{Number(5000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span></span> */}
                                                                </div>
                                                            </div>
                                                            <div className='d-flex my-bottom-1'>
                                                                {/* <button className='button-form bg-danger mx-right-1' onClick={() => BatalkanPesanan(pembayaran.id_pembayaran)}>Batalkan
                                                                </button> */}
                                                                <button className='button-form mx-left-1' onClick={() => BayarPesanan(pembayaran.id_pembayaran)}>Bayar Sekarang
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {OpenSnap === pembayaran.id_pembayaran && (
                                                    <div className=' my-4 mx-left-1' id={`snap-container-${pembayaran.id_pembayaran}`}></div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div style={{ display: activeTab === 2 ? 'flex' : 'none', flexWrap: 'wrap' }}>
                    {loading ? (
                        <div className='w-100 d-flex py-5 flex-column align-item-center my-top-5'>
                            <div className='d-flex' style={{ height: 196, width: 200 }}>
                                <Lottie
                                    animationData={loadingAnimation}
                                    loop={true}
                                    autoplay={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {DataPesanan.length === 0 ? (
                                <div className='w-100 d-flex py-5 flex-column align-item-center my-top-2'>
                                    <div className='d-flex' style={{ height: 200, width: 200 }}>
                                        <Lottie
                                            animationData={not_found}
                                            loop={true}
                                            autoplay={true}
                                        />
                                    </div>
                                    <p className='text-default text-size-14 text-bold'>{message}</p>
                                </div>
                            ) : (
                                <div className='container-pesanan justify-content-end'>
                                    {DataPesanan.map((pembayaran, index) => {
                                        return (
                                            <div key={index}>
                                                {pembayaran.pesanan.map((item, index) => {
                                                    return (
                                                        <div className='card-pesanan' key={index}>
                                                            <div className='d-flex flex-column'>

                                                                <div className='d-flex flex-column under-line py-3'>

                                                                    <div className="e-ticket">
                                                                        <div className="e-ticket--start">
                                                                            <div className="e-ticket--start--col px-4">
                                                                                <div className="e-ticket--start--row">
                                                                                    <div className="e-ticket--start--col">
                                                                                        <span>e-ticket</span>
                                                                                        <strong>{item.nama_destinasi}</strong>
                                                                                    </div>
                                                                                </div>
                                                                                <span className="text-size-9 text-secondary my-1">Kode pemesanan: {item.kode_pesanan}</span>
                                                                            </div>
                                                                            <div className="e-ticket--center--row px-4 my-top-1">
                                                                                <div className="e-ticket--center--col">
                                                                                    <span className="e-ticket--info--title">Berlaku sampai</span>
                                                                                    <span className="e-ticket--info--subtitle">{formatDateStringDay(item.tgl_booking)}</span>
                                                                                    <span className="e-ticket--info--content">{formatTime(item.tgl_booking)}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="e-ticket--center">
                                                                            <div className="e-ticket--center--row">
                                                                                <div className="e-ticket--center--col">
                                                                                    <span className="e-ticket--info--title">Pemesan</span>
                                                                                    <span className="e-ticket--info--content">{pembayaran.wisatawan_detail_as.nama_lengkap}</span>
                                                                                </div>
                                                                                <div className="e-ticket--center--col">
                                                                                    <span className="e-ticket--info--title">Telp. pemesan</span>
                                                                                    <span className="e-ticket--info--content">{pembayaran.wisatawan_detail_as.no_hp}</span>
                                                                                </div>
                                                                                <div className="e-ticket--center--col">
                                                                                    <span className="e-ticket--info--title">Kategori e-ticket</span>
                                                                                    {item.jenis_destinasi === "tbl_destinasi" && (
                                                                                        <span className="e-ticket--info--content">Wisata</span>
                                                                                    )}
                                                                                    {item.jenis_destinasi === "tbl_kuliner" && (
                                                                                        <span className="e-ticket--info--content">Kuliner</span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className='d-flex flex-column my-top-3'>
                                                                                <div className="d-flex justify-content-beetwen my-bottom-1">
                                                                                    <img src={unsLogo} alt='foto kosong' className='mx-right-1 ' height={30} />
                                                                                    <img src={svLogo} alt='foto kosong' className='mx-right-1' height={30} />
                                                                                    <img src={lppmLogo} alt='foto kosong' className='mx-right-1' height={30} />
                                                                                    <img src={d3tiunsLogo} alt='foto kosong' className='mx-right-1' height={30} />
                                                                                    <img src={kabmadiunLogo} alt='foto kosong' className='mx-right-1' height={30} />
                                                                                    <img src={wonderfulLogo} alt='foto kosong' className='mx-right-1' height={30} />
                                                                                    <img src={kedairekaLogo} alt='foto kosong' className='mx-right-1' height={30} />
                                                                                </div>
                                                                                <span className='text-size-9 text-secondary'>Kerjasama Dinas Pariwisata Pemuda dan Olahraga dengan D3 Teknik Informatika PSDKU UNS Madiun</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="e-ticket--end">
                                                                            <div className='cover-qr'>
                                                                                <QRCode value={item.kode_qr} />
                                                                                <div className='d-flex flex-column align-item-center my-top-1'>
                                                                                    {/* <span className='e-ticket--info--content px-2'>{item.kode_qr}</span> */}
                                                                                    <span className='e-ticket--info--content px-2'>Dipesan: {formatDateString(item.tgl_pesanan)}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='d-flex flex-column under-line px-2 my-bottom-1' onClick={() => ToggleOpenDetail(item.id_pesanan)}>
                                                                    <div className='d-flex justify-content-beetwen align-item-center'>
                                                                        <span className='text-size-10 text-secondary py-2'>Lihat detail</span>
                                                                        {OpenDetail === item.id_pesanan ? (
                                                                            <i className="fa-solid fa-caret-down"></i>
                                                                        ) : (
                                                                            <i className="fa-solid fa-caret-right"></i>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {OpenDetail === item.id_pesanan && (
                                                                <div className='d-flex flex-column justify-content-beetwen px-2'>
                                                                    {item.detail_pesanan.map((item, index) => {
                                                                        return (
                                                                            <div className='d-flex flex-row under-line py-3' key={index}>
                                                                                <div className='cover-img-menu'>
                                                                                    <img src={item.sampul_menu} alt='foto kosong' />
                                                                                </div>
                                                                                <div className='d-flex flex-column mx-left-1 w-100'>
                                                                                    <span className='text-size-12 text-secondary text-bold'>{item.nama_menu}</span>
                                                                                    <div className='d-flex flex-column align-item-end'>
                                                                                        <span className='text-size-10 text-secondary px-2'>x {item.jumlah}</span>
                                                                                        <span className='text-size-10 text-secondary px-2'>{Number(item.harga_satuan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                    <div className='d-flex flex-column under-line px-2 my-bottom-1'>
                                                                        <div className='d-flex justify-content-beetwen'>
                                                                            <span className='text-size-10 text-secondary py-2'>{item.detail_pesanan.length} Menu</span>
                                                                            <span className='text-size-10 text-secondary py-2'>Total pesanan: <span className='text-default'>{Number(item.total_pesanan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span></span>
                                                                        </div>
                                                                    </div>

                                                                    <div className='d-flex flex-column px-2'>
                                                                        <span className='text-size-12 text-secondary'>Status Pembayaran</span>
                                                                        <span className='text-size-10 text-secondary'>PAID</span>
                                                                    </div>

                                                                    <div className='d-flex flex-column my-top-1 px-2'>
                                                                        <span className='text-size-12 text-secondary'>Metode Pembayaran</span>
                                                                        <span className='text-size-10 text-secondary'>{pembayaran.metode_pembayaran}</span>
                                                                    </div>

                                                                    <div className='my-top-1 px-2'>
                                                                        <div className='d-flex flex-row justify-content-beetwen w-100'>
                                                                            <span className='text-size-10'>Kode pesanan</span>
                                                                            <span className='text-size-10'>{item.kode_pesanan}</span>
                                                                        </div>
                                                                        <div className='d-flex flex-row justify-content-beetwen w-100 text-secondary'>
                                                                            <span className='text-size-10'>Tanggal Pemesanan</span>
                                                                            <span className='text-size-10'>{formatDate(item.tgl_pesanan)}</span>
                                                                        </div>
                                                                        <div className='d-flex flex-row justify-content-beetwen w-100 text-secondary my-bottom-1'>
                                                                            <span className='text-size-10'>Tanggal Pembayaran</span>
                                                                            <span className='text-size-10'>{formatDate(pembayaran.tgl_pembayaran)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div style={{ display: activeTab === 3 ? 'flex' : 'none', flexWrap: 'wrap' }}>
                    {loading ? (
                        <div className='w-100 d-flex py-5 flex-column align-item-center my-top-5'>
                            <div className='d-flex' style={{ height: 196, width: 200 }}>
                                <Lottie
                                    animationData={loadingAnimation}
                                    loop={true}
                                    autoplay={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {DataPesanan.length === 0 ? (
                                <div className='w-100 d-flex py-5 flex-column align-item-center my-top-2'>
                                    <div className='d-flex' style={{ height: 200, width: 200 }}>
                                        <Lottie
                                            animationData={not_found}
                                            loop={true}
                                            autoplay={true}
                                        />
                                    </div>
                                    <p className='text-default text-size-14 text-bold'>{message}</p>
                                </div>
                            ) : (
                                <div className='container-pesanan justify-content-end'>
                                    {DataPesanan.map((pembayaran, index) => {
                                        return (
                                            <div key={index}>
                                                {pembayaran.pesanan.map((item, index) => {
                                                    return (
                                                        <div className='card-pesanan' key={index}>
                                                            <div className='d-flex flex-column'>
                                                                <div className='d-flex flex-column'>
                                                                    <span className='text-size-14 text-bold py-2'>{item.nama_destinasi}</span>
                                                                </div>
                                                                {item.detail_pesanan.map((item, index) => {
                                                                    return (
                                                                        <div className='d-flex flex-row under-line my-top-1 py-bottom-1 ' key={index}>
                                                                            <div className='cover-img-menu'>
                                                                                <img src={item.sampul_menu} alt='foto kosong' />
                                                                            </div>
                                                                            <div className='d-flex flex-column mx-left-1 w-100'>
                                                                                <span className='text-size-12 text-secondary text-bold'>{item.nama_menu}</span>
                                                                                <div className='d-flex flex-column align-item-end'>
                                                                                    <span className='text-size-10 text-secondary'>x {item.jumlah}</span>
                                                                                    <span className='text-size-10 text-secondary'>{Number(item.harga_satuan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                                <div className='d-flex flex-column under-line px-2'>
                                                                    <div className='d-flex justify-content-beetwen'>
                                                                        <span className='text-size-10 text-secondary py-2'>{item.detail_pesanan.length} Menu</span>
                                                                        <span className='text-size-10 text-secondary py-2'>Total pesanan: <span className='text-default'>{Number(item.total_pesanan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span></span>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex flex-column under-line my-bottom-1 px-2' onClick={() => ToggleOpenDetail(item.id_pesanan)}>
                                                                    <div className='d-flex justify-content-beetwen align-item-center'>
                                                                        <span className='text-size-10 text-secondary py-2'>Lihat detail</span>
                                                                        {OpenDetail === item.id_pesanan ? (
                                                                            <i className="fa-solid fa-caret-down"></i>
                                                                        ) : (
                                                                            <i className="fa-solid fa-caret-right"></i>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {OpenDetail === item.id_pesanan && (
                                                                <div className='d-flex flex-column justify-content-beetwen px-2'>
                                                                    <div>
                                                                        <div className='d-flex flex-column'>
                                                                            <span className='text-size-12 text-secondary'>Metode Pembayaran</span>
                                                                        </div>
                                                                        <div className='d-flex flex-row justify-content-beetwen'>
                                                                            <span className='text-size-10 text-secondary'>{pembayaran.metode_pembayaran}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='my-top-1'>
                                                                        <div className='d-flex flex-row justify-content-beetwen w-100'>
                                                                            <span className='text-size-10'>Kode pesanan</span>
                                                                            <span className='text-size-10'>{item.kode_pesanan}</span>
                                                                        </div>
                                                                        <div className='d-flex flex-row justify-content-beetwen w-100 text-secondary'>
                                                                            <span className='text-size-10'>Tanggal Pemesanan</span>
                                                                            <span className='text-size-10'>{formatDate(item.tgl_pesanan)}</span>
                                                                        </div>
                                                                        <div className='d-flex flex-row justify-content-beetwen w-100 text-secondary'>
                                                                            <span className='text-size-10'>Tanggal Pembayaran</span>
                                                                            <span className='text-size-10'>{formatDate(pembayaran.tgl_pembayaran)}</span>
                                                                        </div>
                                                                        <div className='d-flex flex-row justify-content-beetwen w-100 text-secondary my-bottom-1'>
                                                                            <span className='text-size-10'>Tanggal Pesanan Selesai</span>
                                                                            <span className='text-size-10'>{formatDate(item.tgl_pesanan_selesai)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {item.jenis_destinasi === "tbl_destinasi" && (
                                                                <div className='d-flex justify-content-end my-bottom-1'>
                                                                    <button className='button-form mx-left-1' style={{ width: 150 }} onClick={() => navigate(`/wisata/${item.id_destinasi}`)}>Pesan lagi
                                                                    </button>
                                                                </div>
                                                            )}
                                                            {item.jenis_destinasi === "tbl_kuliner" && (
                                                                <div className='d-flex justify-content-end my-bottom-1'>
                                                                    <button className='button-form mx-left-1' style={{ width: 150 }} onClick={() => navigate(`/kuliner/${item.id_destinasi}`)}>Pesan lagi
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div style={{ display: activeTab === 4 ? 'flex' : 'none', flexWrap: 'wrap' }}>
                    {loading ? (
                        <div className='w-100 d-flex py-5 flex-column align-item-center my-top-5'>
                            <div className='d-flex' style={{ height: 196, width: 200 }}>
                                <Lottie
                                    animationData={loadingAnimation}
                                    loop={true}
                                    autoplay={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {DataPesanan.length === 0 ? (
                                <div className='w-100 d-flex py-5 flex-column align-item-center my-top-2'>
                                    <div className='d-flex' style={{ height: 200, width: 200 }}>
                                        <Lottie
                                            animationData={not_found}
                                            loop={true}
                                            autoplay={true}
                                        />
                                    </div>
                                    <p className='text-default text-size-14 text-bold'>{message}</p>
                                </div>
                            ) : (
                                <div className='container-pesanan justify-content-end'>

                                    {DataPesanan.map((pembayaran, index) => {
                                        return (
                                            <div key={index}>
                                                {pembayaran.pesanan.map((item, index) => {
                                                    return (
                                                        <div className='card-pesanan' key={index}>
                                                            <div className='d-flex flex-column'>

                                                                <div className='w-100 d-flex justify-content-beetwen my-top-1'>
                                                                    <div className='d-flex flex-column'>
                                                                        <span className='text-size-14 text-bold'>{item.nama_destinasi}</span>
                                                                    </div>
                                                                    <div className='d-flex flex-column justify-content-beetwen'>
                                                                        <div className='d-flex flex-column text-end'>
                                                                            <span className='text-size-14 text-danger'>Pembatalan Berhasil</span>
                                                                            <span className='text-size-10 text-secondary'>Pada {formatDate(item.tgl_pesanan_selesai)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {item.detail_pesanan.map((item, index) => {
                                                                    return (
                                                                        <div className='d-flex flex-row under-line my-top-1 py-bottom-1 ' key={index}>
                                                                            <div className='cover-img-menu'>
                                                                                <img src={item.sampul_menu} alt='foto kosong' />
                                                                            </div>
                                                                            <div className='d-flex flex-column mx-left-1 w-100'>
                                                                                <span className='text-size-12 text-secondary text-bold'>{item.nama_menu}</span>
                                                                                <div className='d-flex flex-column align-item-end'>
                                                                                    <span className='text-size-10 text-secondary'>x {item.jumlah}</span>
                                                                                    <span className='text-size-10 text-secondary'>{Number(item.harga_satuan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                                <div className='d-flex flex-column under-line px-2 my-bottom-1'>
                                                                    <div className='d-flex justify-content-beetwen'>
                                                                        <span className='text-size-10 text-secondary py-2'>{item.detail_pesanan.length} Menu</span>
                                                                        <span className='text-size-10 text-secondary py-2'>Total pesanan: <span className='text-default'>{Number(item.total_pesanan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* {item.keterangan_pembayaran} */}
                                                            {item.jenis_destinasi === "tbl_destinasi" && (
                                                                <div className='d-flex justify-content-beetwen align-item-center my-bottom-1'>
                                                                    <div>
                                                                        <span className='text-size-10 text-bold py-2'>NOTE: </span>
                                                                        <span className='text-size-10 text-danger'>{pembayaran.keterangan_pembayaran}</span>
                                                                    </div>
                                                                    <button className='button-form mx-left-1' style={{ width: 150 }} onClick={() => navigate(`/wisata/${item.id_destinasi}`)}>Pesan lagi
                                                                    </button>
                                                                </div>
                                                            )}
                                                            {item.jenis_destinasi === "tbl_kuliner" && (
                                                                <div className='d-flex justify-content-beetwen align-item-center my-bottom-1'>
                                                                    <div>
                                                                        <span className='text-size-10 text-bold py-2'>NOTE: </span>
                                                                        <span className='text-size-10 text-danger'>{pembayaran.keterangan_pembayaran}</span>
                                                                    </div>
                                                                    <button className='button-form mx-left-1' style={{ width: 150 }} onClick={() => navigate(`/kuliner/${item.id_destinasi}`)}>Pesan lagi
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section >
    );
}

export default PesananKuPage;
