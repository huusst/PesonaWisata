import React, { useState, useEffect } from 'react';
import './assets/styles.css'; // Import file CSS untuk styling modal

function LoginModal({ isOpen, isClose, closeModal, SwicthToRegister, SwicthToResetPass }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errormessage, setMessage] = useState(null);
  const [isVisible, setisVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username !== '' && password !== '') {
      setMessage(null);
    }
  }, [username, password]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    if (username === '' || password === '') {
      setMessage('Masukkan email dan password');
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
        closeModal();
        setPassword('');
        setUsername('');
      }, 6000);
    }

  };

  const handleshowPass = (e) => {
    setisVisible(!isVisible)
  };

  return (

    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className={`modal-content ${isClose ? 'animasiDown' : 'animasiUp'}`}>
        <div className='cover-close'>
          <span className='text-bold text-size-14'>Login</span>
          <span className="close" onClick={closeModal}>&times;</span>
        </div>
        {errormessage !== null && (
          <span className='text-size-10 text-danger my-1'><i class="fa-solid fa-circle-info" style={{ marginRight: 5 }} /> {errormessage}</span>
        )}
        <form onSubmit={handleLogin} className='form py-1'>
          <div className='group-form'>
            <i className="fa-solid fa-envelope mx-right-1 text-default" />
            <input className='email' type="email" placeholder='Email' id="email" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='group-form'>
            <i className="fas fa-key text-scondary mx-right-1 text-default" />
            <input type={`${isVisible ? 'text' : 'password'}`} placeholder='Password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a onClick={handleshowPass}>
              {isVisible ? (
                <i className="far fa-eye text-secondary" />
              ) : (
                <i className="far fa-eye-slash text-secondary" />
              )}
            </a>
          </div>
          <div className='d-flex flex-row justify-content-end'>
            <a className='text-secondary text-size-10 my-1' onClick={SwicthToResetPass}>Lupa Password?</a>
          </div>
          <button className='button-form' type="submit">Login
            {loading ? (
              <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
            ) : (
              <div></div>
            )}
          </button>
        </form>
        <div className='d-flex flex-row'>
          <span className='text-size-10' style={{ paddingRight: 3 }}>Belum punya akun?</span>
          <a className='text-default text-size-10' onClick={SwicthToRegister}>Daftar</a>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
