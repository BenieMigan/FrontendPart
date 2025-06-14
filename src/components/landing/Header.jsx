import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PortLogo from '@/components/PortLogo';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '#about' },
    { label: 'Faire une demande', href: '/demande-stage' },
  ];

  const handleNavigation = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <PortLogo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className="text-port-navy font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button 
              onClick={() => navigate('/connexion')}
              className="bg-port-gold hover:bg-port-gold/90 text-port-navy font-medium"
            >
              Faire une demande
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-port-navy"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="text-port-navy hover:text-port-blue font-medium text-left transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => navigate('/connexion')}
                className="bg-port-gold hover:bg-port-gold/90 text-port-navy font-medium w-full mt-4"
              >
                Faire une demande
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
