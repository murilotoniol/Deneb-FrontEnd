import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import AsideMenu from "../asideMenu/AsideMenu";

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={`Header ${visible ? "" : "Header--hidden"}`}>
      <AsideMenu />
      <nav>
        <ul>
          <li>
            <Link />
          </li>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/procurarServiços">Serviços</Link>
          </li>
          <li>
            <Link to="/contact">Contato</Link>
          </li>
        </ul>
      </nav>
      <button className="botao">Login</button>
    </header>
  );
}
