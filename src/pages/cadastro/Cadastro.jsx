import React, { useState } from "react";
import "../cadastro/Cadastro.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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
    <div className="cadastro-container">
      <Header />
      <div className="cadastro">
        <form className="formularioCadastro">
          <h1>Cadastro</h1>
          <h2>Preencha os dados abaixo:</h2>

          <input
            type="text"
            name="first_name"
            placeholder="Nome"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Sobrenome"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Telefone"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <input
            type="text"
            name="birth_date"
            placeholder="Data de Nascimento"
            value={formData.birth_date}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="button" onClick={handleRegister} disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="google-button"
          >
            Entrar com Google
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
