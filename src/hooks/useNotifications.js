import { useEffect } from 'react';
import { useAppState } from '@/providers/app-provider';

const useNotifications = (ws) => {
  const { addNotification } = useAppState(); // Beispiel: addNotification ist eine Methode, die du definierst

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'NOTIFICATION') {
        addNotification(message.data);
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws]);
};

export default useNotifications;