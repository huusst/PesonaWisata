import React from 'react';
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import Landing from './landingPage/index';
import Navbar from './Navbar';
import './index.css';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
  <Navbar/>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="pembayaran" element={<App />} />
        <Route path="landing" element={<Landing />} />
      </Routes>
  </BrowserRouter>,
  rootElement
);
