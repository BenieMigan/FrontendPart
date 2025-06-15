import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simuler vérification email + envoi email
    const emailExiste = true; // À remplacer avec appel backend

    if (emailExiste) {
      setIsSubmitted(true);

      // Tu peux simuler l'envoi d'un mail ici
      setTimeout(() => {
        console.log(`Lien de réinitialisation envoyé à : ${email}`);
      }, 1000);
    } else {
      alert("Aucun compte trouvé avec cet email.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-scale-in mt-10">
      <CardHeader className="space-y-3 text-center pb-6">
        <CardTitle className="text-2xl font-bold text-port-navy">Réinitialiser le mot de passe</CardTitle>
        <CardDescription className="text-port-navy/70 text-base">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-port-navy font-medium">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-port-navy/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@portcotonou.bj"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-port-navy/20 focus:border-port-blue focus:ring-port-blue"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-port-blue hover:bg-port-blue/90 text-white font-medium"
            >
              Envoyer le lien
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-port-navy font-medium">
              📧 Un lien de réinitialisation a été envoyé à <strong>{email}</strong>.
            </p>
            <Button onClick={() => navigate('/connexion')} className="bg-port-blue text-white">
              Retour à la connexion
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
