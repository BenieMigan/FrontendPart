import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Ajout du hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'enregistrement
    setTimeout(() => {
      setIsLoading(false);
      console.log('Nouvel utilisateur:', { fullName, email, password, confirmPassword });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
      <CardHeader className="space-y-3 text-center pb-6">
        <CardTitle className="text-2xl font-bold text-port-navy">Inscription</CardTitle>
        <CardDescription className="text-port-navy/70 text-base">
          Créez votre compte pour accéder à l'espace de gestion
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom complet */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-port-navy font-medium">Nom complet</Label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-port-navy/50" />
              <Input
                id="fullName"
                type="text"
                placeholder="Jean Dupont"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 h-12 border-port-navy/20 focus:border-port-blue focus:ring-port-blue"
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-port-navy font-medium">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-port-navy/50" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 border-port-navy/20 focus:border-port-blue focus:ring-port-blue"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-port-navy/50 hover:text-port-navy transition-colors"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirmation mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-port-navy font-medium">Confirmer le mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-port-navy/50" />
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Répétez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 h-12 border-port-navy/20 focus:border-port-blue focus:ring-port-blue"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-port-blue hover:bg-port-blue/90 text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Création du compte...' : 'Créer un compte'}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-sm text-port-navy/70">Vous avez déjà un compte ? </span>
          <button
            onClick={() => navigate('/connexion')} // ✅ Redirection
            className="text-port-blue hover:text-port-navy font-medium text-sm underline-offset-4 hover:underline"
          >
            Se connecter
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
