import { useEffect } from 'react';
import { useAppState } from '@/providers/app-provider';

const useUserStatus = (ws) => {
  const { updateUserStatus } = useAppState(); // Beispiel: updateUserStatus ist eine Methode, die du definierst

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'USER_STATUS') {
        updateUserStatus(message.data);
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws]);
};

export default useUserStatus;