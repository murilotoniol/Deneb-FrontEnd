import React from 'react';
import './App.css';
import Login from './pages/login/Login';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/Home/Home';
import OfertaServiço from './pages/OfertaServiço/OfertaServiço';
import ProcurarServiços from './pages/ProcurarServiços/ProcurarServiços';
import Avaliacoes from './pages/avaliacoes/Avaliacoes';
import Mensagens from './pages/mensagens/Mensagens';
import RecuperarSenha from './pages/recuperarSenha/RecuperarSenha';
import RedefinirSenha from './pages/recuperarSenha/RedefinirSenha';
import DetalhesServico from './pages/DetalheServico/DetalheServico';
import { AuthProvider } from './services/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { MenuProvider } from './components/MenuProvider/MenuProvider';
import Perfil from './pages/perfil/Perfil';
import Categorias from './pages/categorias/Categorias';
import ServicosContratados from './pages/servicosContratados/ServicosContratados';
import MeusServicos from './pages/meusServicos/MeusServicos';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Cadastro />} />
          <Route
            path="/ofertaservico"
            element={
              <PrivateRoute>
                <OfertaServiço />
              </PrivateRoute>
            }
          />
          <Route path="/procurarservicos" element={<ProcurarServiços />} />
          <Route path="/servico/:serviceId" element={<DetalhesServico />} />
          <Route
            path="/avaliacoes"
            element={
              <PrivateRoute>
                <Avaliacoes />
              </PrivateRoute>
            }
          />
          <Route
            path="/mensagens"
            element={
              <PrivateRoute>
                <Mensagens />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route
            path="/meus-servicos"
            element={
              <PrivateRoute>
                <MeusServicos />
              </PrivateRoute>
            }
          />
          <Route
            path="/servicos-contratados"
            element={
              <PrivateRoute>
                <ServicosContratados />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;
