
import React from 'react'
import './App.css'
import Login from './pages/login/Login'
import ReactDOM from "react-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cadastro from './pages/cadastro/Cadastro';

function App() {
  return(
    <div>
        {/* <Header/>
        <Login/>
        <Footer /> */}
        <Cadastro/>
    </div>
  )
  
}

export default App
