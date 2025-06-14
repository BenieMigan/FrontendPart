import { User, FileText, Eye, Upload, Download } from 'lucide-react';

const steps = [
  {
    icon: User,
    title: 'Créez votre compte',
    description: 'Inscrivez-vous rapidement avec vos informations personnelles'
  },
  {
    icon: FileText,
    title: 'Faites votre demande',
    description: 'Remplissez le formulaire de demande de stage en ligne'
  },
  {
    icon: Eye,
    title: 'Suivez le traitement',
    description: 'Consultez en temps réel l\'état d\'avancement de votre demande'
  },
  {
    icon: Upload,
    title: 'Déposez les documents',
    description: 'Téléversez vos pièces justificatives en toute sécurité'
  },
  {
    icon: Download,
    title: 'Téléchargez votre convention',
    description: 'Récupérez vos documents officiels une fois validés'
  }
];

const HowItWorksSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-port-navy mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un processus simple et transparent en 5 étapes pour votre demande de stage
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-port-navy rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-port-gold rounded-full flex items-center justify-center text-port-navy font-bold text-sm">
                  {index + 1}
                </div>
                {/* Connector line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-port-gold to-port-blue/30 -translate-y-1/2 z-0" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-port-navy mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-port-navy mb-4">
              Prêt à commencer ?
            </h3>
            <p className="text-gray-600 mb-6">
              Rejoignez les centaines d'étudiants qui ont déjà bénéficié de notre plateforme numérique
            </p>
            <button className="bg-port-gold hover:bg-port-gold/90 text-port-navy font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
              Commencer ma demande
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;