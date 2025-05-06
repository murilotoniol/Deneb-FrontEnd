import React from 'react'
import './App.css'
import Login from './pages/login/Login'
import ReactDOM from "react-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/Home/Home';
import OfertaServiço from './pages/OfertaServiço/OfertaServiço'
import ProcurarServiços from './pages/ProcurarServiços/ProcurarServiços'

function App() {
  return(
    <div>
        {/* <Header/> ok
        <Login/> ok
        <Footer /> ok
        <Cadastro/> estilizar ainda
        <Home/> ok
        <OfertaServiço/> ok
        <ProcurarServiços/> ok
        */} 
        <Header/>
        <Cadastro/>
        <Footer />
    </div>
  )
}

export default App