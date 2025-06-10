import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
  getDocs,
  writeBatch,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

/**
 * Cria ou obtém um chat entre dois usuários
 * @param {string} userId1 - ID do primeiro usuário
 * @param {string} userId2 - ID do segundo usuário
 * @param {Object} serviceInfo - Informações adicionais do serviço (opcional)
 * @returns {Promise<string>} ID do chat
 */
export const createOrGetChat = async (userId1, userId2, serviceInfo = null) => {
  try {
    console.log('Iniciando createOrGetChat com parâmetros:', {
      userId1,
      userId2,
      hasServiceInfo: !!serviceInfo,
    });

    // Validações iniciais
    if (!userId1 || !userId2) {
      throw new Error('IDs de usuário são obrigatórios');
    }

    if (userId1 === userId2) {
      throw new Error('Não é possível criar chat com o mesmo usuário');
    }

    // Cria um ID consistente ordenando os IDs dos usuários
    const chatId = [userId1, userId2].sort().join('_');
    console.log('ID do chat gerado:', chatId);

    // Verificar se o db está inicializado
    if (!db) {
      throw new Error('Firestore não foi inicializado corretamente');
    }

    const chatRef = doc(db, 'chats', chatId);
    console.log('Referência do chat criada:', chatRef.path);

    const chatSnap = await getDoc(chatRef);
    console.log('Snapshot do chat obtido:', chatSnap.exists());

    if (!chatSnap.exists()) {
      console.log(
        'Chat não existe, buscando dados dos usuários para criar novo chat'
      );

      // Buscar informações dos usuários
      const [user1Doc, user2Doc] = await Promise.all([
        getDoc(doc(db, 'users', userId1)),
        getDoc(doc(db, 'users', userId2)),
      ]);

      if (!user1Doc.exists()) {
        console.error('Usuário 1 não encontrado:', userId1);
        throw new Error(`Usuário não encontrado: ${userId1}`);
      }

      if (!user2Doc.exists()) {
        console.error('Usuário 2 não encontrado:', userId2);
        throw new Error(`Usuário não encontrado: ${userId2}`);
      }

      const user1Data = user1Doc.data();
      const user2Data = user2Doc.data();

      console.log('Dados dos usuários obtidos com sucesso:', {
        user1: { id: userId1, hasData: !!user1Data },
        user2: { id: userId2, hasData: !!user2Data },
      });

      // Remover campos que possam causar problemas
      const sanitizedServiceInfo = serviceInfo
        ? {
            serviceId: serviceInfo.serviceId,
            serviceTitle: serviceInfo.serviceTitle,
            serviceName: serviceInfo.serviceName,
            serviceType: serviceInfo.serviceType,
            servicePrice: Number(serviceInfo.servicePrice),
            providerName: serviceInfo.providerName,
          }
        : null;

      const chatData = {
        participants: {
          [userId1]: true,
          [userId2]: true,
        },
        participantsInfo: {
          [userId1]: {
            name:
              `${user1Data?.first_name || ''} ${
                user1Data?.last_name || ''
              }`.trim() || 'Usuário',
            avatar: user1Data?.avatar_url || null,
          },
          [userId2]: {
            name:
              `${user2Data?.first_name || ''} ${
                user2Data?.last_name || ''
              }`.trim() || 'Usuário',
            avatar: user2Data?.avatar_url || null,
          },
        },
        lastMessage: '',
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        serviceInfo: sanitizedServiceInfo,
      };

      console.log('Tentando criar documento de chat com estrutura:', {
        participants: chatData.participants,
        participantsInfo: chatData.participantsInfo,
        lastMessage: chatData.lastMessage,
        hasServiceInfo: !!chatData.serviceInfo,
        serviceInfo: chatData.serviceInfo,
      });

      try {
        await setDoc(chatRef, chatData);
        console.log('Chat criado com sucesso');
      } catch (setDocError) {
        console.error('Erro ao criar documento do chat:', {
          error: setDocError.toString(),
          code: setDocError.code,
          message: setDocError.message,
          stack: setDocError.stack,
          chatData: JSON.stringify(chatData),
        });
        throw setDocError;
      }
    } else {
      console.log('Chat já existe:', chatId);

      if (serviceInfo) {
        // Sanitizar serviceInfo mesmo para atualização
        const sanitizedServiceInfo = {
          serviceId: serviceInfo.serviceId,
          serviceTitle: serviceInfo.serviceTitle,
          serviceName: serviceInfo.serviceName,
          serviceType: serviceInfo.serviceType,
          servicePrice: Number(serviceInfo.servicePrice),
          providerName: serviceInfo.providerName,
        };

        console.log(
          'Atualizando informações do serviço:',
          sanitizedServiceInfo
        );

        try {
          const updateData = {
            serviceInfo: sanitizedServiceInfo,
            updatedAt: serverTimestamp(),
          };

          console.log('Dados de atualização:', updateData);

          await updateDoc(chatRef, updateData);
          console.log('Informações do serviço atualizadas com sucesso');
        } catch (updateError) {
          console.error('Erro ao atualizar informações do serviço:', {
            error: updateError.toString(),
            code: updateError.code,
            message: updateError.message,
            stack: updateError.stack,
            chatId,
            serviceInfo: sanitizedServiceInfo,
          });
          throw updateError;
        }
      }
    }

    return chatId;
  } catch (error) {
    console.error('Erro detalhado em createOrGetChat:', {
      error: error.toString(),
      code: error.code,
      message: error.message,
      stack: error.stack,
      params: {
        userId1,
        userId2,
        hasServiceInfo: !!serviceInfo,
        chatId: [userId1, userId2].sort().join('_'),
      },
    });
    throw error;
  }
};

/**
 * Envia uma mensagem para um chat
 * @param {string} chatId - ID do chat
 * @param {string} senderId - ID do remetente
 * @param {string} text - Texto da mensagem
 */
export const sendMessage = async (chatId, senderId, text) => {
  try {
    console.log('Enviando mensagem para chat:', chatId);
    const messagesRef = collection(db, 'chats', chatId, 'messages');

    // Adiciona a mensagem à subcoleção messages
    await addDoc(messagesRef, {
      senderId,
      text,
      timestamp: Timestamp.now(),
      status: 'sent', // Status da mensagem: sent, delivered, read
    });

    // Atualiza as informações do chat principal
    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: text,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};

/**
 * Escuta as mensagens de um chat em tempo real
 * @param {string} chatId - ID do chat
 * @param {Function} callback - Função chamada quando há mudanças
 * @returns {Function} Função para cancelar a escuta
 */
export const listenToMessages = (chatId, callback) => {
  console.log('Iniciando escuta de mensagens para chat:', chatId);
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc')
  );

  const unsubscribe = onSnapshot(
    q,
    snapshot => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Converte o timestamp do Firestore para string ISO
        timestamp:
          doc.data().timestamp?.toDate().toISOString() ||
          new Date().toISOString(),
      }));
      callback(messages);
    },
    error => {
      console.error('Erro ao escutar mensagens:', error);
    }
  );

  return unsubscribe;
};

/**
 * Obtém a lista de chats de um usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise<Array>} Lista de chats
 */
export const getUserChats = async userId => {
  try {
    console.log('Buscando chats do usuário:', userId);
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where(`participants.${userId}`, '==', true));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Erro ao buscar chats do usuário:', error);
    throw error;
  }
};

/**
 * Marca uma mensagem como lida
 * @param {string} chatId - ID do chat
 * @param {string} messageId - ID da mensagem
 */
export const markMessageAsRead = async (chatId, messageId) => {
  try {
    const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
    await updateDoc(messageRef, {
      status: 'read',
      readAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Erro ao marcar mensagem como lida:', error);
    throw error;
  }
};

/**
 * Escuta as atualizações de um chat específico
 * @param {string} chatId - ID do chat
 * @param {Function} callback - Função chamada quando há mudanças
 * @returns {Function} Função para cancelar a escuta
 */
export const listenToChatUpdates = (chatId, callback) => {
  const chatRef = doc(db, 'chats', chatId);

  return onSnapshot(
    chatRef,
    doc => {
      if (doc.exists()) {
        callback({
          id: doc.id,
          ...doc.data(),
        });
      }
    },
    error => {
      console.error('Erro ao escutar atualizações do chat:', error);
    }
  );
};

// Exporta todas as funções como um objeto
export const chatService = {
  createOrGetChat,
  sendMessage,
  listenToMessages,
  getUserChats,
  markMessageAsRead,
  listenToChatUpdates,
};
