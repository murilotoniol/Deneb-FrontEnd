import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  PawPrint,
  DollarSign,
  MessageCircle,
  ArrowLeft,
  HandshakeIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useAuth } from '../../services/AuthContext';
import { chatService } from '../../services/chatService';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import '../DetalheServico/DetalheServico.css';

export default function DetalhesServico() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const db = getFirestore();

        // Buscar a oferta de serviço
        const offerDoc = await getDoc(doc(db, 'service-offer', serviceId));
        if (!offerDoc.exists()) {
          throw new Error('Serviço não encontrado');
        }

        const offerData = offerDoc.data();

        // Buscar o serviço base
        const serviceDoc = await getDoc(
          doc(db, 'services', offerData.service_id)
        );
        if (!serviceDoc.exists()) {
          throw new Error('Dados do serviço base não encontrados');
        }

        const serviceData = serviceDoc.data();

        // Buscar dados do prestador do serviço
        const providerDoc = await getDoc(doc(db, 'users', offerData.user_id));
        if (providerDoc.exists()) {
          setProvider(providerDoc.data());
        }

        // Combinar os dados
        setService({
          id: offerDoc.id,
          title: serviceData.name,
          description: serviceData.description,
          type: serviceData.animalType,
          price: offerData.price || 0,
          user_id: offerData.user_id,
          created_at: offerData.created_at,
        });

        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar detalhes do serviço:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleMessage = async () => {
    if (!user) {
      alert('Você precisa estar logado para enviar mensagens');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      if (user.uid === service.user_id) {
        alert('Você não pode iniciar um chat com você mesmo.');
        return;
      }

      const chatId = await chatService.createOrGetChat(
        user.uid,
        service.user_id,
        {
          serviceId: service.id,
          serviceTitle: service.title,
          serviceName: service.title,
          serviceType: service.type,
          servicePrice: service.price,
          providerName: provider
            ? `${provider.first_name} ${provider.last_name}`
            : 'Prestador',
          providerAvatar: provider?.avatar_url,
          createdAt: new Date().toISOString(),
        }
      );

      navigate('/mensagens', {
        state: {
          chatInfo: {
            chatId,
            userId: service.user_id,
            name: provider
              ? `${provider.first_name} ${provider.last_name}`
              : 'Prestador',
            avatar: provider?.avatar_url,
            serviceTitle: service.title,
          },
        },
      });
    } catch (error) {
      if (error.code === 'permission-denied') {
        alert('Você precisa fazer login novamente para iniciar o chat.');
        navigate('/login', { state: { from: location.pathname } });
      } else {
        alert(
          'Houve um erro ao iniciar a conversa. Por favor, tente novamente.'
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="details-container">
        <Header />
        <div className="details-content">
          <div className="loading-message">
            <PawPrint className="loading-icon" />
            <p>Carregando detalhes do serviço...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="details-container">
        <Header />
        <div className="details-content">
          <div className="error-message">
            <p>{error || 'Erro ao carregar detalhes do serviço'}</p>
            <button className="btn-outline" onClick={() => navigate(-1)}>
              Voltar
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="details-container">
      <Header />
      <div className="details-content">
        <motion.div
          className="details-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Voltar
          </button>

          <div className="service-header">
            <PawPrint className="service-icon" />
            <h1>{service.title}</h1>
          </div>

          <div className="service-info">
            <div className="info-row">
              <PawPrint className="info-icon" />
              <span>Tipo: {service.type}</span>
            </div>
            <div className="info-row">
              <DollarSign className="info-icon" />
              <span>Preço: R$ {service.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="service-description">
            <h2>Descrição do Serviço</h2>
            <p>{service.description}</p>
          </div>

          {provider && (
            <div className="provider-info">
              <h2>Prestador do Serviço</h2>
              <div className="provider-header">
                <div>
                  <p>
                    {provider.first_name} {provider.last_name}
                  </p>
                  {provider.phone_number && (
                    <p>Telefone: {provider.phone_number}</p>
                  )}
                </div>
                {user?.uid !== service.user_id && (
                  <button
                    className="message-button-small"
                    onClick={handleMessage}
                  >
                    <MessageCircle className="button-icon" />
                    Mensagem
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            className="hire-button"
            disabled={user?.uid === service.user_id}
          >
            {user?.uid === service.user_id
              ? 'Este é seu serviço'
              : 'Quero Contratar'}
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
