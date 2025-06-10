import { useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from './useAuth';

export const usePresence = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;

    // Marca o usuário como online
    userService.updateUserStatus(user.uid, true);

    // Configura listeners para mudanças no estado de conexão
    const onOnline = () => userService.updateUserStatus(user.uid, true);
    const onOffline = () => userService.updateUserStatus(user.uid, false);

    // Configura listener para quando o usuário fecha a página
    const onBeforeUnload = () => userService.updateUserStatus(user.uid, false);

    // Adiciona os listeners
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    window.addEventListener('beforeunload', onBeforeUnload);

    // Cleanup function
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('beforeunload', onBeforeUnload);
      userService.updateUserStatus(user.uid, false);
    };
  }, [user?.uid]);
};
