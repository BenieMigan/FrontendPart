import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);
        
        // Simulation d'une connexion
        setTimeout(() => {
            setIsLoading(false);
            console.log('Tentative de connexion:', { email, password });
        }, 1500);
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
        <CardHeader className="space-y-3 text-center pb-6">
            <CardTitle className="text-2xl font-bold text-port-navy">
            Connexion
            </CardTitle>
            <CardDescription className="text-port-navy/70 text-base">
            Accédez à votre espace de gestion des stages
            </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-port-navy font-medium">
                Adresse email
                </Label>
                <div className="relative flex justify-between">
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
            
            <div className="space-y-2">
                <Label htmlFor="password" className="text-port-navy font-medium">
                Mot de passe
                </Label>
                <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-port-navy/50" />
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
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
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                </div>
            </div>
            
            <Button
                type="submit"
                className="w-full h-12 bg-port-blue hover:bg-port-blue/90 text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
            >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
            </form>
            
            <div className="text-center">
            <button className="text-port-blue hover:text-port-navy transition-colors text-sm font-medium underline-offset-4 hover:underline">
                Mot de passe oublié ?
            </button>
            </div>
        </CardContent>
        </Card>
    );
};

export default LoginForm;