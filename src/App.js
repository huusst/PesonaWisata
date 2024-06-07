import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './modal/login';
import { Route, Routes } from "react-router-dom";
import RegisterModal from './modal/registrasi';
import VerifOTPModal from './modal/verifOtp';
import ResetPassModal from './modal/resetpassword';

import Landing from './landingPage/index';
import ComingSoon from './Pages/ComingsoonPage';
import DesaWisata from './Pages/DesaWisata';
import DesaWisataDetail from './Pages/DesaWisataDetail';
import WisataDetail from './Pages/WisataDetail';
import KulinerPage from './Pages/Kuliner';
import KulinerDetail from './Pages/KulinerDetail';
import PenginapanPage from './Pages/Penginapan';
import PenginapanDetail from './Pages/PenginapanDetail';
import Alert from './modal/alert';

function App() {
  //data login
  const [name, setname] = useState('');
  const [profile, setProfile] = useState('');

  const [statusLogin, setStatusLogin] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [telp, setTelp] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(true);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isCloseRegister, setIsCloseRegister] = useState(true);
  const [isOpenOtp, setIsOpenOtp] = useState(false);
  const [isCloseOtp, setIsCloseOtp] = useState(true);
  const [isOpenReset, setIsOpenReset] = useState(false);
  const [isCloseReset, setIsCloseReset] = useState(true);

  const [statusReset, setResetPass] = useState(false);
  const [statusVerifikasi, setVerifikasi] = useState('');

  const [StatusAlert, setStatusAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [StatusNameAlert, setStatusNameAlert] = useState('');

  const getMe = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/wisatawan/me')
      if (response) {
        setStatusLogin(true);
        setname(response.data.user_wisatawan.name);
        setProfile(response.data.user_wisatawan.profile);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    getMe();
  }, [])

  const handleOpenModal = () => {
    setIsOpen(true);
    setIsClose(false);
  };

  const handleCloseModal = () => {
    setIsClose(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 180); // Delay 1000 milidetik (1 detik)
  };

  const handleOpenModalRegister = () => {
    setIsOpenRegister(true);
    setIsCloseRegister(false);
  };

  const handleCloseModalRegister = () => {
    setIsCloseRegister(true);
    setTimeout(() => {
      setIsOpenRegister(false);
    }, 180); // Delay 1000 milidetik (1 detik)
  };

  const handleOpenModalOtp = () => {
    setIsOpenOtp(true);
    setIsCloseOtp(false);
  };

  const handleCloseModalOtp = () => {
    setIsCloseOtp(true);
    setTimeout(() => {
      setIsOpenOtp(false);
    }, 180); // Delay 1000 milidetik (1 detik)
  };

  const handleOpenModalReset = () => {
    setIsOpenReset(true);
    setIsCloseReset(false);
  };

  const handleCloseModalReset = () => {
    setIsCloseReset(true);
    setTimeout(() => {
      setIsOpenReset(false);
    }, 180); // Delay 1000 milidetik (1 detik)
  };

  const handleSwitchtoRegister = () => {
    handleCloseModal();
    setTimeout(() => {
      handleOpenModalRegister();
    }, 180);
  };

  const handleSwitchtoLogin = () => {
    handleCloseModalRegister();
    setTimeout(() => {
      handleOpenModal();
    }, 180);
  };

  const handleSwitchLogintoReset = () => {
    handleCloseModal();
    setTimeout(() => {
      handleOpenModalReset();
    }, 180);
  };

  const changeStatusOn = () => {
    setResetPass(true);
  };
  const changeStatusOff = () => {
    setResetPass(false);
  };
  
  const changeStatusAlertShow = () => {
    setStatusAlert(true);
  };
  const changeMessageAlert = (message) => {
    setMessageAlert(message);
  };
  const changeStatusNameAlert = (Status) => {
    setStatusNameAlert(Status);
  };
  const changeStatusAlertClose = () => {
    setStatusAlert(false);
  };

  useEffect(() => {
    if (messageAlert !== '') {
      setTimeout(() => {
        changeStatusAlertClose();
      }, 5000);
    }
  })

  return (
    <div>
      <Navbar
        name={name}
        profile={profile}
        setStatusLogin={setStatusLogin}
        statusLogin={statusLogin}
        openModal={handleOpenModal}
        openModalRegister={handleOpenModalRegister}
      />
      <LoginModal
        setStatusLogin={setStatusLogin}
        isOpen={isOpen}
        isClose={isClose}
        closeModal={handleCloseModal}
        SwicthToRegister={handleSwitchtoRegister}
        SwicthToResetPass={handleSwitchLogintoReset}
      />
      <RegisterModal
        isOpen={isOpenRegister}
        isClose={isCloseRegister}
        closeModal={handleCloseModalRegister}
        SwicthToLogin={handleSwitchtoLogin}
        OpenOtp={handleOpenModalOtp}
        statusVerif={setVerifikasi}
        username={username}
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        telp={telp}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordConfirm={setPasswordConfirm}
        setTelp={setTelp}
        showAlert={changeStatusAlertShow}
        messageAlert={changeMessageAlert}
        nameAlert={changeStatusNameAlert}
      />
      <VerifOTPModal
        isOpen={isOpenOtp}
        isClose={isCloseOtp}
        closeModal={handleCloseModalOtp}
        statusVerif={statusVerifikasi}
        chagePass={handleOpenModalReset}
        username={username}
        email={email}
        password={password}
        telp={telp}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setTelp={setTelp}
        showAlert={changeStatusAlertShow}
        messageAlert={changeMessageAlert}
        nameAlert={changeStatusNameAlert}
      />
      <ResetPassModal
        email={email}
        setEmail={setEmail}
        isOpen={isOpenReset}
        isClose={isCloseReset}
        closeModal={handleCloseModalReset}
        StatusReset={statusReset}
        changeon={changeStatusOn}
        changeoff={changeStatusOff}
        switchtoOtp={handleOpenModalOtp}
        statusVerif={setVerifikasi}
      />

      {messageAlert !== '' && (
        <Alert show={StatusAlert} onClose={changeStatusAlertClose} status={StatusNameAlert} message={messageAlert} />
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/desawisata" element={<DesaWisata />} />
        <Route path="/kuliner" element={<KulinerPage />} />
        <Route path="/kuliner/:id" element={<KulinerDetail />} />
        <Route path="/penginapan" element={<PenginapanPage />} />
        <Route path="/penginapan/:id" element={<PenginapanDetail />} />
        <Route path="/desawisata/:id" element={<DesaWisataDetail />} />
        <Route path="/wisata/:id" element={<WisataDetail />} />
        <Route path="/admin" element={<Landing />} />
        <Route path="/coming_soon" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
