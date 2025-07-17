import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "./useAuth";

export function useWebSocket() {
  const { user } = useAuth();
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    if (!user?.id) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      // Authenticate with user ID
      ws.send(JSON.stringify({
        type: 'auth',
        userId: user.id
      }));
    };

    ws.onmessage = (event) => {
      try {
        console.log('=== RAW WEBSOCKET MESSAGE RECEIVED ===');
        console.log('Raw event data:', event.data);
        
        const data = JSON.parse(event.data);
        console.log('Parsed WebSocket data:', data);
        console.log('Message type:', data.type);
        
        if (data.type === 'match_started_character_intro_sequence') {
          console.log('CHARACTER SEQUENCE MESSAGE RECEIVED!');
          console.log('Characters in message:', data.characters?.length || 0);
          console.log('Characters:', data.characters?.map(c => c.name) || []);
        }
        
        setLastMessage(data);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
        console.error('Raw message that failed to parse:', event.data);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [user?.id]); // Only depend on user.id, not the entire user object

  const sendMessage = useCallback((message: any) => {
    console.log('sendMessage called with:', message);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is open, sending message');
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.log('WebSocket is not open, readyState:', wsRef.current?.readyState);
    }
  }, []);

  return {
    isConnected,
    lastMessage,
    sendMessage
  };
}
