import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useAuth } from "../../hooks/useAuth";
import "./RecuperarSenha.css";

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const { loading, error: authError, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Por favor, insira seu email");
      return;
    }

    try {
      await resetPassword(email);
      setMessage(
        "Email de recuperação enviado. Por favor, verifique sua caixa de entrada."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage("Erro ao enviar email de recuperação. Tente novamente.");
    }
  };

  return (
    <main>
      <div className="formulario">
        <div className="forms">
          <h1>Recuperar Senha</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {message && (
              <ErrorMessage
                message={message}
                type={message.includes("enviado") ? "success" : "error"}
              />
            )}
            {authError && <ErrorMessage message={authError} type="error" />}

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>

            <div className="signup-link">
              <p>
                Lembrou sua senha? <a href="/login">Voltar para o login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
