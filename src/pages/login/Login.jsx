import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import RecuperarSenha from "../recuperarSenha/RecuperarSenha";
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const navigate = useNavigate();
  const { loading, loginWithEmail, signInWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Por favor, preencha todos os campos");
      setMessageType("error");
      return;
    }

    const result = await loginWithEmail(email, password);
    if (result.success) {
      setMessage("Login realizado com sucesso!");
      setMessageType("success");
      navigate("/");
    } else {
      setMessage(result.error);
      setMessageType("error");
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      navigate("/");
    } else {
      setMessage(result.error);
      setMessageType("error");
    }
  };

  return (
    <main>
      <div className="formulario">
        <form className="forms" onSubmit={handleLogin}>
          <h1>Entrar</h1>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
              aria-required="true"
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Senha"
              aria-required="true"
            />
          </div>

          {message && <ErrorMessage message={message} type={messageType} />}

          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembrar de mim
            </label>
            <Link
              to="/recuperar-senha"
              className="forget-password-link"
              aria-label="Recuperar senha"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
            aria-label={loading ? "Entrando..." : "Entrar"}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="google-button"
            aria-label="Entrar com Google"
          >
            Entrar com Google
          </button>

          <div className="signup-link">
            <p>
              Não tem uma conta?{" "}
              <Link to="/registrar" aria-label="Criar conta">
                Registrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
