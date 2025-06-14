import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Anchor, Ship, Container, Waves } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden p-6">
      {/* Background Image - Freepik Container Port */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/cargo-ship-container-yard_1127-3275.jpg')`
        }}
      />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-port-navy/95 via-port-navy/85 to-port-navy/75" />
      
      {/* Animated floating elements - Enhanced maritime theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-port-gold/40 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-port-gold/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Maritime elements */}
        <Ship className="absolute top-20 right-20 w-16 h-16 text-white/10 animate-float" />
        <Anchor className="absolute bottom-20 left-20 w-12 h-12 text-port-gold/20 animate-float" style={{ animationDelay: '1.5s' }} />
        <Container className="absolute top-32 left-32 w-10 h-10 text-white/15 animate-float" style={{ animationDelay: '2.5s' }} />
        <Waves className="absolute bottom-32 right-32 w-14 h-14 text-port-gold/15 animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Moving containers animation */}
        <div className="absolute bottom-10 left-0 w-8 h-4 bg-port-gold/20 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-16 right-10 w-6 h-3 bg-white/20 animate-bounce" style={{ animationDelay: '1.2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge - Maritime theme */}
          <div className="inline-flex items-center bg-port-gold/20 backdrop-blur-sm text-port-gold px-6 py-3 rounded-full text-sm font-medium mb-8 border border-port-gold/30">
            <Ship className="w-4 h-4 mr-2" />
            Plateforme Portuaire Digitale
          </div>

          {/* Main Title - Better spacing */}
          <h1 className="text-3xl md:text-6xl lg:text-6xl font-bold text-white mb-3 leading-tight">
            Dématérialisation
            <span className="text-port-gold block mt-2">des demandes de stage</span>
          </h1>

          {/* Subtitle - Maritime context */}
          <p className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed max-w-3xl mx-auto">
            Votre passerelle vers l'univers portuaire. Une <span className="text-port-gold font-medium">expérience digitale moderne</span> pour rejoindre l'écosystème maritime et logistique
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg"
              onClick={() => navigate('/connexion')}
              className="bg-port-gold hover:bg-port-gold/90 text-port-navy font-semibold px-12 py-6 text-lg rounded-xl"
            >
              Faire une demande de stage
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/connexion')}
              className="border-2 border-white text-port-navy  font-semibold px-12 py-6 text-lg rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              Se connecter
            </Button>
          </div>

          {/* Stats - Maritime focus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-port-gold mb-2">100%</div>
              <div className="text-white/90 font-medium">Digital</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-port-gold mb-2">48h</div>
              <div className="text-white/90 font-medium">Traitement express</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-port-gold mb-2">24/7</div>
              <div className="text-white/90 font-medium">Accessible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;