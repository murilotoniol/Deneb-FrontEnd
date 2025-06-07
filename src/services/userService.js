import { db } from "../services/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const userService = {
  // Buscar informações de um usuário
  async getUserInfo(userId) {
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", userId));

      if (!userDoc.exists()) {
        return {
          id: userId,
          name: "Usuário não encontrado",
          avatar: null,
          online: false,
        };
      }

      const userData = userDoc.data();
      return {
        id: userId,
        name: `${userData.first_name} ${userData.last_name}`,
        avatar: userData.avatar_url,
        online: userData.online || false,
      };
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
      return {
        id: userId,
        name: "Erro ao carregar usuário",
        avatar: null,
        online: false,
      };
    }
  },

  // Atualizar status online/offline do usuário
  async updateUserStatus(userId, isOnline) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        online: isOnline,
        lastSeen: new Date(),
      });
    } catch (error) {
      console.error("Erro ao atualizar status do usuário:", error);
    }
  },

  // Atualizar informações do perfil do usuário
  async updateUserProfile(userId, profileData) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        ...profileData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil do usuário:", error);
      throw error;
    }
  },

  // Criar novo usuário no Firestore após registro
  async createUserProfile(userId, userData) {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        ...userData,
        online: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Erro ao criar perfil do usuário:", error);
      throw error;
    }
  },
};
