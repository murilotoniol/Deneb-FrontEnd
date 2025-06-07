import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../services/AuthContext";
import { userService } from "../../services/userService";
import "./perfil.css";
import pawProfile from "../../assets/paw-profile.png";

export default function Perfil() {
  const { user, loading: authLoading } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      userService.getUserInfo(user.uid).then((info) => {
        setUserInfo(info);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      // Simulação de upload: normalmente você usaria Firebase Storage ou similar
      // Aqui vamos usar um FileReader só para simular preview
      const reader = new FileReader();
      reader.onloadend = async () => {
        // Atualizar no Firestore (simulação: salvar base64)
        await userService.updateUserProfile(user.uid, { avatar_url: reader.result });
        setUserInfo((prev) => ({ ...prev, avatar: reader.result }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Erro ao atualizar imagem de perfil.");
      setUploading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="perfil-container">
        <Header />
        <div className="perfil-content">
          <p>Carregando perfil...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="perfil-container">
        <Header />
        <div className="perfil-content">
          <p>Usuário não encontrado.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <Header />
      <div className="perfil-content">
        <div className="perfil-card">
          <div className="perfil-avatar-wrapper">
            <img
              src={
                userInfo.avatar &&
                typeof userInfo.avatar === 'string' &&
                userInfo.avatar.trim() !== '' &&
                userInfo.avatar !== 'null' &&
                userInfo.avatar !== 'undefined'
                  ? userInfo.avatar
                  : pawProfile
              }
              alt="Avatar"
              className="perfil-avatar"
            />
            <button
              className="perfil-avatar-btn"
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
            >
              {uploading ? "Salvando..." : "Alterar imagem"}
            </button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
              disabled={uploading}
            />
            {error && <p className="perfil-erro">{error}</p>}
          </div>
          <h2>{userInfo.name}</h2>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Prestador de serviço:</b> {userInfo.isProvider ? "Sim" : "Não"}</p>
          {userInfo.phone_number && <p><b>Telefone:</b> {userInfo.phone_number}</p>}
          {userInfo.birth_date && <p><b>Data de nascimento:</b> {userInfo.birth_date}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
} 