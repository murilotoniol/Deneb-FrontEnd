
import React from 'react'
import './App.css'
import Login from './pages/login/Login'
import ReactDOM from "react-dom";
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/Home/Home';
import OfertaServiço from './pages/OfertaServiço/OfertaServiço'
import ProcurarServiços from './pages/ProcurarServiços/ProcurarServiços'


function App() {
  return(
    <div> 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/registrar' element={<Cadastro/>} />
            <Route path="/ofertaservico" element={<OfertaServiço />} />
            <Route path="/procurarservicos" element={<ProcurarServiços />} />
          </Routes>

    </div>
  )
  
}

export default App
