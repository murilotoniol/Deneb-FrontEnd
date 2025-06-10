import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";

export const useGetServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Buscar todas as ofertas de serviço
        const offersQuery = query(collection(db, "service-offer"));
        const offersSnapshot = await getDocs(offersQuery);

        // Array para armazenar as promessas de busca dos serviços base
        const servicesPromises = offersSnapshot.docs.map(async (offerDoc) => {
          try {
            const offerData = offerDoc.data();

            // Verificar se offerData e service_id existem
            if (!offerData || !offerData.service_id) {
              console.error("Oferta sem service_id:", offerDoc.id);
              return null;
            }

            // Buscar o serviço base correspondente
            const serviceDoc = await getDoc(
              doc(db, "services", offerData.service_id)
            );

            // Verificar se o documento do serviço existe e tem dados
            if (!serviceDoc.exists()) {
              console.error(
                "Serviço base não encontrado:",
                offerData.service_id
              );
              return null;
            }

            const serviceData = serviceDoc.data();

            // Verificar se serviceData tem todas as propriedades necessárias
            if (
              !serviceData ||
              !serviceData.name ||
              !serviceData.description ||
              !serviceData.animalType
            ) {
              console.error(
                "Dados do serviço base incompletos:",
                offerData.service_id
              );
              return null;
            }

            // Combinar os dados do serviço base com os dados da oferta
            return {
              id: offerDoc.id,
              title: serviceData.name,
              description: serviceData.description,
              type: serviceData.animalType,
              price: offerData.price || 0, // Valor padrão caso price não exista
              user_id: offerData.user_id,
              created_at: offerData.created_at,
              service_id: offerData.service_id, // Adicionando service_id para referência
            };
          } catch (err) {
            console.error("Erro ao processar serviço:", err);
            return null;
          }
        });

        // Aguardar todas as promessas serem resolvidas
        const servicesData = await Promise.all(servicesPromises);

        // Filtrar resultados null e undefined
        const validServices = servicesData.filter(
          (service) => service !== null
        );

        setServices(validServices);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
        setError(err.message || "Erro ao carregar os serviços");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};
