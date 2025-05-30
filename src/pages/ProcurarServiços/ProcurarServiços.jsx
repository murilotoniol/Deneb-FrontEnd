import React from "react";
import { MapPin, PawPrint, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ProcurarServiços.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useGetServices } from "../../hooks/useGetServices";

export default function FindService() {
  const { services, loading, error } = useGetServices();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="find-container">
        <Header />
        <div className="find-content">
          <div className="loading-message">
            <PawPrint className="loading-icon" />
            <p>Carregando serviços...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="find-container">
        <Header />
        <div className="find-content">
          <div className="error-message">
            <p>Erro ao carregar serviços: {error}</p>
            <button
              className="btn-outline"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="find-container">
      <Header />
      <div className="find-content">
        <motion.h1
          className="find-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Encontre um Serviço para seu Pet
        </motion.h1>

        <div className="services-grid">
          {services.length === 0 ? (
            <div className="no-services-message">
              <p>Nenhum serviço disponível no momento.</p>
            </div>
          ) : (
            services.map((service) => (
              <motion.div
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="service-header">
                  <PawPrint className="service-icon" />
                  <h3>{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                <div className="service-details">
                  <span>
                    <PawPrint className="detail-icon" />
                    {service.type}
                  </span>
                  <span>
                    <DollarSign className="detail-icon" />
                    R$ {service.price.toFixed(2)}
                  </span>
                </div>
                <button
                  className="btn-outline"
                  onClick={() => navigate(`/servico/${service.id}`)}
                >
                  Ver Detalhes
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
