import React from "react";
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
                    <li><a href="#">Início</a></li>
                    <li><a href="#">Sobre Nós</a></li>
                    <li><a href="#">Serviços</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </nav>
            <button className="botao">Login</button>
        </header>
    );

}
