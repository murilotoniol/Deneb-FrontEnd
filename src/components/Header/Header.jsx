import React from "react";
import { Link } from 'react-router-dom';
import "../Header/Header.css"
import logo from "../../assets/teste.png"

export default function Header() {
    return (

        <header className="Header">
            <div className="image">
            <img src={logo} alt="teste" className="logo" />
            </div>
            <nav>
                <ul>
                    <li><Link/></li>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/about">Sobre Nós</Link></li>
                    <li><Link to="/procurarServiços">Serviços</Link></li>
                    <li><Link to="/contact">Contato</Link></li>
                </ul>
            </nav>
            <button className="botao">Login</button>
        </header>
    );

}
