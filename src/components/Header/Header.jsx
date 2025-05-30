import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../Header/Header.css";
import logo from "../../assets/teste.png";
import AsideMenu from "../../components/asideMenu/AsideMenu";
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`Header ${visible ? '' : 'Header--hidden'}`}>
      <div className="image">
        <img src={logo} alt="teste" className="logo" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/procurarServiços">Serviços</Link></li>
          <li><Link to="/contact">Contato</Link></li>
        </ul>
      </nav>
      <button onClick={openMenu} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
        <MenuIcon />
      </button>
      {isMenuOpen && <AsideMenu open={isMenuOpen} onClose={closeMenu} />} 
    </header>
  );
}