import logoPort from '@/assets/images/logo-port.png';

const PortLogo = () => {
    return (
        <div className="flex items-center space-x-3 animate-fade-in">
            <img src={logoPort} alt="Logo Port Autonome" className="h-12 w-auto rounded-sm" />
        </div>
    );
};

export default PortLogo;