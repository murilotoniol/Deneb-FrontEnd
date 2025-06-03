import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/Home/Home";
import OfertaServiço from "./pages/OfertaServiço/OfertaServiço";
import ProcurarServiços from "./pages/ProcurarServiços/ProcurarServiços";
import Avaliacoes from "./pages/avaliacoes/Avaliacoes";
import Mensagens from "./pages/mensagens/Mensagens";
import RecuperarSenha from "./pages/recuperarSenha/RecuperarSenha";
import RedefinirSenha from "./pages/recuperarSenha/RedefinirSenha";
import DetalhesServico from "./pages/DetalheServico/DetalheServico";
import { MenuProvider } from "./components/MenuProvider/MenuProvider";

function App() {
  return (
    <MenuProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Cadastro />} />
          <Route path="/ofertaservico" element={<OfertaServiço />} />
          <Route path="/procurarservicos" element={<ProcurarServiços />} />
          <Route path="/servico/:serviceId" element={<DetalhesServico />} />
          <Route path="/avaliacoes" element={<Avaliacoes />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        </Routes>
      </div>
    </MenuProvider>
  );
}

export default App;
