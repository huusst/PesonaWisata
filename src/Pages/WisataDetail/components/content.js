import { React, useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


function ContentDetailDesaWisata({ Detailwisata }) {

    const harga = Detailwisata[0].harga;
    const namaDesa = Detailwisata[0].nama;
    const [jumlah_wisatawan, setJumlah] = useState(1);
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

    useEffect(() => {  
       console.log(Detailwisata[0].link_iframe)
      });

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
                    <iframe src={Detailwisata[0].link_iframe} width="100%" height="500px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className='ticket'>
                <span className='text-bold text-size-10'>Harga Tiket</span>
                <div>
                    {harga == "GRATIS" ? (
                        <a className='text-default text-bold'>{harga}</a>
                    ) : (
                        <a className='text-default text-size-18 text-bold'>{Number(harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} <span className='text-size-10 text-black'>/ orang</span></a>
                    )}
                </div>
                <div className='d-flex flex-row my-4'>
                    <button className='button-addMin' onClick={add}>+</button>
                    <div className='jumlah'>
                        <span>{jumlah_wisatawan}</span>
                    </div>
                    <button className='button-addMin' onClick={min}>-</button>
                </div>
                <button className='button-form' type="submit">Pesan Sekarang
                </button>
            </div>
        </div>
    );
}

export default ContentDetailDesaWisata;
