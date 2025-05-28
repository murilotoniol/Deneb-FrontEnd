import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./RecuperarSenha.css";

export default function RedefinirSenha() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);
  const [oobCode, setOobCode] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extrair o código de redefinição da URL
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("oobCode");

    if (code) {
      setOobCode(code);
      // Verificar se o código é válido
      verifyCode(code);
    } else {
      setMessage("Link inválido de redefinição de senha.");
      setMessageType("error");
    }
  }, [location]);

  const verifyCode = async (code) => {
    try {
      const auth = getAuth();
      await verifyPasswordResetCode(auth, code);
    } catch (error) {
      setMessage("Este link de redefinição de senha é inválido ou expirou.");
      setMessageType("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Senha alterada com sucesso!");
      setMessageType("success");

      // Redirecionar para o login após alguns segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      let errorMessage = "Erro ao redefinir a senha.";

      switch (error.code) {
        case "auth/expired-action-code":
          errorMessage = "Este link de redefinição de senha expirou.";
          break;
        case "auth/invalid-action-code":
          errorMessage = "Este link de redefinição de senha é inválido.";
          break;
        case "auth/weak-password":
          errorMessage = "A senha é muito fraca. Use pelo menos 6 caracteres.";
          break;
        default:
          errorMessage = error.message;
      }

      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="formulario">
        <form className="forms" onSubmit={handleSubmit}>
          <h1>Redefinir Senha</h1>

          <div className="input-field">
            <label htmlFor="newPassword">Nova Senha</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              aria-label="Nova Senha"
              aria-required="true"
            />
          </div>

          <div className="input-field">
            <label htmlFor="confirmPassword">Confirme a Nova Senha</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="Confirme a Nova Senha"
              aria-required="true"
            />
          </div>

          {message && <ErrorMessage message={message} type={messageType} />}

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>
      </div>
    </main>
  );
}
