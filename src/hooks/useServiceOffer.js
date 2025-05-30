// src/hooks/useServiceOffer.js

import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "../services/firebase"; // Importa a instância de autenticação do Firebase
// import { validateServiceOffer } from "../utils/validateServiceOffer"; // Removido se a validação for movida para o componente

export const useServiceOffer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Cria um novo documento de oferta de serviço no Firestore.
   * Esta oferta vincula um usuário provedor a um serviço base existente e define um preço.
   *
   * @param {object} offerData - Os dados da oferta (service_id, price).
   * @param {string} userId - O UID do usuário que está criando a oferta.
   * @returns {Promise<object>} Um objeto com { success: true } em caso de sucesso, ou { success: false, error: string } em caso de falha.
   */
  const createServiceOffer = async (offerData, userId) => {
    setLoading(true);
    setError(null);

    try {
      const db = getFirestore(); // Obtém a instância do Firestore
      const user = auth.currentUser; // Obtém o usuário atualmente autenticado

      // Verifica se há um usuário autenticado e se o userId passado corresponde.
      // Esta é uma verificação de segurança essencial.
      if (!user || user.uid !== userId) {
        throw new Error("Usuário não autenticado ou ID de usuário inválido.");
      }

      // Adiciona um novo documento à coleção "service-offer" no Firestore.
      // Agora, ele referencia o serviço base pelo service_id.
      await addDoc(collection(db, "service-offer"), {
        user_id: userId, // ID do usuário que está criando a oferta
        service_id: offerData.service_id, // ID do serviço base (do useService)
        price: Number(offerData.price), // Garante que o preço seja um número
        created_at: serverTimestamp(), // Timestamp do servidor
      });

      return { success: true };
    } catch (err) {
      const message =
        err.message || "Erro desconhecido ao cadastrar a oferta de serviço.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    createServiceOffer,
    loading,
    error,
  };
};
