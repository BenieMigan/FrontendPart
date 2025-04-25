import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <header className="bg-primary text-white py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <span className="me-4">🕒 Ouvert: 8h - 17h30</span>
          <span>📞 +229 69 85 85 85</span>
        </div>
        <div>
        <box-icon type='logo' name='twitter'></box-icon>
          <strong>Service Client</strong>
        </div>
      </div>
    </header>
  );
};

export default Header;
