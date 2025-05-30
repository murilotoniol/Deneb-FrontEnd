// src/pages/OfertaServiço.jsx

import React, { useState, useEffect } from "react";
import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";
import "./OfertaServiço.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useService } from "../../hooks/useService"; // Importe o novo hook useService
import { useServiceOffer } from "../../hooks/useServiceOffer";
import { useAuth } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom"; // Para redirecionar
import { validateServiceOffer } from "../../utils/validateServiceOffer"; // Importe a validação aqui

export default function OfertaServiço() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Hooks para as duas operações
  const {
    createService,
    loading: serviceLoading,
    error: serviceError,
  } = useService();
  const {
    createServiceOffer,
    loading: offerLoading,
    error: offerError,
  } = useServiceOffer();

  // Estado do formulário
  const [form, setForm] = useState({
    name: "", // Nome do serviço base
    animalType: "", // Tipo de animal do serviço base
    description: "", // Descrição do serviço base
    price: "", // Preço da oferta específica
  });

  // Estado para erros de validação no cliente
  const [validationErrors, setValidationErrors] = useState({});

  // Efeito para redirecionar se o usuário não estiver autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Limpa o erro de validação para o campo atual ao digitar
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validação no cliente
    const currentValidationErrors = validateServiceOffer(form); // Use a validação com os dados do formulário
    if (Object.keys(currentValidationErrors).length > 0) {
      setValidationErrors(currentValidationErrors);
      return; // Impede o envio se houver erros de validação
    }

    // 2. Verificação de autenticação (redundante com useEffect, mas bom para segurança imediata)
    if (!user) {
      alert("Você precisa estar logado para oferecer um serviço.");
      navigate("/login");
      return;
    }

    // 3. Criar o serviço base primeiro
    const serviceResult = await createService({
      name: form.name,
      animalType: form.animalType,
      description: form.description,
    });

    if (!serviceResult.success) {
      alert(serviceResult.error || "Erro ao cadastrar o serviço base.");
      return;
    }

    const serviceId = serviceResult.serviceId; // Obtém o ID do serviço base criado

    // 4. Criar a oferta de serviço usando o serviceId e o preço
    const offerResult = await createServiceOffer(
      {
        service_id: serviceId,
        price: form.price,
      },
      user.uid // Passa o UID do usuário autenticado
    );

    if (offerResult.success) {
      alert("Oferta de serviço cadastrada com sucesso!");
      // Limpa o formulário após o sucesso
      setForm({ name: "", animalType: "", description: "", price: "" });
      setValidationErrors({}); // Limpa os erros de validação
    } else {
      alert(offerResult.error || "Erro ao cadastrar a oferta de serviço.");
    }
  };

  // Estado de carregamento geral
  const overallLoading = authLoading || serviceLoading || offerLoading;
  // Erro geral (prioriza erros do hook de oferta, depois do serviço base)
  const overallError = offerError || serviceError;

  // Exibe um estado de carregamento enquanto a autenticação está sendo verificada
  if (authLoading) {
    return (
      <div className="register-container">
        <Header />
        <div className="register-content">
          <p>Verificando autenticação...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Se o usuário não estiver logado após o carregamento, não renderize o formulário
  // (O redirecionamento já acontece no useEffect, mas é bom ter uma fallback)
  if (!user) {
    return null;
  }

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

          <form className="register-form" onSubmit={handleSubmit}>
            <label>
              Nome do Serviço
              <input
                type="text"
                name="name"
                placeholder="Ex: Passeio com cães"
                value={form.name}
                onChange={handleChange}
                required
              />
              {validationErrors.name && (
                <p className="form-error">{validationErrors.name}</p>
              )}
            </label>

            <label>
              Tipo de Animal
              <select
                name="animalType"
                value={form.animalType}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outros">Outros</option>
              </select>
              {validationErrors.animalType && (
                <p className="form-error">{validationErrors.animalType}</p>
              )}
            </label>

            <label>
              Descrição do Serviço Base
              <textarea
                name="description"
                placeholder="Descreva o serviço geral oferecido (ex: 'Passeio de 30 minutos com brincadeiras')."
                value={form.description}
                onChange={handleChange}
                required
              />
              {validationErrors.description && (
                <p className="form-error">{validationErrors.description}</p>
              )}
            </label>

            <label>
              Valor da Oferta (R$)
              <input
                type="number"
                name="price"
                step="0.01"
                placeholder="Ex: 50.00"
                value={form.price}
                onChange={handleChange}
                required
              />
              {validationErrors.price && (
                <p className="form-error">{validationErrors.price}</p>
              )}
            </label>

            <button
              type="submit"
              className="btn-primary"
              disabled={overallLoading}
            >
              <PawPrint className="icon" />
              {overallLoading ? "Salvando..." : "Cadastrar Oferta"}
            </button>
            {overallError && <p className="form-error">{overallError}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
