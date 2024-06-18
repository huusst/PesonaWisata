import { React, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


function ContentDetailDesaWisata({ Detailwisata }) {

    // const koordinat = Detailwisata[0].koordinat;
    // const harga = Detailwisata[0].harga;
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

    return (
        <div className="cover-detail">

            {Detailwisata.map((item, index) => {
                return (
                    <div className='maps-kuliner'>
                        <span className='text-bold text-size-16'>Lokasi {item.nama}</span>
                        <div className='px-top-2'>
                            {/* <LoadScript googleMapsApiKey="AIzaSyBwbLvjQhSE7C86FUct2SUrsMnJ49e9cnw">
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript> */}
                            <iframe src={item.link_iframe} width="100%" height="500px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default ContentDetailDesaWisata;
