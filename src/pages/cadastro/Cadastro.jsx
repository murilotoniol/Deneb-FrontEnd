import React, { useState } from "react";
import "../cadastro/Cadastro.css";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    birth_date: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    const { email, password, first_name, last_name, phone_number, birth_date } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        first_name,
        last_name,
        phone_number,
        birth_date,
        email: user.email,
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError("Erro ao registrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Login com Google realizado com sucesso!");
    } catch (error) {
      console.log("Erro no login com Google:", error);
    }
  };

  return (
    <div className="cadastro-container">
      <Header />
      <div className="cadastro">
        <form className="formularioCadastro">
          <h1>Cadastro</h1>
          <h2>Preencha os dados abaixo:</h2>

          <input type="text" name="first_name" placeholder="Nome" value={formData.first_name} onChange={handleChange} />
          <input type="text" name="last_name" placeholder="Sobrenome" value={formData.last_name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="phone_number" placeholder="Telefone" value={formData.phone_number} onChange={handleChange} />
          <input type="text" name="birth_date" placeholder="Data de Nascimento" value={formData.birth_date} onChange={handleChange} />
          <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} />

          {error && <p className="error-message">{error}</p>}

          <button type="button" onClick={handleRegister} disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>

          <button type="button" onClick={signInWithGoogle} className="google-button">
            Entrar com Google
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
