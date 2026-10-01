import React from 'react';
import logo from '../../assets/logo.png';

const AboutPage = () => {
  return (
    <div className="container" style={{ paddingBottom: '5rem', paddingTop: '2rem', textAlign: 'center' }}>
      <img src={logo} alt="Evora Restaurant" style={{ height: '80px', objectFit: 'contain', mixBlendMode: 'multiply', marginBottom: '1rem' }} />
      <h1 className="heading-2" style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>About Us</h1>
      
      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '1rem', marginBottom: '1.5rem' }}>
          Welcome to <span style={{ fontWeight: '700', color: 'var(--primary-pink)' }}>Evora Restaurant</span>. We are dedicated to providing you with the freshest, healthiest, and most delicious meals in town.
        </p>
        <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '1rem' }}>
          Whether you're looking for a refreshing morning start or a savory evening snack, our carefully curated menu has something special for everyone.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
