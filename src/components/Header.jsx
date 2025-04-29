import React from 'react';
//import './Header.css';  

const Header = () => {
  return (
    <header className="bg-primary text-white py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <a href="tel:+22969858585" className="text-white me-4 no-underline">🕒 Ouvert: 8h - 17h30</a>
          <a href="tel:+22969858585" className="text-white no-underline">📞 +229 69 85 85 85</a>
        </div>
        <div>
          <a href="mailto:service@exemple.com" className="text-white no-underline">
            <strong>Service Client</strong>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
