import { Anchor, Waves } from 'lucide-react';

const PortLogo = () => {
    return (
        <div className="flex items-center space-x-3 animate-fade-in">
        <div className="relative">
            <div className="w-12 h-12 bg-port-navy rounded-full flex items-center justify-center shadow-lg">
            <Anchor className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-port-blue rounded-full flex items-center justify-center">
            <Waves className="w-3 h-3 text-white" />
            </div>
        </div>
        <div className="text-port-navy">
            <h1 className="text-xl font-bold leading-tight">Port Autonome</h1>
            <p className="text-sm font-medium text-port-blue leading-tight">de Cotonou</p>
        </div>
        </div>
    );
};

export default PortLogo;