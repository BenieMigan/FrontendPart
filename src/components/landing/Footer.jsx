import { Mail, Phone, MapPin } from 'lucide-react';
import PortLogo from '@/components/PortLogo';

const Footer = () => {
  return (
    <footer className="bg-port-navy text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo et description */}
          <div>
            <div className="mb-4">
              <PortLogo />
            </div>
            <p className="text-white/80 leading-relaxed text-sm">
              Modernisation des services avec une plateforme numérique dédiée aux demandes de stage.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-port-gold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-port-gold flex-shrink-0" />
                <span className="text-white/80 text-sm">Boulevard de la Marina, Cotonou</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-port-gold" />
                <span className="text-white/80 text-sm">+229 21 31 25 25</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-port-gold" />
                <span className="text-white/80 text-sm">stages@portdecotonou.bj</span>
              </div>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-port-gold">Liens utiles</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://portdecotonou.bj" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-port-gold transition-colors text-sm">
                  Site officiel du Port
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-port-gold transition-colors text-sm">
                  Guide utilisateur
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright simplifié */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © 2025 Port Autonome de Cotonou. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
