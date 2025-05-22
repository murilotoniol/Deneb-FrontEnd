import React from "react";
import { MapPin, PawPrint, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import "./ProcurarServiços.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function FindService() {
  const services = [
    {
      id: 1,
      title: "Passeio com Cães",
      description: "Levo seu pet para passear com segurança e diversão.",
      type: "Cachorro",
      price: 40,
      location: "São Paulo, SP",
    },
    {
      id: 2,
      title: "Pet Sitter para Gatos",
      description: "Cuido do seu gatinho no conforto da sua casa.",
      type: "Gato",
      price: 60,
      location: "Belo Horizonte, MG",
    },
    {
      id: 3,
      title: "Banho e Tosa",
      description: "Serviço completo de higiene e beleza para seu pet.",
      type: "Cachorro",
      price: 80,
      location: "Curitiba, PR",
    },
  ];

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
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <PawPrint className="service-icon" />
                <h3>{service.title}</h3>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-details">
                <span>
                  <MapPin className="detail-icon" />
                  {service.location}
                </span>
                <span>
                  <DollarSign className="detail-icon" />
                  R$ {service.price.toFixed(2)}
                </span>
              </div>
              <button className="btn-outline">Ver Detalhes</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
