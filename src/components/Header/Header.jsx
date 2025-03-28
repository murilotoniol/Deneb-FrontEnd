import React from "react";
import "../Header/Header.css"


export default function Header() {
    return (

        <header className="Header">
            <div className="image">
<<<<<<< HEAD
                <img src="https://ichef.bbci.co.uk/images/ic/512xn/p09j7x4c.jpg.webp" alt="teste" className="murilo" />
=======
            <img src="https://ichef.bbci.co.uk/images/ic/512xn/p09j7x4c.jpg.webp" alt="teste" className="logo"/>
>>>>>>> refs/remotes/origin/develop
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
