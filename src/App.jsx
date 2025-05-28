import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import { Routes, Route, Link } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/Home/Home";
import OfertaServiço from "./pages/OfertaServiço/OfertaServiço";
import ProcurarServiços from "./pages/ProcurarServiços/ProcurarServiços";
import RecuperarSenha from "./pages/recuperarSenha/RecuperarSenha";
import RedefinirSenha from "./pages/recuperarSenha/RedefinirSenha";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/ofertaservico" element={<OfertaServiço />} />
        <Route path="/procurarservicos" element={<ProcurarServiços />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
      </Routes>
    </div>
  );
}

export default App;
