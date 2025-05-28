import React, { useState } from "react";
import "../cadastro/Cadastro.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  validateCPF,
  validatePhone,
  validatePassword,
  validateDate,
} from "../../utils/validation.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function Cadastro() {
  const navigate = useNavigate();
  const { loading, error: authError, registerWithEmail } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    cpf: "",
    phone_number: "",
    birth_date: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = "Nome é obrigatório";
    }

    if (!formData.last_name.trim()) {
      errors.last_name = "Sobrenome é obrigatório";
    }

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    if (!validateCPF(formData.cpf)) {
      errors.cpf = "CPF inválido";
    }

    if (!validatePhone(formData.phone_number)) {
      errors.phone_number = "Telefone inválido";
    }

    if (!validateDate(formData.birth_date)) {
      errors.birth_date = "Data de nascimento inválida";
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password =
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const result = await registerWithEmail(formData);
      if (result.success) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="cadastro">
      <form className="formularioCadastro" onSubmit={handleRegister}>
        <h1>Cadastro</h1>
        <h2>Preencha os dados abaixo:</h2>

        <div className="form-group">
          <label htmlFor="first_name">Nome</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            aria-label="Nome"
            aria-invalid={!!formErrors.first_name}
          />
          {formErrors.first_name && (
            <ErrorMessage message={formErrors.first_name} />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Sobrenome</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            aria-label="Sobrenome"
            aria-invalid={!!formErrors.last_name}
          />
          {formErrors.last_name && (
            <ErrorMessage message={formErrors.last_name} />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-label="Email"
            aria-invalid={!!formErrors.email}
          />
          {formErrors.email && <ErrorMessage message={formErrors.email} />}
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            aria-label="CPF"
            aria-invalid={!!formErrors.cpf}
            placeholder="000.000.000-00"
            maxLength={14}
          />
          {formErrors.cpf && <ErrorMessage message={formErrors.cpf} />}
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Telefone</label>
          <input
            id="phone_number"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            aria-label="Telefone"
            aria-invalid={!!formErrors.phone_number}
            placeholder="(00) 00000-0000"
            maxLength={15}
          />
          {formErrors.phone_number && (
            <ErrorMessage message={formErrors.phone_number} />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="birth_date">Data de Nascimento</label>
          <input
            id="birth_date"
            type="text"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            aria-label="Data de Nascimento"
            aria-invalid={!!formErrors.birth_date}
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />
          {formErrors.birth_date && (
            <ErrorMessage message={formErrors.birth_date} />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            aria-label="Senha"
            aria-invalid={!!formErrors.password}
          />
          {formErrors.password && (
            <ErrorMessage message={formErrors.password} />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme a Senha</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-label="Confirme a Senha"
            aria-invalid={!!formErrors.confirmPassword}
          />
          {formErrors.confirmPassword && (
            <ErrorMessage message={formErrors.confirmPassword} />
          )}
        </div>

        {authError && <ErrorMessage message={authError} type="error" />}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
