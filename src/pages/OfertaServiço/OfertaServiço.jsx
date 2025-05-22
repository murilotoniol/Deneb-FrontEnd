import React from "react";
import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";
import "./OfertaServiço.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function OfertaServiço() {
  return (
    <div className="register-container">
      <Header />
      <div className="register-content">
        <div className="register-form-container">
          <motion.h1
            className="register-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="register-line-1">Ofereça</span>
            <span className="register-line-2">seu Serviço para Pets</span>
          </motion.h1>

          <form className="register-form">
            <label>
              Nome do Serviço
              <input type="text" placeholder="Ex: Passeio com cães" required />
            </label>

            <label>
              Tipo de Animal
              <select required>
                <option value="">Selecione</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outros">Outros</option>
              </select>
            </label>

            <label>
              Descrição
              <textarea placeholder="Descreva o serviço oferecido..." required />
            </label>

            <label>
              Valor (R$)
              <input type="number" step="0.01" placeholder="Ex: 50.00" required />
            </label>

            <button type="submit" className="btn-primary">
              <PawPrint className="icon" />
              Cadastrar Serviço
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
