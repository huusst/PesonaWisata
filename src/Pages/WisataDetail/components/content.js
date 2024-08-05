import { React, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


function ContentDetailDesaWisata({
    Detailwisata,
    showAlert,
    messageAlert,
    nameAlert,
    statusLogin,
    openModal
}) {

    const harga = Detailwisata[0].harga;
    const id = Detailwisata[0].id;
    const namaDesa = Detailwisata[0].nama;
    const status_jalan = Detailwisata[0].status_jalan;
    const jenis_kendaraan = Detailwisata[0].jenis_kendaraan;
    const [jumlah_wisatawan, setJumlah] = useState(1);
    const [date, setDate] = useState();
    // const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    // const koordinat = Detailwisata[0].koordinat;
    // const koordinatArray = koordinat.split(',');
    // const lat = parseFloat(koordinatArray[0].trim());
    // const lng = parseFloat(koordinatArray[1].trim());
    // Membuat objek center dengan nilai latitude dan longitude yang didapat
    // const center = {
    //     lat: lat,
    //     lng: lng
    // };

    // const containerStyle = {
    //     width: '100%',
    //     height: '500px',
    // };

    const add = () => {
        setJumlah(jumlah_wisatawan + 1);
    }

    const min = () => {
        if (jumlah_wisatawan > 1) {
            setJumlah(jumlah_wisatawan - 1);
        }
    }

    const AddKeranjang = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/keranjang/add/ticket`, {
                id_menu: id,
                id_destinasi: id,
                jumlah: jumlah_wisatawan,
                date: date
            });

            if (response) {
                messageAlert(response.data.message);
                nameAlert('Success')
                showAlert();
            }
        } catch (error) {
            if (error.response.status === 422) {
                messageAlert(error.response.data.message);
                nameAlert('Warning')
                showAlert();
            } else if (error.response.status === 401) {
                openModal();
            } else {
                console.log(error);
            }
        }

    }


    const getData = useCallback(async () => {
        try {
            if (statusLogin === "login") {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/keranjang/check?filter[id_destinasi]=${id}&filter[nama_destinasi]=tbl_destinasi`)
                if (response) {
                    setDate(response.data.data[0].tgl_booking)
                    setJumlah(response.data.data[0].detail_pesanan[0].jumlah)
                }
            }
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error);
            }
        }
    }, [statusLogin, id])

    useEffect(() => {
        getData();
    }, [getData]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const dateWithTime = moment(selectedDate).set({ hour: 23, minute: 59, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
        setDate(dateWithTime);
    };

    return (
        <div className="cover-detail">
            <div className='maps'>
                <span className='text-bold text-size-16'>Lokasi {namaDesa}</span>
                <div className='px-top-2'>
                    {/* <LoadScript googleMapsApiKey="AIzaSyBwbLvjQhSE7C86FUct2SUrsMnJ49e9cnw">
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript> */}
                    <iframe title='Maps' src={Detailwisata[0].link_iframe} width="100%" height="600px"></iframe>
                </div>
            </div>
            <div className='container-ticket '>
                <div className='ticket'>
                    <span className='text-bold text-size-10'>Harga Tiket</span>
                    <div>
                        {harga === "GRATIS" ? (
                            <span className='text-default text-bold'>{harga}</span>
                        ) : (
                            <span className='text-default text-size-18 text-bold'>{Number(harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} <span className='text-size-10 text-black'>/ orang</span></span>
                        )}
                    </div>
                    <div className='d-flex flex-row my-4'>
                        <button className='button-addMin' onClick={add}>+</button>
                        <div className='jumlah'>
                            <span>{jumlah_wisatawan}</span>
                        </div>
                        <button className='button-addMin' onClick={min}>-</button>
                    </div>
                    <div className='d-flex flex-column my-bottom-1'>
                        <label className='text-bold'>Pilih tanggal booking</label>
                        <input value={moment(date).format('YYYY-MM-DD')} className='date-style' type='date' onChange={handleDateChange}></input>
                    </div>
                    <button className='button-form' onClick={AddKeranjang}>tambahkan keranjang
                    </button>
                </div>
                <div className='ticket my-top-2'>
                    <span className='text-bold text-size-12'>Kondisi Jalan</span>
                    <p className='my-2 text-size-10'>Kondisi akses jalan menuju ke Wisata {namaDesa} {status_jalan === '1' ? "cukup bagus" : status_jalan === '2' ? "lumayan rusak" : "masih jauh dari kata layak"} ({jenis_kendaraan === '1' ? "dapat dilalui kendaraan roda empat dan roda dua" : jenis_kendaraan === '2' ? "dapat dilalui kendaraan hanya roda dua" : "untuk kendaraan tidak dapat masuk ke destinasi"})</p>
                    <span className='text-bold text-size-12'>Fasilitas Destinasi </span>
                    <div className='d-flex flex-column my-2'>
                        {Detailwisata[0].data_fasilitas.map((item, index) => {
                            return (
                                <span key={index} className='px-1 text-size-10'>- {item.nama_fasilitas_wisata}</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentDetailDesaWisata;
