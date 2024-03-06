import React, { useState } from 'react';
import './App.css';
import Landing from './landingPage/index';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './modal/login';
import { Route, Routes } from "react-router-dom";
import RegisterModal from './modal/registrasi';
import VerifOTPModal from './modal/verifOtp';
import ResetPassModal from './modal/resetpassword';

function App() {
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

  return (
    <div>
      <Navbar 
          openModal={handleOpenModal} 
          openModalRegister={handleOpenModalRegister}
      />
      <LoginModal 
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
      />
      <ResetPassModal 
          isOpen={isOpenReset} 
          isClose={isCloseReset} 
          closeModal={handleCloseModalReset} 
          StatusReset={statusReset} 
          changeon={changeStatusOn} 
          changeoff={changeStatusOff} 
          switchtoOtp={handleOpenModalOtp} 
          statusVerif={setVerifikasi}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
