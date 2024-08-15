import { useAppState } from '@/providers/app-provider';
import { useEffect } from 'react';

const useChatMessages = (ws) => {
  const { addMessage } = useAppState();

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'NEW_MESSAGE') {
        //addMessage(message.data);
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws]);
};

export default useChatMessages;