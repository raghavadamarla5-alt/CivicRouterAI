"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FloatingAssistant() {
  const { t, i18n } = useTranslation();
  
  const SUGGESTED_QUESTIONS = [
    t('assistant.q1', 'Where should I report a pothole?'),
    t('assistant.q2', 'How can I complain about garbage collection?'),
    t('assistant.q3', 'Which portal handles water supply issues?'),
    t('assistant.q4', 'How do I report a broken streetlight?')
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'ai' | 'user' | 'error', text: string}[]>([
    { sender: 'ai', text: t('assistant.greeting', 'Hi! I am CIVIC AI. I can help you find government portals, classify civic issues, and track your complaints. How can I help?') }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { sender: 'user' as const, text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, language: i18n.language })
      });

      const data = await res.json();
      
      if (!res.ok || data.error) {
        setMessages(prev => [
          ...prev, 
          { sender: 'error' as const, text: data.error || 'Failed to communicate with AI backend.' },
          { sender: 'ai' as const, text: 'Since the AI is currently unavailable, please visit our Government Portal Directory to manually find the right service or authority.' }
        ]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai' as const, text: data.reply }]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev, 
        { sender: 'error' as const, text: 'Network error. Please check your connection and try again.' },
        { sender: 'ai' as const, text: 'Since the AI is currently unavailable, please visit our Government Portal Directory from the dashboard to manually find the right service.' }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="glass-panel w-[380px] h-[550px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 shadow-[0_0_40px_rgba(37,99,235,0.4)] border border-white/10 rounded-2xl bg-[#0f172a]/90 backdrop-blur-2xl">
          {/* Header */}
          <div className="bg-blue-600/20 border-b border-blue-500/30 p-4 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-500 text-white rounded-lg shadow-sm">
                <Bot size={20} />
              </div>
              <span className="font-bold text-white tracking-wide">CIVIC AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition"><X size={20} /></button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-transparent text-sm custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'error' ? (
                  <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{msg.text}</span>
                  </div>
                ) : (
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] ${
                    msg.sender === 'user' 
                    ? 'bg-blue-600 text-white shadow-lg rounded-tr-sm' 
                    : 'bg-white/10 border border-white/20 text-gray-100 shadow-md backdrop-blur-md rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/10 border border-white/20 text-gray-100 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 flex gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap border-t border-white/5 pb-3">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleSend(q)}
                  className="text-xs bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition whitespace-nowrap flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-black/40 border-t border-white/10 flex gap-2 backdrop-blur-md items-end">
            <button 
              onClick={() => setMessages([messages[0]])} 
              className="p-2.5 text-gray-400 hover:text-white transition flex-shrink-0"
              title="Clear Conversation"
            >
              <RefreshCw size={18} />
            </button>
            <textarea 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder="Ask CIVIC AI... (Shift+Enter for new line)" 
              className="flex-1 px-4 py-2.5 bg-white/5 border border-white/20 text-white placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white/10 transition shadow-inner resize-none min-h-[44px] max-h-32 custom-scrollbar"
              rows={1}
            />
            <button 
              onClick={() => handleSend(input)} 
              className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-500 transition shadow-lg disabled:opacity-50 flex-shrink-0"
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="ai-chat-btn bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:shadow-[0_0_30px_rgba(20,184,166,0.8)] transition-all transform hover:scale-110 flex items-center gap-2 border border-blue-400/30 group"
        >
          <Bot size={28} className="group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
}
