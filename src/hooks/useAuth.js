import { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const registerWithEmail = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = userCredential.user;

      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        first_name: userData.first_name,
        last_name: userData.last_name,
        cpf: userData.cpf,
        phone_number: userData.phone_number,
        birth_date: userData.birth_date,
        email: user.email,
      });

      return { success: true, userId: user.uid };
    } catch (error) {
      let errorMessage = "Ocorreu um erro durante o cadastro.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este e-mail já está em uso.";
          break;
        case "auth/invalid-email":
          errorMessage = "E-mail inválido.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Operação não permitida.";
          break;
        case "auth/weak-password":
          errorMessage = "A senha é muito fraca.";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, userId: userCredential.user.uid };
    } catch (error) {
      let errorMessage = "Erro ao fazer login.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Usuário não encontrado.";
          break;
        case "auth/wrong-password":
          errorMessage = "Senha incorreta.";
          break;
        case "auth/invalid-email":
          errorMessage = "Email inválido.";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      let errorMessage = "Erro ao enviar email de recuperação de senha.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Não existe uma conta com este email.";
          break;
        case "auth/invalid-email":
          errorMessage = "Email inválido.";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      setError("Erro ao fazer logout.");
      return { success: false, error: "Erro ao fazer logout." };
    }
  };

  return {
    user,
    userData,
    loading,
    error,
    initialized,
    isAuthenticated: !!user,
    registerWithEmail,
    loginWithEmail,
    resetPassword,
    logout,
  };
};
