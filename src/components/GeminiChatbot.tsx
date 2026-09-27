import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Globe,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Brain,
  ChevronDown,
  Navigation,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  webSources?: Array<{ uri: string; title: string }>;
  mapSources?: Array<{ uri: string; title: string; address?: string }>;
  timestamp: string;
  modelUsed?: string;
  searchUsed?: boolean;
  mapsUsed?: boolean;
}

const AVAILABLE_MODELS = [
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    tag: 'Maps & Search Grounded',
    description: 'Real-time Google Maps place intelligence and live Search Grounding',
    icon: MapPin,
    supportsMaps: true,
    supportsSearch: true,
  },
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    tag: 'Recommended',
    description: 'High quota and fast reasoning for deep portfolio and technical Q&A',
    icon: Sparkles,
    supportsMaps: false,
    supportsSearch: false,
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash-Lite',
    tag: 'Ultra Fast',
    description: 'Optimized for high-speed, instant responses',
    icon: Zap,
    supportsMaps: false,
    supportsSearch: false,
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro',
    tag: 'Deep Reasoning',
    description: 'Advanced reasoning for intricate technical queries',
    icon: Brain,
    supportsMaps: false,
    supportsSearch: false,
  },
];

export const GeminiChatbot: React.FC = () => {
  const { isDark } = useTheme();
  const { isHindi } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.5-flash');
  const [groundingMode, setGroundingMode] = useState<'maps' | 'search' | 'none'>('maps');
  const [showModelPicker, setShowModelPicker] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const initialGreeting = isHindi
    ? "नमस्ते! मैं अभिषेक का AI असिस्टेंट हूँ। अभिषेक के प्रोजेक्ट्स, MERN और AI टेक स्टैक, अनुभव, या Google Maps आधारित टेक हब्स और लोकेशन के बारे में कुछ भी पूछें!"
    : "Hello! I'm Abhishek's AI Assistant powered by Gemini 3.5 Flash with Google Maps & Search Grounding. Ask me about Abhishek's projects, tech stack, or local tech hubs, offices, and co-working places!";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'model',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Attempt to obtain geolocation for accurate Maps Grounding
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => {
          // Geolocation declined or unavailable - fallback gracefully
        },
        { timeout: 5000, maximumAge: 60000 }
      );
    }
  }, []);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        text: isHindi ? 'वार्तालाप साफ़ कर दिया गया है! मैं आपकी क्या सहायता कर सकता हूँ?' : 'Conversation cleared! How can I assist you now?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          model: selectedModel,
          groundingMode,
          location: userLocation,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text || 'No response returned.',
        webSources: data.webSources || [],
        mapSources: data.mapSources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
        searchUsed: data.searchUsed,
        mapsUsed: data.mapsUsed,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: isHindi
          ? `क्षमा करें, संदेश संसाधित करते समय एक त्रुटि हुई: ${err?.message || 'अज्ञात समस्या'}। कृपया पुनः प्रयास करें।`
          : `Sorry, there was an issue reaching the AI service: ${err?.message || 'Unknown issue'}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const starterSuggestions = isHindi
    ? [
        'अभिषेक की लोकेशन और टेक हब्स बताओ (Google Maps)',
        'अभिषेक का कोर MERN और AI टेक स्टैक क्या है?',
        'अभिषेक के मुख्य प्रोजेक्ट्स का विवरण दें',
        'क्या अभिषेक नए प्रोजेक्ट्स के लिए उपलब्ध हैं?',
      ]
    : [
        'Find tech hubs & co-working spaces near Delhi / Bengaluru (Google Maps)',
        'Where is Abhishek located and what are his collaboration hubs?',
        'What is Abhishek’s core MERN & Machine Learning stack?',
        'Tell me about Abhishek’s featured projects and architecture',
      ];

  const currentModelMeta =
    AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  return (
    <>
      {/* Responsive Launcher Button - Accessible across Mobile, Tablet, and Desktop */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? 'Close AI Assistant' : 'Chat with Abhishek AI Assistant'}
        aria-expanded={isOpen}
        data-cursor="expand"
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4.5 md:px-5 py-2.5 sm:py-3 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-md border transition-all duration-300 cursor-pointer select-none active:scale-95 touch-manipulation ${
          isDark
            ? 'bg-[#121418]/95 text-white border-white/20 hover:border-cyan-400/60 shadow-[0_8px_30px_rgba(0,0,0,0.7)]'
            : 'bg-[#0C0C0C]/95 text-white border-[#0C0C0C] hover:border-black shadow-[0_8px_25px_rgba(0,0,0,0.2)]'
        }`}
        style={{
          bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="relative flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-black animate-ping" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <span className="font-medium text-xs sm:text-sm tracking-wide whitespace-nowrap">
          {isOpen ? (isHindi ? 'बंद करें' : 'Close AI') : (isHindi ? 'AI से पूछें (Maps & Q&A)' : 'Chat with AI')}
        </span>
      </motion.button>

      {/* Chat Window Modal / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile / Tablet Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-45 sm:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.95 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              className={`fixed z-50 rounded-[24px] sm:rounded-[32px] border-2 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden backdrop-blur-2xl transition-colors duration-300
                /* Mobile positioning (bottom sheet with safe margins) */
                inset-x-2.5 bottom-2.5 top-14
                /* Tablet & Desktop positioning (floating card above bottom right) */
                sm:inset-auto sm:bottom-20 sm:right-6 md:bottom-24 md:right-8 sm:w-[440px] md:w-[480px] sm:h-[600px] sm:max-h-[82vh] ${
                isDark
                  ? 'bg-[#0D1015]/95 border-white/20 text-[#FAFAFC]'
                  : 'bg-white/95 border-[#0C0C0C]/15 text-[#0C0C0C]'
              }`}
              style={{
                marginBottom: 'env(safe-area-inset-bottom, 0px)',
              }}
              role="dialog"
              aria-label="Abhishek AI Assistant Chat"
            >
              {/* Header */}
              <div
                className={`p-3.5 sm:p-4 border-b flex items-center justify-between gap-2 select-none transition-colors duration-300 ${
                  isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-sm tracking-tight leading-tight">
                        Abhishek AI Assistant
                      </h3>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] opacity-60 leading-tight flex items-center gap-1">
                      {groundingMode === 'maps' ? (
                        <>
                          <MapPin className="w-2.5 h-2.5 text-emerald-400 inline" />
                          <span>Google Maps Grounding active</span>
                        </>
                      ) : groundingMode === 'search' ? (
                        <>
                          <Globe className="w-2.5 h-2.5 text-cyan-400 inline" />
                          <span>Google Search Grounding active</span>
                        </>
                      ) : (
                        <span>{currentModelMeta.tag}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1">
                  {/* Clear Chat */}
                  <button
                    onClick={handleClearHistory}
                    title="Clear conversation"
                    aria-label="Clear conversation"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-black/70'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Close */}
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close chat"
                    aria-label="Close chat"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-black/70'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Model & Grounding Toolbar */}
              <div
                className={`px-3.5 py-2 border-b flex items-center justify-between gap-2 text-xs transition-colors duration-300 ${
                  isDark ? 'border-white/10 bg-white/[0.015]' : 'border-black/10 bg-black/[0.015]'
                }`}
              >
                {/* Model Selector Pill */}
                <div className="relative">
                  <button
                    onClick={() => setShowModelPicker((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/20 bg-white/5 hover:bg-white/10 text-white'
                        : 'border-black/15 bg-black/5 hover:bg-black/10 text-black'
                    }`}
                  >
                    <currentModelMeta.icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{currentModelMeta.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* Model Selector Dropdown */}
                  {showModelPicker && (
                    <div
                      className={`absolute top-full left-0 mt-1 w-68 rounded-2xl border shadow-xl z-50 p-1.5 backdrop-blur-xl ${
                        isDark ? 'bg-[#161920] border-white/20' : 'bg-white border-black/15'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-semibold px-2 py-1 opacity-50">
                        Select Gemini Model
                      </div>
                      {AVAILABLE_MODELS.map((m) => {
                        const Icon = m.icon;
                        const isActive = m.id === selectedModel;
                        return (
                          <button
                            key={m.id}
                            onClick={() => {
                              setSelectedModel(m.id);
                              setShowModelPicker(false);
                            }}
                            className={`w-full text-left p-2 rounded-xl text-xs flex items-start gap-2.5 transition-colors cursor-pointer ${
                              isActive
                                ? isDark
                                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                                  : 'bg-black/10 text-black font-medium'
                                : isDark
                                ? 'hover:bg-white/5 text-white/80'
                                : 'hover:bg-black/5 text-black/80'
                            }`}
                          >
                            <Icon className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-[11px]">{m.name}</span>
                                <span className="text-[9px] px-1.5 py-0.2 rounded-full border border-current opacity-70">
                                  {m.tag}
                                </span>
                              </div>
                              <p className="text-[10px] opacity-60 leading-tight mt-0.5">
                                {m.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Grounding Tool Modes (Maps vs Search vs Off) */}
                <div className="flex items-center gap-1.5">
                  {/* Google Maps Grounding Button */}
                  <button
                    onClick={() =>
                      setGroundingMode((prev) => (prev === 'maps' ? 'none' : 'maps'))
                    }
                    title="Toggle Google Maps place grounding"
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                      groundingMode === 'maps'
                        ? isDark
                          ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                          : 'border-emerald-600/40 bg-emerald-100 text-emerald-900'
                        : isDark
                        ? 'border-white/10 text-white/40 bg-transparent hover:bg-white/5'
                        : 'border-black/10 text-black/40 bg-transparent hover:bg-black/5'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Maps</span>
                  </button>

                  {/* Google Search Grounding Button */}
                  <button
                    onClick={() =>
                      setGroundingMode((prev) => (prev === 'search' ? 'none' : 'search'))
                    }
                    title="Toggle Google Search live web grounding"
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                      groundingMode === 'search'
                        ? isDark
                          ? 'border-cyan-400/40 bg-cyan-500/15 text-cyan-300'
                          : 'border-cyan-600/40 bg-cyan-100 text-cyan-900'
                        : isDark
                        ? 'border-white/10 text-white/40 bg-transparent hover:bg-white/5'
                        : 'border-black/10 text-black/40 bg-transparent hover:bg-black/5'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Messages Scrollable Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-0 text-sm">
                {messages.map((message) => {
                  const isUser = message.role === 'user';
                  return (
                    <div
                      key={message.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl p-3 sm:p-3.5 transition-colors relative group ${
                          isUser
                            ? isDark
                              ? 'bg-[#0070F3] text-white rounded-br-sm'
                              : 'bg-[#0C0C0C] text-white rounded-br-sm'
                            : isDark
                            ? 'bg-white/[0.08] text-[#FAFAFC] rounded-bl-sm border border-white/10'
                            : 'bg-[#F4F5F7] text-[#0C0C0C] rounded-bl-sm border border-black/5'
                        }`}
                      >
                        {/* Message Content */}
                        <div className="leading-relaxed whitespace-pre-wrap break-words text-xs sm:text-[13px]">
                          {message.text}
                        </div>

                        {/* Google Maps Grounding Sources */}
                        {message.mapSources && message.mapSources.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-current/15 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 text-[10px] font-medium opacity-80">
                              <MapPin className="w-3 h-3 text-emerald-400" />
                              <span>Google Maps Places & Locations:</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {message.mapSources.map((source, idx) => (
                                <a
                                  key={idx}
                                  href={source.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center justify-between p-2 rounded-xl text-[11px] transition-all border group/map ${
                                    isDark
                                      ? 'bg-emerald-950/30 border-emerald-500/20 hover:border-emerald-400 text-emerald-300'
                                      : 'bg-emerald-50 border-emerald-600/20 hover:border-emerald-600 text-emerald-900'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Navigation className="w-3 h-3 text-emerald-400 flex-shrink-0 group-hover/map:scale-110 transition-transform" />
                                    <div className="truncate">
                                      <span className="font-semibold block truncate">
                                        {source.title || 'View Place on Google Maps'}
                                      </span>
                                      {source.address && (
                                        <span className="text-[10px] opacity-75 block truncate">
                                          {source.address}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <ExternalLink className="w-3 h-3 opacity-70 flex-shrink-0 ml-1.5" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Google Search Grounding Web Sources */}
                        {message.webSources && message.webSources.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-current/15 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 text-[10px] font-medium opacity-80">
                              <Globe className="w-3 h-3 text-cyan-400" />
                              <span>Google Search Grounding Sources:</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {message.webSources.slice(0, 3).map((source, idx) => (
                                <a
                                  key={idx}
                                  href={source.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] transition-colors border ${
                                    isDark
                                      ? 'bg-white/10 border-white/15 hover:bg-white/20 text-cyan-300'
                                      : 'bg-black/10 border-black/15 hover:bg-black/20 text-cyan-800'
                                  }`}
                                >
                                  <span className="max-w-[140px] truncate">
                                    {source.title || 'Web Reference'}
                                  </span>
                                  <ExternalLink className="w-2.5 h-2.5 opacity-70 flex-shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Copy action & Timestamp for model message */}
                        {!isUser && (
                          <div className="mt-2 flex items-center justify-between text-[10px] opacity-50">
                            <span>{message.timestamp}</span>
                            <button
                              onClick={() => handleCopy(message.id, message.text)}
                              title="Copy message"
                              aria-label="Copy message"
                              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-100 rounded-xl transition-opacity touch-manipulation -mr-2"
                            >
                              {copiedId === message.id ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}

                        {isUser && (
                          <div className="text-[10px] text-right mt-1 opacity-60">
                            {message.timestamp}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div
                      className={`rounded-2xl rounded-bl-sm p-3 border text-xs flex items-center gap-2 ${
                        isDark
                          ? 'bg-white/[0.08] border-white/10 text-white'
                          : 'bg-[#F4F5F7] border-black/5 text-[#0C0C0C]'
                      }`}
                    >
                      {groundingMode === 'maps' ? (
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      )}
                      <span className="text-[11px] opacity-75">
                        {groundingMode === 'maps'
                          ? 'Grounding with Google Maps data...'
                          : groundingMode === 'search'
                          ? 'Grounding with Google Search...'
                          : 'Gemini is thinking...'}
                      </span>
                      <span className="flex gap-1 ml-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.3s]" />
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Starter Suggestions */}
              {messages.length <= 2 && !isLoading && (
                <div className="px-3.5 pb-2">
                  <div className="text-[10px] font-medium uppercase opacity-50 mb-1.5">
                    Suggested questions (Maps & Portfolio):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {starterSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(suggestion)}
                        className={`text-[11px] text-left px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          isDark
                            ? 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 text-white/90'
                            : 'border-black/15 bg-black/5 hover:bg-black/10 hover:border-emerald-600/50 text-black/90'
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Bar */}
              <div
                className={`p-3 border-t transition-colors duration-300 ${
                  isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'
                }`}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      groundingMode === 'maps'
                        ? 'Ask about places, tech hubs, offices or Abhishek... (Enter to send)'
                        : 'Ask anything about Abhishek... (Enter to send)'
                    }
                    rows={1}
                    disabled={isLoading}
                    className={`flex-1 min-h-[38px] max-h-24 resize-none rounded-2xl px-3.5 py-2 text-xs focus:outline-none transition-colors border ${
                      isDark
                        ? 'bg-black/40 border-white/20 text-white placeholder-white/40 focus:border-cyan-400/80'
                        : 'bg-white border-black/15 text-black placeholder-black/40 focus:border-black'
                    }`}
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    title="Send message"
                    aria-label="Send message"
                    className={`p-2.5 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
                      !input.trim() || isLoading
                        ? 'opacity-40 cursor-not-allowed bg-current/10'
                        : isDark
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                        : 'bg-[#0C0C0C] hover:bg-black text-white'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
