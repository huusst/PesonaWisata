import { React, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


function ContentDetailDesaWisata({ Detailwisata, kategori }) {

    const koordinat = Detailwisata[0].koordinat;
    const harga = Detailwisata[0].harga;
    const namaDesa = Detailwisata[0].nama;
    const koordinatArray = koordinat.split(',');
    const lat = parseFloat(koordinatArray[0].trim());
    const lng = parseFloat(koordinatArray[1].trim());
    const [jumlah_wisatawan, setJumlah] = useState(1);
    // Membuat objek center dengan nilai latitude dan longitude yang didapat
    const center = {
        lat: lat,
        lng: lng
    };

    const containerStyle = {
        width: '100%',
        height: '500px',
    };

    const add = () => {
        setJumlah(jumlah_wisatawan + 1);
    }

    const min = () => {
        if (jumlah_wisatawan > 1) {
            setJumlah(jumlah_wisatawan - 1);
        }
    }

    return (
        <div className="cover-detail">
            <div className='maps-kuliner'>
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
        </div>
    );
}

export default ContentDetailDesaWisata;
