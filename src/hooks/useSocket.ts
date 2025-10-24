import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Message {
  _id: string | number;
  from: string;
  to: string;
  content: string;
  createdAt: string;
  type?: 'user' | 'bot' | 'system';
}

interface UseSocketProps {
  serverUrl?: string;
  userId?: string;
  autoConnect?: boolean;
}

interface SocketState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
}

export const useSocket = ({ 
  serverUrl = 'https://portfolio-backend-daeg.onrender.com', 
  userId,
  autoConnect = false 
}: UseSocketProps = {}) => {
  const socketRef = useRef<Socket | null>(null);
  const [socketState, setSocketState] = useState<SocketState>({
    connected: false,
    connecting: false,
    error: null
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const connect = useCallback((connectUserId?: string) => {
    const finalUserId = connectUserId || userId;
    
    if (socketRef.current?.connected) {
      console.log('Socket already connected');
      return;
    }

    if (!finalUserId) {
      setSocketState(prev => ({ ...prev, error: 'User ID is required' }));
      return;
    }

    setSocketState(prev => ({ ...prev, connecting: true, error: null }));

    try {
      const socket = io(serverUrl, {
        query: { userId: finalUserId },
        transports: ['websocket', 'polling']
      });

      socketRef.current = socket;


      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        setSocketState({
          connected: true,
          connecting: false,
          error: null
        });
        
        // Add a welcoming bot message
        const welcomeMessage: Message = {
          _id: Date.now(),
          from: 'bot',
          to: finalUserId,
          content: `🎉 Welcome! I'm your AI assistant and I'm here to help you learn more about Youcef's work and experience.\n\nYou can ask me about:\n• His technical skills and projects\n• Work experience and background\n• Any specific technologies he uses\n• How to get in touch\n\nWhat would you like to know?`,
          createdAt: new Date().toISOString(),
          type: 'bot'
        };
        setMessages(prev => [...prev, welcomeMessage]);
      });

      socket.on('disconnect', (reason: string) => {
        console.log('Socket disconnected:', reason);
        setSocketState({
          connected: false,
          connecting: false,
          error: `Disconnected: ${reason}`
        });
        
        // Add system message
        const systemMessage: Message = {
          _id: Date.now(),
          from: 'system',
          to: finalUserId,
          content: '❌ Disconnected from server',
          createdAt: new Date().toISOString(),
          type: 'system'
        };
        setMessages(prev => [...prev, systemMessage]);
      });

      socket.on('connect_error', (error: any) => {
        console.error('Socket connection error:', error);
        setSocketState({
          connected: false,
          connecting: false,
          error: error.message
        });
      });

      socket.on('newMessage', (message: Message) => {
        console.log('Received message:', message);
        setMessages(prev => [...prev, { ...message, type: 'bot' }]);
      });


      socket.on('userOnline', (userId: string) => {
        setOnlineUsers(prev => [...new Set([...prev, userId])]);
        const systemMessage: Message = {
          _id: Date.now(),
          from: 'system',
          to: finalUserId,
          content: `User ${userId} came online`,
          createdAt: new Date().toISOString(),
          type: 'system'
        };
        setMessages(prev => [...prev, systemMessage]);
      });

      socket.on('userOffline', (userId: string) => {
        setOnlineUsers(prev => prev.filter(id => id !== userId));
        const systemMessage: Message = {
          _id: Date.now(),
          from: 'system',
          to: finalUserId,
          content: `User ${userId} went offline`,
          createdAt: new Date().toISOString(),
          type: 'system'
        };
        setMessages(prev => [...prev, systemMessage]);
      });

      // Typing events
      socket.on('userTyping', ({ from }: { from: string }) => {
        setTypingUsers(prev => [...new Set([...prev, from])]);
      });

      socket.on('userStoppedTyping', ({ from }: { from: string }) => {
        setTypingUsers(prev => prev.filter(id => id !== from));
      });

    } catch (error) {
      console.error('Socket connection failed:', error);
      setSocketState({
        connected: false,
        connecting: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      });
    }
  }, [serverUrl, userId]);


  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocketState({
        connected: false,
        connecting: false,
        error: null
      });
    }
  }, []);

  
  const sendMessage = useCallback(async (content: string, targetUserId: string = 'bot') => {
    if (!content.trim() || !socketRef.current?.connected) {
      return false;
    }

    const currentUserId = userId || 'anonymous';
    
    const userMessage: Message = {
      _id: Date.now(),
      from: currentUserId,
      to: targetUserId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      type: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {

      const response = await fetch('http://localhost:3001/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: currentUserId,
          to: targetUserId,
          content: content.trim()
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      console.log('Message sent successfully:', data);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      

      const errorMessage: Message = {
        _id: Date.now() + 1,
        from: 'system',
        to: currentUserId,
        content: `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`,
        createdAt: new Date().toISOString(),
        type: 'system'
      };
      setMessages(prev => [...prev, errorMessage]);
      return false;
    }
  }, [userId]);


  const startTyping = useCallback((targetUserId: string = 'bot') => {
    if (socketRef.current?.connected && userId) {
      socketRef.current.emit('typing', { to: targetUserId, from: userId });
    }
  }, [userId]);

  const stopTyping = useCallback((targetUserId: string = 'bot') => {
    if (socketRef.current?.connected && userId) {
      socketRef.current.emit('stopTyping', { to: targetUserId, from: userId });
    }
  }, [userId]);


  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    if (autoConnect && userId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, userId, connect, disconnect]);

  return {
    ...socketState,
    messages,
    onlineUsers,
    typingUsers,

    connect,
    disconnect,
    sendMessage,
    startTyping,
    stopTyping,
    clearMessages,
    
    socket: socketRef.current
  };
};