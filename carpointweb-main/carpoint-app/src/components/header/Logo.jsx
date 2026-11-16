import React from 'react';
import logoImg from '../../assets/logo.png';
import './Logo.css';

export const Logo = () => {
    return (
        <a href="/" className="logo-container" style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <img src={logoImg} alt="CarPoint Logo" className="logo-image" />
        </a>
    );
};