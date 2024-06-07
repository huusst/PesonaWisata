import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import App from './App';
import './index.css';
import './Pages/assets/css/styles.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);