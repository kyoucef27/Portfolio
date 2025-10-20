"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Wifi, WifiOff, Maximize2, Minimize2 } from "lucide-react";
import { useSocket, Message } from "@/hooks";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [userId] = useState(() => `user_${Date.now()}`); 
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 320, height: 384 });  
  const [showNotification, setShowNotification] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  
  const {
    connected,
    connecting,
    error,
    messages,
    sendMessage,
    connect,
    disconnect,
    startTyping,
    stopTyping,
    typingUsers
  } = useSocket({
    serverUrl: 'http://localhost:3001',
    userId,
    autoConnect: false
  });


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    if (open && !connected && !connecting) {
      connect();
    }
  }, [open, connected, connecting, connect]);


  useEffect(() => {
    if (!hasShownWelcome) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setHasShownWelcome(true);
        
        
      }, 3000); 
      
      return () => clearTimeout(timer);
    }
  }, [hasShownWelcome]);

  const handleSendMessage = async () => {
    if (!message.trim() || !connected) return;

    const success = await sendMessage(message, 'bot');
    if (success) {
      setMessage("");
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (connected) {
      startTyping('bot');

      clearTimeout(window.typingTimeout);
      window.typingTimeout = window.setTimeout(() => {
        stopTyping('bot');
      }, 1000);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  const toggleExpanded = () => {
    if (isExpanded) {

      setSize({ width: 320, height: 384 });
      setIsExpanded(false);
    } else {

      setSize({ width: 480, height: 600 });
      setIsExpanded(true);
    }
  };


  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = startX - e.clientX;
      const deltaY = e.clientY - startY;
      
      const newWidth = Math.max(280, Math.min(800, startWidth + deltaX));
      const newHeight = Math.max(300, Math.min(700, startHeight + deltaY));
      
      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };


  const formatMessageContent = (content: string) => {
    return content
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };


  const getMessageInfo = (msg: Message) => {
    switch (msg.type) {
      case 'user':
        return { icon: User, label: 'You', className: 'bg-blue-500 text-white ml-auto' };
      case 'bot':
        return { icon: Bot, label: 'AI Assistant', className: 'bg-gray-100 text-gray-800' };
      case 'system':
        return { icon: null, label: 'System', className: 'bg-yellow-50 text-yellow-800 text-center text-xs' };
      default:
        return { icon: Bot, label: 'Assistant', className: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="fixed bottom-5 right-8 z-[100]">
      {/* Welcome Notification Bubble */}
      {showNotification && !open && (
        <div className="absolute bottom-20 right-0 shadow-2xl rounded-2xl border border-gray-100 p-5 mb-2 w-80 animate-slideUp backdrop-blur-sm bg-white/95">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                👋 Hey there! Welcome to my portfolio!
              </p>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                I'm your AI assistant ready to help you explore my work, skills, and experience. Feel free to ask me anything about my projects, technical expertise, or how to get in touch!
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setShowNotification(false);
                    setOpen(true);
                  }}
                  className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-md"
                >
                  Chat Now ✨
                </button>
                <button
                  onClick={() => setShowNotification(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X size={14} />
            </button>
          </div>

          <div className="absolute bottom-[-7px] right-10 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45 shadow-lg"></div>
        </div>
      )}
      {open ? (
        <div 
          ref={chatWindowRef}
          className={`shadow-2xl rounded-3xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 backdrop-blur-lg bg-white/95 ${
            isResizing ? 'select-none' : ''
          }`}
          style={{ 
            width: `${size.width}px`, 
            height: `${size.height}px`,
            minWidth: '280px',
            minHeight: '300px',
            maxWidth: '800px',
            maxHeight: '700px'
          }}
        >

          <div
            ref={resizeRef}
            onMouseDown={handleMouseDown}
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 hover:opacity-70 transition-opacity rounded-br-lg z-10"
            title="Drag to resize"
          />

          <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 animate-pulse"></div>
            
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <div className="flex items-center space-x-2 text-xs text-white/90">
                  {connected ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                      <span className="font-medium">Online & Ready</span>
                    </>
                  ) : connecting ? (
                    <>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Offline</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 relative z-10">
              <button
                onClick={toggleExpanded}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm"
                title={isExpanded ? "Collapse window" : "Expand window"}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  disconnect();
                }}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm"
                title="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>


          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Bot size={32} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-700 mb-2">Welcome! I'm here to help</h4>
                <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Ask me anything about skills, projects, experience, or how to get in touch!
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const { icon: Icon, label, className } = getMessageInfo(msg);
                
                if (msg.type === 'system') {
                  return (
                    <div key={msg._id} className="flex justify-center">
                      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-xs font-medium">
                        {msg.content}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg._id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {Icon && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            msg.type === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                              : 'bg-gradient-to-r from-gray-500 to-gray-600'
                          }`}>
                            <Icon size={12} className="text-white" />
                          </div>
                        )}
                        <span className="text-xs font-medium text-gray-600">{label}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(msg.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-lg'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-lg'
                      }`}>
                        <div 
                          className="text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: formatMessageContent(msg.content) 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            

            {typingUsers.length > 0 && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                      <Bot size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">AI Assistant</span>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-lg shadow-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">AI is thinking</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 border-t border-red-100">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <X size={12} className="text-white" />
                </div>
                <p className="text-sm text-red-600 font-medium">Connection Error</p>
              </div>
              <p className="text-xs text-red-500 mt-1 ml-7">{error}</p>
            </div>
          )}

          <div className="p-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={connected ? "Type your message..." : "Connecting..."}
                disabled={!connected}
                className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all placeholder-gray-400 shadow-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!connected || !message.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl p-3 transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
            {!connected && (
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-gray-500">
                  {connecting ? "Establishing connection..." : "Tap to reconnect"}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">

          {showNotification && (
            <div className="absolute -top-2 -right-2 w-4 h-4">
              <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-ping animation-delay-75"></div>
            </div>
          )}
          <button
            onClick={() => {
              setOpen(true);
              setShowNotification(false);
            }}
            className={`relative group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 ${
              showNotification ? 'animate-pulse' : ''
            } before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-pink-400 before:opacity-0 hover:before:opacity-30 before:transition-opacity before:duration-300`}
          >
            <MessageCircle size={24} className="relative z-10" />
            {/* Floating particles effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-2 left-3 w-1 h-1 bg-white/30 rounded-full animate-ping animation-delay-1000"></div>
              <div className="absolute bottom-3 right-2 w-1 h-1 bg-white/30 rounded-full animate-ping animation-delay-2000"></div>
            </div>
          </button>
        </div>
      )}
      
      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes slideUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animation-delay-75 {
          animation-delay: 75ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}


declare global {
  interface Window {
    typingTimeout: number;
  }
}
