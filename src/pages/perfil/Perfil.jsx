import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../services/AuthContext";
import { userService } from "../../services/userService";
import "./perfil.css";
import pawProfile from "../../assets/paw-profile.png";
import { getAuth, deleteUser } from "firebase/auth";

export default function Perfil() {
  const { user, loading: authLoading } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
      const reader = new FileReader();
      reader.onloadend = async () => {
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

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      // 1. Deletar do Firestore
      const firestoreResult = await userService.deleteUserFirestore(user.uid);
      if (!firestoreResult.success) throw new Error(firestoreResult.error);
      // 2. Deletar do Auth
      const auth = getAuth();
      await deleteUser(auth.currentUser);
      setDeleteSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setDeleteError(err.message || "Erro ao excluir conta.");
    } finally {
      setDeleteLoading(false);
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
          <p><b>Nome:</b> {userInfo.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <div style={{ display: 'flex', gap: 16, margin: '16px 0 0 0', width: '100%', justifyContent: 'center' }}>
            <button
              className="perfil-password-btn"
              style={{ background: '#42a5f6', color: 'white', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => alert('Funcionalidade em desenvolvimento')}
            >
              Alterar senha
            </button>
            <button
              className="perfil-delete-btn"
              style={{ background: '#dc3545', color: 'white', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setShowDeleteModal(true)}
              disabled={deleteLoading}
            >
              Excluir Conta
            </button>
          </div>
          {userInfo.phone_number && <p><b>Telefone:</b> {userInfo.phone_number}</p>}
          {userInfo.birth_date && <p><b>Data de nascimento:</b> {userInfo.birth_date}</p>}
        </div>
      </div>

      {/* Modal de confirmação */}
      {showDeleteModal && (
        <div className="perfil-modal-overlay">
          <div className="perfil-modal">
            <h2>Tem certeza que deseja excluir sua conta?</h2>
            <p>Esta ação é <b>irreversível</b> e todos os seus dados serão apagados.</p>
            {deleteError && <p className="perfil-erro">{deleteError}</p>}
            {deleteSuccess ? (
              <p style={{ color: '#198754', fontWeight: 600 }}>Conta excluída com sucesso!</p>
            ) : (
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  style={{ background: '#dc3545', color: 'white', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  {deleteLoading ? 'Excluindo...' : 'Sim, excluir'}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                  style={{ background: '#6c757d', color: 'white', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
} 