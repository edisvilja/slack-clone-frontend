"use client"

import React, { useEffect, useRef, useState } from 'react';
import useChatMessages from '@/hooks/useChatMessages';
import useNotifications from '@/hooks/useNotifications';
import useUserStatus from '@/hooks/useUserStatus';
import { useAppState } from './app-provider';

const WebSocketProvider = ({ children }) => {
  const { currentWorkspace } = useAppState();
  const wsRef = useRef(null);
  const reconnectAttempts = useRef(0); // Anzahl der Verbindungsversuche
  const reconnectTimeout = useRef(null); // Referenz für den Timeout

  const connectWebSocket = () => {
    if (!currentWorkspace) return;

    // Schließe alte WebSocket-Verbindung, wenn vorhanden
    if (wsRef.current) {
      wsRef.current.close();
    }

    // Neue WebSocket-Verbindung erstellen
    wsRef.current = new WebSocket(`ws://localhost:3001/${currentWorkspace}`);
    
    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      reconnectAttempts.current = 0; // Zurücksetzen der Verbindungsversuche bei erfolgreicher Verbindung
    };

    // Event: Verbindung geschlossen
    wsRef.current.onclose = () => {
      console.log('WebSocket closed');
      handleReconnect();
    };

    // Event: Fehler aufgetreten
    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      wsRef.current.close();
    };
  };

  const handleReconnect = () => {
    if (reconnectAttempts.current < 5) { // Maximal 5 Versuche
      const timeout = Math.min(1000 * (2 ** reconnectAttempts.current), 30000); // Exponentielles Backoff bis 30s
      reconnectTimeout.current = setTimeout(() => {
        reconnectAttempts.current += 1;
        console.log(`Reconnecting... Attempt ${reconnectAttempts.current}`);
        connectWebSocket();
      }, timeout);
    } else {
      console.error('Max reconnection attempts reached.');
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [currentWorkspace]);

  useChatMessages(wsRef.current);
  useNotifications(wsRef.current);
  useUserStatus(wsRef.current);

  return <>{children}</>;
};

export default WebSocketProvider;