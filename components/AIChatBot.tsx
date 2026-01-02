
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, WebsiteData } from '../types';
import { chatWithGemini, editWebsite } from '../services/geminiService';

interface AIChatBotProps {
  website: WebsiteData;
  setWebsite: (data: WebsiteData) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (msg: string) => void;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ website, setWebsite, setLoading, setLoadingMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm your nuttyinc web ai assistant. Tell me what you'd like to change on your website, or ask me for design advice!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      // Determine if it's a request to EDIT the site or just CHAT
      const isEditRequest = /change|add|update|edit|make|set|create|remove|delete|style/i.test(userMsg);

      if (isEditRequest) {
        setLoading(true);
        setLoadingMessage(`Updating your website based on: "${userMsg}"...`);
        const updatedWebsite = await editWebsite(website, userMsg);
        setWebsite(updatedWebsite);
        setMessages(prev => [...prev, { role: 'assistant', content: "I've updated your website! What do you think?", isAction: true }]);
        setLoading(false);
      } else {
        const response = await chatWithGemini(messages.map(m => ({ role: m.role, content: m.content })), userMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error while processing that request. Could you try rephrasing?" }]);
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-96 border-l border-slate-200 bg-white flex flex-col h-full shadow-2xl">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-robot text-white text-xs"></i>
            </div>
            <div>
                <h3 className="text-sm font-bold text-slate-800">Gemini Assistant</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Online</span>
                </div>
            </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              {msg.content}
              {msg.isAction && (
                  <div className="mt-2 pt-2 border-t border-slate-200/20 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 opacity-70">
                    <i className="fa-solid fa-check-circle"></i> Changes Applied
                  </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            }}
            placeholder="Describe a change (e.g., 'Make the hero title emerald green')"
            className="w-full p-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none h-24"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
        <div className="mt-2 text-[10px] text-slate-400 text-center">
            Ask for styling, content, or structural changes.
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;
