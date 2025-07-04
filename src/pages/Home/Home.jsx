import React from 'react';
import { PawPrint, Search, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../services/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, userData, loading } = useAuth();

  const goToOfertarServico = () => {
    navigate('/ofertaservico');
  };

  const goToProcurarServico = () => {
    navigate('/procurarservicos');
  };

  if (loading) {
    return (
      <main
        className="home-main"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <p>Carregando...</p>
      </main>
    );
  }

  return (
    <main
      className="home-main"
      style={{ minHeight: '130vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <div style={{ flex: 1, width: '100%' }}>
        <section className="hero-section">
          <div className="hero-content">
            <motion.h1
              className="home-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Encontre ou Ofereça <br /> Serviços para Pets
            </motion.h1>
            <p className="home-subtitle">
              Conectando cuidadores e donos de animais com facilidade e carinho.
            </p>
            <div className="home-buttons">
              <button
                className="btn-primary"
                type="button"
                onClick={goToProcurarServico}
              >
                <Search className="icon" /> Buscar Serviços
              </button>
              <button
                className="btn-outline"
                type="button"
                onClick={goToOfertarServico}
              >
                <PawPrint className="icon" /> Oferecer Serviço
              </button>
            </div>
          </div>
        </section>
        <section className="cards-container">
          <div className="card">
            <Heart className="card-icon" />
            <h3>Cuidadores Verificados</h3>
            <p>
              Todos os profissionais passam por uma verificação rigorosa para
              garantir o melhor para seu pet.
            </p>
          </div>
          <div className="card">
            <Search className="card-icon" />
            <h3>Busca Personalizada</h3>
            <p>
              Filtre por localização, tipo de animal, e serviço desejado para
              encontrar o cuidador ideal.
            </p>
          </div>
          <div className="card">
            <PawPrint className="card-icon" />
            <h3>Amor pelos Animais</h3>
            <p>
              Nossa missão é garantir que cada pet receba cuidado, atenção e
              muito carinho.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
