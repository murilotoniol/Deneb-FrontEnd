import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Criar o contexto
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("AuthProvider: Iniciando verificação de autenticação");
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("AuthProvider: Estado de autenticação mudou", {
        currentUser: !!currentUser,
      });

      try {
        if (currentUser) {
          console.log(
            "AuthProvider: Usuário autenticado, buscando dados adicionais"
          );
          setUser(currentUser);

          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            console.log(
              "AuthProvider: Dados do usuário encontrados no Firestore"
            );
            setUserData({
              ...userDoc.data(),
              id: currentUser.uid,
            });
          } else {
            console.log("AuthProvider: Dados básicos do usuário definidos");
            setUserData({
              id: currentUser.uid,
              email: currentUser.email,
            });
          }
        } else {
          console.log("AuthProvider: Usuário não autenticado");
          setUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.error("AuthProvider: Erro ao processar autenticação", error);
        setError(error.message);
      } finally {
        console.log("AuthProvider: Finalizando verificação de autenticação");
        setLoading(false);
      }
    });

    return () => {
      console.log("AuthProvider: Limpando listener de autenticação");
      unsubscribe();
    };
  }, []);

  // Verifica se o token do usuário está válido
  useEffect(() => {
    const checkToken = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        console.log("AuthProvider: Token do usuário válido");
      } catch (error) {
        console.error("AuthProvider: Erro ao verificar token", error);
        // Se houver erro no token, força um refresh da autenticação
        const auth = getAuth();
        auth.signOut().then(() => {
          window.location.href = "/login";
        });
      }
    };

    checkToken();
  }, [user]);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  const value = {
    user,
    userData,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
