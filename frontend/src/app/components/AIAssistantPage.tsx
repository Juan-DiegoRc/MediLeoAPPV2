import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, TrendingDown, Lightbulb, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickSuggestions = [
  { icon: <TrendingDown size={16} />, text: '¿Por qué subió mi consumo?' },
  { icon: <Lightbulb size={16} />, text: '¿Cómo ahorrar energía?' },
  { icon: <AlertCircle size={16} />, text: 'Explicar alertas recientes' },
];

const aiResponses: Record<string, string> = {
  'consumo': 'Tu consumo aumentó un 12% esta semana debido principalmente al uso del aire acondicionado entre las 14:00 y 18:00 horas. Te recomiendo programarlo a 24°C en lugar de 21°C para reducir el consumo en aproximadamente 300 kWh al mes.',
  'ahorrar': 'Basándome en tu patrón de consumo, aquí van 3 recomendaciones:\n\n1. Ajusta el termostato a 24°C (ahorro: ~25%)\n2. Desconecta aparatos en stand-by (ahorro: ~8%)\n3. Usa cargas pesadas después de las 22:00 cuando la tarifa es menor\n\nPotencial de ahorro: $245 MXN/mes',
  'alertas': 'Detecté 3 alertas en las últimas 24 horas:\n\n1. Sobrecalentamiento (68°C): Revisa la ventilación del panel\n2. Consumo alto: Pico inusual a las 15:30\n3. Pico de voltaje: Fluctuación momentánea sin riesgo\n\nLa alerta crítica es el sobrecalentamiento. ¿Quieres que te guíe en cómo revisarlo?',
  'default': 'Entiendo tu pregunta. Como asistente de energía, puedo ayudarte a:\n\n• Analizar patrones de consumo\n• Identificar anomalías\n• Sugerir optimizaciones\n• Explicar alertas y métricas\n\n¿En qué te gustaría que profundice?'
};

function getAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  if (msg.includes('consumo') || msg.includes('subió') || msg.includes('aumentó')) {
    return aiResponses.consumo;
  }
  if (msg.includes('ahorrar') || msg.includes('reducir') || msg.includes('economizar')) {
    return aiResponses.ahorrar;
  }
  if (msg.includes('alerta') || msg.includes('anomalía') || msg.includes('problema')) {
    return aiResponses.alertas;
  }
  return aiResponses.default;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '¡Hola! Soy tu asistente inteligente de energía. Puedo ayudarte a entender tu consumo, detectar anomalías y darte recomendaciones personalizadas. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(messageText),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="flex flex-col h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-4 bg-gradient-to-br from-[var(--energy-blue-dark)] to-[var(--energy-blue-medium)] text-white"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-display">Asistente IA</h1>
            <p className="text-xs text-white/80">Análisis inteligente de energía</p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[var(--energy-blue-light)] to-[var(--energy-cyan)] text-white rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                      <Sparkles size={14} className="text-[var(--energy-blue-medium)]" />
                    </div>
                    <span className="text-xs text-gray-500 font-display">Asistente</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                <span
                  className={`text-xs mt-2 block ${
                    message.type === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex justify-start"
          >
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                    className="w-2 h-2 bg-[var(--energy-blue-light)] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-2 h-2 bg-[var(--energy-blue-light)] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-2 h-2 bg-[var(--energy-blue-light)] rounded-full"
                  />
                </div>
                <span className="text-xs text-gray-500">Escribiendo...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-4"
        >
          <p className="text-xs text-gray-500 mb-3">Sugerencias rápidas:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
              >
                <div className="text-[var(--energy-blue-medium)]">{suggestion.icon}</div>
                {suggestion.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="px-4 pb-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2 pt-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-3 bg-gradient-to-r from-[var(--energy-blue-light)] to-[var(--energy-cyan)] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
          >
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}