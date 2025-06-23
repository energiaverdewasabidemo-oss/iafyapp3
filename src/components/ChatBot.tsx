import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, Calendar, ArrowRight, Phone, Mail, Target, TrendingUp, Euro, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
  actions?: Array<{
    type: 'calendly' | 'whatsapp' | 'link';
    text: string;
    url?: string;
    message?: string;
  }>;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [userCompany, setUserCompany] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [conversationStage, setConversationStage] = useState('initial');
  const [urgencyLevel, setUrgencyLevel] = useState(0);
  const [leadScore, setLeadScore] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "🚀 **¡ALERTA EMPRESARIAL!** Soy Carlos, especialista en automatización de IAFY.\n\n**DATO CRÍTICO:** Tu empresa está perdiendo **83€ CADA DÍA** por no tener IA.\n\n**¿Cuál es tu nombre?** Necesito cualificarte para la demo URGENTE.",
          ["Mi nombre es...", "¿Cómo pierdo 83€/día?", "Quiero la demo YA", "¿Qué es IAFY?"]
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, quickReplies?: string[], actions?: Message['actions']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      quickReplies,
      actions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const scrollToCalendly = () => {
    const calendlySection = document.querySelector('#calendly-section') || 
                           document.querySelector('[data-url*="calendly"]')?.closest('section');
    
    if (calendlySection) {
      calendlySection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } else {
      window.open('https://calendly.com/iafyagency/30min?month=2025-06', '_blank');
    }
  };

  const openWhatsApp = (customMessage?: string) => {
    const defaultMessage = customMessage || 
      `🚨 URGENTE - Demo IAFY\n\nHola Carlos, soy ${userName || 'un empresario'} ${userCompany ? `de ${userCompany}` : ''}.\n\n✅ CONFIRMADO: Mi empresa pierde 30.000€/año sin IA\n✅ NECESITO: Demo personalizada INMEDIATA\n✅ OBJETIVO: Implementar en 7 días\n\n¿Cuándo podemos hacer la demo? Quiero empezar YA.`;
    
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/34621482256?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const calculateLeadScore = (message: string): number => {
    let score = leadScore;
    
    // Palabras que aumentan el score
    const positiveWords = ['urgente', 'necesito', 'quiero', 'cuando', 'precio', 'demo', 'implementar', 'empresa', 'negocio', 'clientes', 'ventas', 'automatizar'];
    const urgentWords = ['ya', 'ahora', 'inmediato', 'rapido', 'hoy', 'urgente'];
    
    positiveWords.forEach(word => {
      if (message.toLowerCase().includes(word)) score += 10;
    });
    
    urgentWords.forEach(word => {
      if (message.toLowerCase().includes(word)) {
        score += 20;
        setUrgencyLevel(prev => prev + 1);
      }
    });
    
    setLeadScore(Math.min(score, 100));
    return score;
  };

  const getBotResponse = (userMessage: string): { text: string; quickReplies?: string[]; actions?: Message['actions'] } => {
    const message = userMessage.toLowerCase();
    const score = calculateLeadScore(userMessage);

    // ETAPA 1: CUALIFICACIÓN INICIAL AGRESIVA
    if (conversationStage === 'initial') {
      // Capturar nombre
      if (message.includes('mi nombre es') || message.includes('soy') || message.includes('me llamo')) {
        const nameMatch = userMessage.match(/(?:mi nombre es|soy|me llamo)\s+([a-záéíóúñ\s]+)/i);
        if (nameMatch) {
          setUserName(nameMatch[1].trim());
          setConversationStage('qualifying');
          return {
            text: `Perfecto ${nameMatch[1].trim()}! 🎯\n\n**ANÁLISIS INMEDIATO:** Como especialista en ventas, veo que tu empresa está en **CRISIS SILENCIOSA**.\n\n**REALIDAD BRUTAL:**\n💸 Pierdes 83€ CADA DÍA\n💸 2.500€ CADA MES\n💸 30.000€ CADA AÑO\n\n**¿Cuál es tu empresa?** Necesito calcular tu pérdida EXACTA.`,
            quickReplies: ["Mi empresa es...", "¿Cómo calculas eso?", "Quiero la demo YA", "Trabajo por cuenta propia"]
          };
        }
      }

      // Respuesta sobre pérdidas
      if (message.includes('cómo pierdo') || message.includes('83€') || message.includes('calculas')) {
        setConversationStage('qualifying');
        return {
          text: `**🚨 CÁLCULO REAL DE PÉRDIDAS:**\n\n**CADA DÍA que no tienes IA:**\n💸 40% de llamadas perdidas = 150€\n💸 Clientes que van a competencia = 200€\n💸 Tiempo perdido en tareas manuales = 120€\n💸 Oportunidades nocturnas perdidas = 180€\n\n**TOTAL DIARIO: 650€**\n**TOTAL ANUAL: 237.250€**\n\n**¿Cuál es tu nombre?** Voy a calcular TU pérdida específica.`,
          quickReplies: ["Mi nombre es...", "¡Esto es urgente!", "Quiero parar las pérdidas", "¿Cómo lo solucionáis?"]
        };
      }

      // Quiere demo inmediata
      if (message.includes('demo ya') || message.includes('quiero ya') || message.includes('urgente')) {
        setUrgencyLevel(prev => prev + 2);
        setConversationStage('closing');
        return {
          text: `**🔥 PERFECTO! Detecto URGENCIA MÁXIMA.**\n\n**ACCIÓN INMEDIATA:**\n✅ Demo personalizada en 30 min\n✅ Cálculo de ROI específico\n✅ Plan de implementación en 7 días\n✅ Garantía de resultados\n\n**¿Prefieres que te llame AHORA o agendamos?**`,
          actions: [
            {
              type: 'whatsapp',
              text: '📞 LLAMARME AHORA (INMEDIATO)',
              message: `🚨 URGENTE - Llamada Inmediata\n\nHola Carlos, NECESITO que me llames AHORA.\n\nDetectaste urgencia máxima y tienes razón. Mi empresa está perdiendo dinero cada minuto.\n\n¿Puedes llamarme en los próximos 5 minutos?\n\nMi teléfono: [AÑADIR TELÉFONO]`
            },
            {
              type: 'calendly',
              text: '📅 AGENDAR DEMO (30 MIN)',
            }
          ],
          quickReplies: ["¿Cuánto cuesta?", "¿Garantías reales?", "Empezar implementación"]
        };
      }

      // Qué es IAFY
      if (message.includes('qué es') || message.includes('iafy')) {
        return {
          text: `**IAFY = SOLUCIÓN #1 EN ESPAÑA** 🇪🇸\n\n**RESULTADOS GARANTIZADOS:**\n🚀 Capturas 100% de leads (24/7)\n🚀 Reduces costes 70%\n🚀 Aumentas ventas 180%\n🚀 ROI del 320% en 30 días\n\n**+20 empresas** ya facturan más con nosotros.\n\n**¿Cuál es tu nombre?** Te muestro casos específicos de tu sector.`,
          quickReplies: ["Mi nombre es...", "Casos de mi sector", "¿Cuánto cuesta?", "Demo personalizada"]
        };
      }

      // Default para inicial
      return {
        text: `**⚠️ CADA SEGUNDO CUENTA.**\n\nMientras hablamos, tu competencia está capturando clientes con IA 24/7.\n\n**PREGUNTA DIRECTA:** ¿Cuántas llamadas pierde tu empresa cada día?\n\n**¿Cuál es tu nombre?** Necesito cualificarte para la demo URGENTE.`,
        quickReplies: ["Mi nombre es...", "Perdemos muchas llamadas", "¿Cómo funciona?", "Quiero demo YA"]
      };
    }

    // ETAPA 2: CUALIFICACIÓN AGRESIVA
    if (conversationStage === 'qualifying') {
      // Capturar empresa
      if (message.includes('mi empresa es') || message.includes('trabajo en')) {
        const companyMatch = userMessage.match(/(?:mi empresa es|trabajo en)\s+([a-záéíóúñ\s]+)/i);
        if (companyMatch) {
          setUserCompany(companyMatch[1].trim());
        }
        setConversationStage('presenting');
        return {
          text: `**ANÁLISIS EMPRESARIAL INMEDIATO** 📊\n\n${companyMatch ? `${companyMatch[1].trim()} - ` : ''}**DIAGNÓSTICO:**\n\n💸 **PÉRDIDA ESTIMADA:** 2.500€/mes\n💸 **CLIENTES PERDIDOS:** 40% diarios\n💸 **COMPETENCIA GANANDO:** Mientras duermes\n\n**SOLUCIÓN IAFY:**\n✅ +180% conversiones\n✅ -70% costes\n✅ 24/7 automatización\n\n**¿Quieres ver exactamente cómo lo haríamos en tu empresa?**`,
          actions: [
            {
              type: 'calendly',
              text: '🎯 SÍ, DEMO PERSONALIZADA',
            },
            {
              type: 'whatsapp',
              text: '📞 HABLAR AHORA MISMO',
              message: `Hola Carlos, soy ${userName} de ${companyMatch?.[1] || 'mi empresa'}.\n\nHe visto el análisis y es exacto. Estamos perdiendo 2.500€/mes.\n\nNECESITO una demo personalizada URGENTE.\n\n¿Cuándo podemos hacerla?`
            }
          ],
          quickReplies: ["¿Cuánto cuesta?", "Casos de éxito", "¿Garantías?", "Implementar YA"]
        };
      }

      // Trabajo por cuenta propia
      if (message.includes('cuenta propia') || message.includes('autónomo') || message.includes('freelance')) {
        setUserCompany('Autónomo');
        setConversationStage('presenting');
        return {
          text: `**PERFECTO PARA AUTÓNOMOS** 💼\n\n**TU SITUACIÓN:**\n💸 Pierdes clientes por no contestar 24/7\n💸 No puedes crecer sin más personal\n💸 Competencia con equipos grandes te gana\n\n**SOLUCIÓN IAFY:**\n🚀 Eres una empresa de 10 personas\n🚀 Atiendes 24/7 sin dormir\n🚀 Compites con las grandes\n\n**ROI AUTÓNOMOS:** 450% promedio\n\n**¿Quieres ver cómo multiplicar tu facturación?**`,
          actions: [
            {
              type: 'calendly',
              text: '🚀 DEMO PARA AUTÓNOMOS',
            },
            {
              type: 'whatsapp',
              text: '💬 HABLAR CON ESPECIALISTA',
              message: `Hola Carlos, soy ${userName}, autónomo.\n\nQuiero multiplicar mi facturación con IA como me has explicado.\n\n¿Podemos hacer una demo específica para autónomos?`
            }
          ],
          quickReplies: ["¿Precio para autónomos?", "Casos autónomos", "Empezar YA"]
        };
      }

      // Cómo calculas
      if (message.includes('cómo calculas') || message.includes('cómo lo sabes')) {
        return {
          text: `**METODOLOGÍA CIENTÍFICA** 🔬\n\n**DATOS REALES de +20 empresas:**\n📊 40% llamadas perdidas (promedio)\n📊 150€ valor promedio por lead\n📊 2.500€ coste personal administrativo\n📊 16h sin atención = oportunidades perdidas\n\n**FÓRMULA:**\n(Llamadas perdidas × Valor lead) + Costes personal + Oportunidades nocturnas = **PÉRDIDA REAL**\n\n**¿Quieres que calculemos TU pérdida exacta?**`,
          quickReplies: ["Sí, mi pérdida exacta", "¿Cómo lo solucionáis?", "Demo personalizada", "Casos de éxito"]
        };
      }
    }

    // ETAPA 3: PRESENTACIÓN AGRESIVA
    if (conversationStage === 'presenting') {
      // Precio
      if (message.includes('cuánto cuesta') || message.includes('precio') || message.includes('coste')) {
        setConversationStage('closing');
        return {
          text: `**💰 INVERSIÓN vs RETORNO:**\n\n**IAFY Professional:** 497€/mes\n**TU RETORNO:** 2.500€+/mes\n**BENEFICIO NETO:** +2.003€/mes\n**ROI:** 403% mensual\n\n**GARANTÍA TOTAL:**\n✅ 30 días prueba gratis\n✅ Si no recuperas inversión → DINERO DEVUELTO\n✅ Sin permanencia\n\n**PREGUNTA CLAVE:** ¿Cuándo quieres empezar a ganar 2.000€ extra cada mes?`,
          actions: [
            {
              type: 'calendly',
              text: '💰 EMPEZAR A GANAR YA',
            },
            {
              type: 'whatsapp',
              text: '📞 CERRAR AHORA',
              message: `Hola Carlos, he visto los números:\n\n✅ Inversión: 497€/mes\n✅ Retorno: 2.500€+/mes\n✅ Beneficio: +2.003€/mes\n\nQuiero empezar YA. ¿Podemos cerrar ahora mismo?`
            }
          ],
          quickReplies: ["¿Garantía real?", "Casos de éxito", "Empezar implementación"]
        };
      }

      // Casos de éxito
      if (message.includes('casos') || message.includes('éxito') || message.includes('ejemplos')) {
        return {
          text: `**🏆 CASOS REALES VERIFICADOS:**\n\n**TechSolutions Madrid:**\n💰 +4.200€/mes ahorrados\n📈 +180% conversiones\n⏱️ ROI: 420%\n\n**InnovaMarketing BCN:**\n💰 +2.800€/mes ahorrados\n📈 +95% satisfacción\n⏱️ ROI: 280%\n\n**GlobalTrade Valencia:**\n💰 +5.100€/mes ahorrados\n📈 +300% clientes internacionales\n⏱️ ROI: 450%\n\n**¿Quieres ser nuestro próximo caso de éxito?**`,
          actions: [
            {
              type: 'calendly',
              text: '🏆 SER EL PRÓXIMO CASO',
            },
            {
              type: 'whatsapp',
              text: '📞 HABLAR CON CLIENTES',
              message: `Hola Carlos, he visto los casos de éxito.\n\n¿Puedo hablar con algún cliente para verificar los resultados?\n\nQuiero resultados similares para mi empresa.`
            }
          ],
          quickReplies: ["¿Cómo lo hacéis?", "¿Cuánto tarda?", "Empezar YA"]
        };
      }

      // Cómo funciona
      if (message.includes('cómo funciona') || message.includes('cómo lo hacéis')) {
        return {
          text: `**🔧 PROCESO CIENTÍFICO:**\n\n**FASE 1 (Días 1-2):** Análisis + Setup\n**FASE 2 (Días 3-5):** IA entrenada con TU info\n**FASE 3 (Días 6-7):** ¡FUNCIONANDO 24/7!\n\n**TECNOLOGÍA:**\n🤖 GPT-4 (misma que ChatGPT)\n🔒 Servidores AWS Europa\n📱 WhatsApp API oficial\n☁️ Integración total con tu CRM\n\n**TÚ NO HACES NADA.** Nosotros lo hacemos todo.\n\n**¿Empezamos esta semana?**`,
          actions: [
            {
              type: 'calendly',
              text: '🚀 EMPEZAR ESTA SEMANA',
            },
            {
              type: 'whatsapp',
              text: '📞 IMPLEMENTACIÓN URGENTE',
              message: `Hola Carlos, quiero empezar la implementación ESTA SEMANA.\n\n¿Podemos acelerar el proceso? Mi empresa necesita esto YA.`
            }
          ],
          quickReplies: ["¿Qué necesitáis?", "¿Interrumpe mi negocio?", "Empezar YA"]
        };
      }
    }

    // ETAPA 4: CIERRE AGRESIVO
    if (conversationStage === 'closing') {
      // Garantía
      if (message.includes('garantía') || message.includes('real') || message.includes('seguro')) {
        return {
          text: `**🛡️ GARANTÍAS BLINDADAS:**\n\n✅ **30 días GRATIS** → Si no funciona, DINERO DEVUELTO\n✅ **Resultados en 7 días** → O trabajamos GRATIS\n✅ **Sin permanencia** → Cancelas cuando quieras\n✅ **Soporte 24/7** → Nunca estás solo\n\n**+20 EMPRESAS** confían en nosotros.\n**95% SATISFACCIÓN** verificada.\n\n**ÚLTIMA PREGUNTA:** ¿Prefieres demo ahora o que te llame directamente?`,
          actions: [
            {
              type: 'calendly',
              text: '📅 DEMO AHORA',
            },
            {
              type: 'whatsapp',
              text: '📞 LLAMARME YA',
              message: `Hola Carlos, he visto todas las garantías.\n\nEstoy convencido. ¿Puedes llamarme AHORA para cerrar?\n\nMi teléfono: [AÑADIR NÚMERO]`
            }
          ]
        };
      }

      // Empezar implementación
      if (message.includes('empezar') || message.includes('implementar') || message.includes('ya')) {
        return {
          text: `**🚀 ¡PERFECTO! CERRAMOS AHORA.**\n\n**PRÓXIMOS PASOS INMEDIATOS:**\n1️⃣ Demo personalizada (30 min)\n2️⃣ Análisis de tu empresa específica\n3️⃣ Cálculo de ROI exacto\n4️⃣ Implementación en 7 días\n5️⃣ ¡Empiezas a ganar dinero!\n\n**¿Cómo prefieres cerrar?**`,
          actions: [
            {
              type: 'calendly',
              text: '📅 DEMO + CIERRE (30 MIN)',
            },
            {
              type: 'whatsapp',
              text: '📞 CERRAR POR TELÉFONO',
              message: `Hola Carlos, estoy listo para CERRAR.\n\nQuiero implementar IAFY en mi empresa YA.\n\n¿Podemos cerrar por teléfono ahora mismo?\n\nMi teléfono: [AÑADIR NÚMERO]`
            }
          ]
        };
      }
    }

    // RESPUESTAS GENERALES ULTRA-AGRESIVAS
    if (message.includes('demo') || message.includes('ver') || message.includes('mostrar')) {
      return {
        text: `**🎯 DEMO PERSONALIZADA = CIERRE INMEDIATO**\n\nEn **30 minutos** verás:\n💰 **Cuánto dinero pierdes EXACTAMENTE**\n💰 **Cuánto ganarías con IAFY (números reales)**\n💰 **Plan de implementación específico**\n💰 **ROI garantizado para TU empresa**\n\n**¿Prefieres que te llame AHORA o agendamos?**`,
        actions: [
          {
            type: 'whatsapp',
            text: '📞 LLAMARME AHORA (INMEDIATO)',
            message: `Hola Carlos, quiero la demo personalizada.\n\n¿Puedes llamarme AHORA? Estoy listo para ver los números y cerrar si me convence.\n\nMi teléfono: [AÑADIR NÚMERO]`
          },
          {
            type: 'calendly',
            text: '📅 AGENDAR DEMO (30 MIN)',
          }
        ],
        quickReplies: ["¿Qué veré exactamente?", "¿Es realmente gratis?", "Cerrar ahora"]
      };
    }

    // Respuesta por defecto - MÁXIMA AGRESIVIDAD
    return {
      text: `**⚠️ ALERTA CRÍTICA: PÉRDIDA ACTIVA**\n\nCada minuto que pasa sin IA = **3.47€ perdidos**\n\n**REALIDAD BRUTAL:**\n💸 Tu competencia está capturando TUS clientes\n💸 Pierdes 83€ CADA DÍA\n💸 30.000€ CADA AÑO\n\n**SOLUCIÓN INMEDIATA:** Demo de 30 min donde te muestro cómo ganar 2.000€+ extra cada mes.\n\n**¿Hablamos AHORA o prefieres seguir perdiendo dinero?**`,
      actions: [
        {
          type: 'whatsapp',
          text: '🚨 PARAR PÉRDIDAS AHORA',
          message: `🚨 URGENTE - Parar Pérdidas\n\nHola Carlos, tienes razón. Mi empresa está perdiendo dinero cada minuto.\n\nNECESITO hablar contigo AHORA para parar las pérdidas.\n\n¿Puedes llamarme en los próximos 5 minutos?`
        },
        {
          type: 'calendly',
          text: '📅 DEMO URGENTE (30 MIN)',
        }
      ],
      quickReplies: ["¿Cuánto ganaré exactamente?", "Casos de éxito", "Garantías", "CERRAR YA"]
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addUserMessage(inputText);
    const userMessage = inputText;
    setInputText('');

    simulateTyping();
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      addBotMessage(response.text, response.quickReplies, response.actions);
    }, 800 + Math.random() * 400);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    simulateTyping();
    setTimeout(() => {
      const response = getBotResponse(reply);
      addBotMessage(response.text, response.quickReplies, response.actions);
    }, 600);
  };

  const handleAction = (action: NonNullable<Message['actions']>[0]) => {
    if (action.type === 'calendly') {
      scrollToCalendly();
    } else if (action.type === 'whatsapp') {
      openWhatsApp(action.message);
    } else if (action.type === 'link' && action.url) {
      window.open(action.url, '_blank');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante FIJO EN TODA LA APLICACIÓN */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative"
          >
            {/* Efecto de brillo mejorado */}
            <div className="absolute -inset-4 bg-gradient-to-r from-danger-500 via-primary-500 to-success-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
            
            {/* Botón principal */}
            <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm p-4 rounded-full border border-white/40 shadow-spectacular hover:scale-110 transition-all duration-300">
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-white" />
                
                {/* Badge de urgencia */}
                <div className="absolute -top-2 -right-2 bg-danger-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-lg">
                  🚨 URGENTE
                </div>
              </div>
            </div>

            {/* Tooltip mejorado */}
            <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-neutral-900 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-xl border border-danger-400/30">
                <div className="font-bold text-danger-400">🚨 Carlos - Especialista en Ventas</div>
                <div className="text-neutral-300">Tu empresa pierde 83€/día</div>
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Ventana del chatbot FIJA EN TODA LA APLICACIÓN */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl shadow-2xl border border-neutral-700/50 z-[9999] flex flex-col overflow-hidden">
          {/* Header ULTRA-AGRESIVO */}
          <div className="bg-gradient-to-r from-danger-600 via-primary-600 to-success-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Target className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Carlos - Especialista IAFY</h3>
                <p className="text-primary-100 text-sm flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  🚨 URGENTE: Pierdes 83€/día
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors duration-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lead Score Indicator */}
          {leadScore > 0 && (
            <div className="bg-gradient-to-r from-success-600/20 to-primary-600/20 p-2 border-b border-neutral-700/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-success-400 font-semibold">Lead Score: {leadScore}/100</span>
                <span className="text-primary-400">Urgencia: {urgencyLevel > 3 ? '🔥 MÁXIMA' : urgencyLevel > 1 ? '⚡ ALTA' : '📊 MEDIA'}</span>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                  {message.isBot && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="w-4 h-4 text-danger-400" />
                      <span className="text-xs text-neutral-400 font-semibold">Carlos - Especialista IAFY</span>
                      <div className="w-2 h-2 bg-danger-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                  <div className={`p-4 rounded-2xl ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-danger-600/20 via-primary-600/20 to-success-600/20 border border-danger-500/30 text-white' 
                      : 'bg-gradient-to-r from-success-600 to-primary-600 text-white'
                  }`}>
                    <p className="whitespace-pre-line text-sm leading-relaxed font-medium">{message.text}</p>
                  </div>
                  
                  {/* Action buttons ULTRA-AGRESIVOS */}
                  {message.actions && (
                    <div className="mt-3 space-y-2">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleAction(action)}
                          className="block w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-danger-600 to-primary-600 hover:from-danger-500 hover:to-primary-500 text-white rounded-xl border border-danger-400/50 hover:border-danger-400 transition-all duration-200 transform hover:scale-105 font-bold shadow-lg"
                        >
                          <div className="flex items-center justify-between">
                            <span>{action.text}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Quick replies ULTRA-AGRESIVAS */}
                  {message.quickReplies && (
                    <div className="mt-3 space-y-1">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="block w-full text-left px-3 py-2 text-sm bg-neutral-800/50 hover:bg-neutral-700/50 text-neutral-300 hover:text-white rounded-lg border border-neutral-600/30 hover:border-danger-500/50 transition-all duration-200 font-medium"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {message.isBot && (
                  <div className="order-1 mr-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-danger-500 via-primary-500 to-success-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                {!message.isBot && (
                  <div className="order-2 ml-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-success-500 to-primary-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator ULTRA-AGRESIVO */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-danger-500 via-primary-500 to-success-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-danger-600/20 via-primary-600/20 to-success-600/20 border border-danger-500/30 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-danger-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-success-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input ULTRA-AGRESIVO */}
          <div className="p-4 border-t border-neutral-700/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu respuesta..."
                className="flex-1 bg-neutral-800/50 border border-neutral-600/50 rounded-xl px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:border-danger-500/50 transition-colors duration-200"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-danger-600 via-primary-600 to-success-600 hover:from-danger-500 hover:via-primary-500 hover:to-success-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Quick actions ULTRA-AGRESIVAS */}
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => handleQuickReply("🚨 DEMO URGENTE YA")}
                className="flex-1 bg-gradient-to-r from-danger-600/20 to-primary-600/20 border border-danger-500/30 text-danger-400 px-3 py-2 rounded-lg text-xs font-bold hover:bg-danger-600/30 transition-all duration-200"
              >
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                DEMO YA
              </button>
              <button
                onClick={() => handleQuickReply("¿Cuánto ganaré exactamente?")}
                className="flex-1 bg-gradient-to-r from-primary-600/20 to-success-600/20 border border-primary-500/30 text-primary-400 px-3 py-2 rounded-lg text-xs font-bold hover:bg-primary-600/30 transition-all duration-200"
              >
                <Euro className="w-3 h-3 inline mr-1" />
                ROI
              </button>
              <button
                onClick={() => openWhatsApp()}
                className="flex-1 bg-gradient-to-r from-success-600/20 to-danger-600/20 border border-success-500/30 text-success-400 px-3 py-2 rounded-lg text-xs font-bold hover:bg-success-600/30 transition-all duration-200"
              >
                <Phone className="w-3 h-3 inline mr-1" />
                LLAMAR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;