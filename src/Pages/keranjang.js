import React from 'react';
import Lottie from 'lottie-react';
import animationData from './assets/js/cart_empty.json';

function KeranjangPage() {
    return (
        <section>
            <div className='bg-dark' style={{height: '5rem'}}></div>
            <div className='d-flex flex-column justify-content-center align-item-center' style={{height: '70vh'}}>
                <div style={{height: 200, width: 200}}>
                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                />
                </div>
                <p className='text-default text-size-14 text-bold my-top-2'>Keranjang anda masih kosong</p>
            </div>
        </section>
    );
}

export default KeranjangPage;
