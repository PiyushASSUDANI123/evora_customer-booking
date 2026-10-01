import React from 'react'

const AboutPage = () => {
  return (
    <div style={{ 
      padding: '4rem 0', 
      background: 'linear-gradient(180deg, #fff8f0 0%, #ffe6e2 100%)'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: '#ff6b6b', 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          marginBottom: '1rem',
          textAlign: 'center'
        }}>About Evora</h1>
        <p style={{ 
          color: '#888', 
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Welcome to Evora Restaurant. We're dedicated to providing you with the freshest, healthiest, and most delicious meals in town. Based in Balotra, Rajasthan, we serve fresh, nutritious food made with love and care.
        </p>
        <div style={{ 
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '2rem', 
          boxShadow: '0 8px 25px rgba(255, 179, 167, 0.15)',
          maxWidth: '600px', 
          margin: '0 auto'
        }}>
          <h3 style={{ color: '#ff6b6b', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Our Story</h3>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            Evora started with a simple idea — make healthy food accessible to everyone. From morning sprouts to evening snacks, every item on our menu is crafted with care using the finest local ingredients. We believe food should nourish both body and soul.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage