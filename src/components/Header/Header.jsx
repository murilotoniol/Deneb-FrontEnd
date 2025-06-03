import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../Header/Header.css";
import logo from "../../assets/teste.png";
import AsideMenu from "../../components/asideMenu/AsideMenu";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const goToOfertarServico = () => {
    navigate("/ofertaservico");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <header className="Header">

      <div className="image" onClick={goToHome} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="teste" className="logo" />
      </div>

      {/* Barra de pesquisa! */}
      <div className="search-bar">
        <SearchIcon style={{ color: "#666", marginLeft: "10px" }} />
        <input type="text" placeholder="Serviço, usuário ou categoria" className="search-input" />
      </div>

      <div className="header-buttons">
        <Link to="/categorias" className="link-categorias" class="link-categorias">
          <p>Categorias</p>
        </Link>

        <button className="button-anunciar" 
          type="button"
          onClick={goToOfertarServico}
        >
          <p>Anunciar</p>
        </button>

        <button className="button-carrinho" style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ShoppingCartIcon style={{ color: "#666" }} />
        </button>

        <button
          onClick={openMenu}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <MenuIcon style={{ color: "#666" }} />
        </button>
      </div>
      {isMenuOpen && <AsideMenu open={isMenuOpen} onClose={closeMenu} />}
    </header>
  );
}