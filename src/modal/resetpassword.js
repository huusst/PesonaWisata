import React, { useState, useEffect } from 'react';
import './assets/styles.css';

function ResetPassModal({
    isOpen,
    isClose,
    closeModal,
    changeon,
    changeoff,
    StatusReset,
    switchtoOtp, statusVerif
}) {
    const [email, setemail] = useState('');
    const [Newpass, setNewpass] = useState('');
    const [ConfirmNewpass, setConfirmNewpass] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [isVisibleConfirm, setisVisibleConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errormessage, setMessage] = useState(null);

    useEffect(() => {
        if (email !== '' || Newpass !== '' || ConfirmNewpass !== '') {
            setMessage(null);
        }
    }, [email, Newpass, ConfirmNewpass]);

    const handleshowPass = (e) => {
        setisVisible(!isVisible)
    };
    const handleshowConfirmPass = (e) => {
        setisVisibleConfirm(!isVisibleConfirm)
    };

    const handleSendOTP = (e) => {
        e.preventDefault();
        setLoading(true);

        if (email === '') {
            setMessage('Masukkan email Anda');
            setLoading(false);
        } else {
            setTimeout(() => {
                setMessage(null);
                setLoading(false);
                setemail('');
                statusVerif('reset');
                changeon();
                closeModal();
                switchtoOtp();
            }, 6000);
        }
    };

    const handleResetPass = (e) => {
        e.preventDefault();
        setLoading(true);

        if (Newpass === '') {
            setMessage('Masukkan password baru Anda');
            setLoading(false);
        } else {
            if (ConfirmNewpass === '') {
                setMessage('Masukkan konfirmasi password baru');
                setLoading(false);
            } else {
                if (Newpass === ConfirmNewpass) {
                    setTimeout(() => {
                        setMessage(null);
                        setLoading(false);
                        setNewpass('');
                        setConfirmNewpass('');
                        changeoff();
                        closeModal();
                    }, 6000);
                } else {
                    setMessage('Konfirmasi password baru salah');
                    setLoading(false);
                }
            }
        }
    };

    return (

        <div className={`modal ${isOpen ? 'open' : ''}`}>
            {StatusReset ? (
                <div className={`modal-content ${isClose ? 'animasiDown' : 'animasiUp'}`}>
                    <div className='cover-close'>
                        <span className='text-bold text-size-14'>Buat Password Baru Anda</span>
                        <span className="close" onClick={closeModal}>&times;</span>
                    </div>
                    {errormessage !== null && (
                        <span className='text-size-10 text-danger my-1'><i class="fa-solid fa-circle-info" style={{ marginRight: 5 }} /> {errormessage}</span>
                    )}
                    <form onSubmit={handleResetPass} className='form py-1'>
                        <div className='group-form'>
                            <i className="fas fa-key text-scondary mx-right-1 text-default" />
                            <input type={`${isVisible ? 'text' : 'password'}`} placeholder='Password Baru' id="password" value={Newpass} onChange={(e) => setNewpass(e.target.value)} />
                            <a onClick={handleshowPass}>
                                {isVisible ? (
                                    <i className="far fa-eye text-secondary" />
                                ) : (
                                    <i className="far fa-eye-slash text-secondary" />
                                )}
                            </a>
                        </div>
                        <div className='group-form'>
                            <i className="fas fa-key text-scondary mx-right-1 text-default" />
                            <input type={`${isVisibleConfirm ? 'text' : 'password'}`} placeholder='Konfirmasi Password' id="confirmpassword" value={ConfirmNewpass} onChange={(e) => setConfirmNewpass(e.target.value)} />
                            <a onClick={handleshowConfirmPass}>
                                {isVisible ? (
                                    <i className="far fa-eye text-secondary" />
                                ) : (
                                    <i className="far fa-eye-slash text-secondary" />
                                )}
                            </a>
                        </div>
                        <button className='button-form' type="submit">Reset
                            {loading ? (
                                <svg className="spinner" viewBox="0 0 50 50">
                                    <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                            ) : (
                                <div></div>
                            )}
                        </button>
                    </form>
                </div>
            ) : (
                <div className={`modal-content ${isClose ? 'animasiDown' : 'animasiUp'}`}>
                    <div className='cover-close'>
                        <span className='text-bold text-size-14'>Masukkan Email</span>
                        <span className="close" onClick={closeModal}>&times;</span>
                    </div>
                    {errormessage !== null && (
                        <span className='text-size-10 text-danger my-1'><i class="fa-solid fa-circle-info" style={{ marginRight: 5 }} /> {errormessage}</span>
                    )}
                    <form onSubmit={handleSendOTP} className='form py-1'>
                        <div className='group-form'>
                            <i className="fa-solid fa-envelope mx-right-1 text-default" />
                            <input className='email' type="email" placeholder='Email' id="emailReset" value={email} onChange={(e) => setemail(e.target.value)} required />
                        </div>
                        <button className='button-form' type="submit">Submit
                            {loading ? (
                                <svg className="spinner" viewBox="0 0 50 50">
                                    <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                            ) : (
                                <div></div>
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ResetPassModal;
