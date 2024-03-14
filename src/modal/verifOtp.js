import React, { useState, useEffect } from 'react';
import './assets/styles.css';

function VerifOTPModal({
    isOpen,
    isClose,
    closeModal,
    statusVerif,
    chagePass,
    username,
    email,
    password,
    telp,
    setUsername,
    setEmail,
    setPassword,
    setTelp,
}) {
    const OTP = '123654';
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [resendTime, setResendTime] = useState(300);
    const [timer, setTimer] = useState(null);
    const otpInputRefs = [];
    const [loading, setLoading] = useState(false);
    const [errormessage, setMessage] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setResendTime(300);
            setTimer(setInterval(() => {
                setResendTime(prevTime => prevTime - 1);
            }, 1000));
        }
        return () => {
            clearInterval(timer);
            setTimer(null);
        };
    }, [isOpen]);

    useEffect(() => {
        if (resendTime === 0) {
            clearInterval(timer);
            setTimer(null);
        }
    }, [resendTime, timer]);

    useEffect(() => {
        if (otp.every(digit => digit !== '')) {
            setMessage(null);
        }
    }, [otp]);

    const handleChange = (index, event) => {
        const value = event.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus next input
        if (value !== '' && index < 5) {
            otpInputRefs[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            otpInputRefs[index - 1].focus();
        }
    };

    const handleResend = () => {
        setOtp(new Array(6).fill(''));
        setResendTime(300);
        setTimer(setInterval(() => {
            setResendTime(prevTime => prevTime - 1);
        }, 1000));
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleVerification = () => {
        setLoading(true);
        const otpString = otp.join('').padStart(6, '0');

        if (otp.every(digit => digit === '')) {
            setLoading(false);
            setMessage('Masukkan kode OTP');
        } else {
            setTimeout(() => {
                if (otpString === OTP) {
                    setLoading(false);
                    clearInterval(timer);
                    setTimer(null);
                    setResendTime(300);
                    setOtp(new Array(6).fill(''));
                    closeModal();
                    chagePass();
                } else {
                    setLoading(false);
                    setMessage('Kode verifikasi salah');
                }
            }, 6000);
        }
    };

    const handleVerificationRegistrasi = () => {
        setLoading(true);
        const otpString = otp.join('').padStart(6, '0');

        if (otp.every(digit => digit === '')) {
            setLoading(false);
            setMessage('Masukkan kode OTP');
        } else {
            setTimeout(() => {
                if (otpString === OTP) {
                    clearInterval(timer);
                    setTimer(null);
                    setOtp(new Array(6).fill(''));
                    console.log(username);
                    console.log(email);
                    console.log(password);
                    console.log(telp);

                    setTimeout(() => {
                        setLoading(false);
                        setUsername('');
                        setTelp('');
                        setEmail('');
                        setPassword('');
                        closeModal();
                        window.location.href = "/";
                    }, 1000);
                } else {
                    setLoading(false);
                    setMessage('Kode verifikasi salah');
                }
            }, 5000);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className={`modal-content ${isClose ? 'animasiDown' : 'animasiUp'}`}>
                <div className='cover-close'>
                    <span className='text-bold text-size-14'>Verifikasi Kode OTP</span>
                </div>
                <div className='text-size-10'>
                    <p>Mohon untuk tidak meninggalkan halaman ini, kami telah mengirim kode OTP ke email Anda</p>
                </div>
                {errormessage !== null && (
                    <span className='text-size-10 text-danger my-1'><i className="fa-solid fa-circle-info" style={{ marginRight: 5 }} /> {errormessage}</span>
                )}
                <div className="otp-input-container my-1">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(ref) => otpInputRefs[index] = ref}
                        />
                    ))}
                </div>
                {resendTime === 0 ? (
                    <div>
                        <span className='text-size-12'>Kirim ulang kode?</span><button onClick={handleResend} className='text-default text-size-12' style={{ marginLeft: 5 }}>Klik disini</button>
                    </div>
                ) : (
                    <div>
                        <span className='text-size-12'>Kirim ulang kode?</span><span className='text-default text-size-12' style={{ marginLeft: 5 }}>{formatTime(resendTime)}</span>
                    </div>
                )}

                {statusVerif === "registrasi" ? (
                    <button className='button-form my-1' onClick={handleVerificationRegistrasi}>Verifikasi {loading ? (
                        <svg className="spinner" viewBox="0 0 50 50">
                            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                        </svg>
                    ) : (
                        <div></div>
                    )}
                    </button>
                ) : (
                    <button className='button-form my-1' onClick={handleVerification}>Verifikasi
                        {loading ? (
                            <svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>
                        ) : (
                            <div></div>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default VerifOTPModal;
