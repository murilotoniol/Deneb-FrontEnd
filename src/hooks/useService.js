// src/hooks/useService.js

import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
// import { validateService } from "../utils/validateService"; // Removido se a validação for movida para o componente

export const useService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Cria um novo documento de serviço base no Firestore.
   * Este serviço base contém informações gerais como nome, tipo de animal e descrição.
   *
   * @param {object} serviceData - Os dados do serviço base (name, animalType, description).
   * @returns {Promise<object>} Um objeto com { success: true, serviceId: string } em caso de sucesso, ou { success: false, error: string } em caso de falha.
   */
  const createService = async (serviceData) => {
    setLoading(true);
    setError(null);

    try {
      const db = getFirestore(); // Obtém a instância do Firestore

      // Adiciona um novo documento à coleção "services" (ou o nome que você preferir para serviços base)
      const docRef = await addDoc(collection(db, "services"), {
        name: serviceData.name, // Nome do serviço (ex: "Passeio com Cães")
        animalType: serviceData.animalType, // Tipo de animal (ex: "cachorro", "gato")
        description: serviceData.description, // Descrição geral do serviço
        created_at: serverTimestamp(), // Timestamp do servidor
      });

      console.log("Serviço base adicionado com ID: ", docRef.id);
      return { success: true, serviceId: docRef.id }; // Retorna o ID do serviço criado
    } catch (err) {
      const message = err.message || "Erro ao cadastrar o serviço base.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    createService,
    loading,
    error,
  };
};
