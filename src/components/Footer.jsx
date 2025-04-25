import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          
          {/* Newsletter */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Rejoignez notre Newsletter</h5>
            <input
              type="email"
              className="form-control my-2"
              placeholder="Ajoutez votre Email..."
            />
            <button className="btn btn-primary">S’inscrire</button>
          </div>

          {/* Siège */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Siège</h5>
            <p>Direction Générale du Port Autonome de Cotonou</p>
            <p>Boulevard de la Marina | BP 927 Cotonou, Bénin</p>
            <p>Tél : +229 21 31 21 93</p>
            <p>Email : <a href="mailto:contact@pac.bj" className="text-white">contact@pac.bj</a></p>
          </div>

          {/* Liens utiles */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Liens utiles</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Foire aux Questions</a></li>
              <li><a href="#" className="text-white text-decoration-none">A propos de nous</a></li>
              <li><a href="#" className="text-white text-decoration-none">Carrières</a></li>
              <li><a href="#" className="text-white text-decoration-none">Le port en marche</a></li>
              <li><a href="#" className="text-white text-decoration-none">Actualités</a></li>
              <li><a href="#" className="text-white text-decoration-none">Nous contacter</a></li>
              <li><a href="#" className="text-white text-decoration-none">Annonces</a></li>
            </ul>
          </div>

          {/* Bureau du Niger */}
          <div className="col-md-6 mt-4">
            <h5 className="text-uppercase">Bureau du Niger</h5>
            <p>16 Rue de la Côte d’Ivoire. BP: 12 963, Niamey</p>
            <p>Tél: +227 20 74 09 85 | 90 95 26 00</p>
          </div>

          {/* Bureau du Burkina Faso */}
          <div className="col-md-6 mt-4">
            <h5 className="text-uppercase">Bureau du Burkina-Faso</h5>
            <p>Immeuble SODIFA, Av. Kwame Nkrumah, Koulouba, Ouagadougou</p>
            <p>Tél: +226 78 83 31 44 | 25 30 45 15</p>
          </div>

          {/* En savoir plus */}
          <div className="col-12 mt-4">
            <h5 className="text-uppercase">En savoir plus</h5>
            <ul className="list-inline">
              <li className="list-inline-item me-3"><a href="#" className="text-white text-decoration-none">Services Vracs</a></li>
              <li className="list-inline-item me-3"><a href="#" className="text-white text-decoration-none">Charte Graphique</a></li>
              <li className="list-inline-item me-3"><a href="#" className="text-white text-decoration-none">Galerie photos</a></li>
              <li className="list-inline-item me-3"><a href="#" className="text-white text-decoration-none">Mentions légales</a></li>
              <li className="list-inline-item"><a href="#" className="text-white text-decoration-none">Cookies</a></li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Port Autonome de Cotonou. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
