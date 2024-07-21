// src/Header.js
import React from 'react';
import { useLanguage } from './LanguageContext';
import './Header.css';

const Header = () => {
  const { language, changeLanguage, translations } = useLanguage();

  return (
    <header className="App-header">
      <h1>{translations[language].header}</h1>
      <div className="language-selector">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ka')}>Georgian</button>
      </div>
    </header>
  );
};

export default Header;
