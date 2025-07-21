import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, Sparkles, Calendar, CheckCircle, Phone } from 'lucide-react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Intentar reproducir con audio primero
      const playWithAudio = async () => {
        try {
          video.muted = false;
          await video.play();
        } catch (error) {
          // Si falla con audio, intentar sin audio
          try {
            video.muted = true;
            await video.play();
          } catch (secondError) {
            console.log('Autoplay no permitido');
          }
        }
      };
      
      playWithAudio();
    }
  }, []);

  return (
    <>
      {/* Header con logo y botón demo */}
      <header className="relative z-50 py-4 bg-gradient-to-r from-slate-900/95 to-blue-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo IAFY */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                  <img 
                    src="/5841271165010691996-removebg.png" 
                    alt="IAFY Logo" 
                    className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-white font-bold text-xl">IAFY</div>
                <div className="text-blue-300 text-sm">Automatización con IA</div>
              </div>
            </div>

            {/* Botón Demo Gratis */}
            <a
              href="https://calendly.com/iafyagency/30min?month=2025-06"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Demo Gratis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 overflow-hidden">
        {/* Video de fondo */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-30"
            loop
            playsInline
            preload="metadata"
          >
            <source src="https://videomp46523.live-website.com/wp-content/uploads/2025/07/VIDEO-WEBINAR-PREVIO-A-DEMO-2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80"></div>
        </div>

        {/* Efectos de fondo */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge de urgencia */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/40 rounded-full px-8 py-4 mb-8 shadow-lg animate-pulse">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-red-300 font-bold text-lg">🚨 CRISIS MÉDICA ACTIVA</span>
            </div>

            {/* Título principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight">
              <span className="block text-white mb-4">
                Tu clínica pierde
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-blue-400 to-green-400 mb-4">
                30.000€ al año
              </span>
              <span className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                por no tener IA
              </span>
            </h1>

            {/* Subtítulo */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm p-8 rounded-3xl border border-blue-400/30 shadow-lg">
                <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 leading-relaxed mb-6">
                  Automatización médica 24/7. Atiende pacientes, agenda citas automáticamente y reduce costos hasta 2.500€/mes.
                </p>
                
                {/* Contador de pérdidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-red-900/40 to-slate-900/60 p-6 rounded-2xl border border-red-500/30">
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-red-400 font-bold">POR DÍA</span>
                    </div>
                    <div className="text-3xl font-black text-white text-center">
                      <span className="text-red-400">-83€</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/60 p-6 rounded-2xl border border-blue-500/30">
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-blue-400 font-bold">POR MES</span>
                    </div>
                    <div className="text-3xl font-black text-white text-center">
                      <span className="text-blue-400">-2.500€</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-900/40 to-slate-900/60 p-6 rounded-2xl border border-green-500/30">
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-green-400 font-bold">POR AÑO</span>
                    </div>
                    <div className="text-3xl font-black text-white text-center">
                      <span className="text-green-400">-30.000€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Beneficios clave */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-green-900/30 to-slate-900/50 p-8 rounded-3xl border border-green-500/30 shadow-lg">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Atiende pacientes 24/7</h3>
                <p className="text-slate-300">Respuesta automática a WhatsApp y llamadas sin intervención humana</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/50 p-8 rounded-3xl border border-blue-500/30 shadow-lg">
                <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Agenda citas automáticamente</h3>
                <p className="text-slate-300">Sistema inteligente que gestiona tu agenda sin errores humanos</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/50 p-8 rounded-3xl border border-purple-500/30 shadow-lg">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Reduce costos hasta 2.500€/mes</h3>
                <p className="text-slate-300">Automatiza tareas repetitivas y optimiza recursos</p>
              </div>
            </div>

            {/* CTAs principales */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a
                href="https://calendly.com/iafyagency/30min?month=2025-06"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-red-600 via-blue-600 to-green-600 hover:from-red-500 hover:via-blue-500 hover:to-green-500 rounded-2xl shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-red-400/50"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <Calendar className="w-6 h-6 mr-3" />
                  Demo gratuita en 30 minutos
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>

              <a
                href="https://wa.me/34621482256?text=Hola%2C%20tengo%20una%20cl%C3%ADnica%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20IAFY%20y%20la%20automatizaci%C3%B3n%20con%20IA."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-400 border-2 border-blue-400/50 hover:bg-blue-400/10 hover:border-blue-400 rounded-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-3" />
                Hablar por WhatsApp
              </a>
            </div>

            {/* Garantías y confianza */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium">Demo gratuita</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Implementación en 7 días</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                <span className="font-medium">Sin permanencia</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-yellow-400" />
                <span className="font-medium">+20 clínicas confían en nosotros</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;