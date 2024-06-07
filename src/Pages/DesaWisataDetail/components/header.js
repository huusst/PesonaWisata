import React, { useState, useEffect } from 'react';

function HeaderDetail({ DetailDesa }) {

    return (
        <div>
            <div className="cover">
                <div>
                    {DetailDesa.map((item, index) => {
                        return (
                            <div>
                                <div className='d-flex flex-row'>
                                    <span className='mx-1 text-bold text-size-14'>Wisata Desa {item.nama_desaWisata}</span>
                                </div>
                                <div>
                                    <p className='px-1 py-3'>{item.desk_desaWisata}</p>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default HeaderDetail;
