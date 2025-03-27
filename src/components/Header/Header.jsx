import React from "react";
import "../Header/Header.css"


 export default function Header() {
    return (
        <div className="Header">
            <div className="image">
            <img src="https://ichef.bbci.co.uk/images/ic/512xn/p09j7x4c.jpg.webp" alt="teste" className="logo"/>
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
        </div>

    );

}
