import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  useEffect(() => {
    // Fetch featured items from backend
    fetch('/api/menu/featured')
      .then(res => res.json())
      .then(items => {
        // Store for rendering
        window.featuredItems = items
      })
      .catch(err => console.error('Failed to fetch menu:', err))
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #fff8f0 0%, #ffe6e2 100%)',
      padding: '4rem 0'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '900', 
          background: 'linear-gradient(135deg, #ff6b6b, #ff8c42)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>Evora Restaurant</h1>
        <p style={{ 
          color: '#888', 
          fontSize: '1.2rem', 
          textAlign: 'center',
          marginBottom: '2rem'
        }}>Fresh, healthy & delicious meals made with love</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {window.featuredItems && window.featuredItems.map((item, idx) => (
            <div 
              key={item.id} 
              style={{
                background: 'white', 
                borderRadius: '1.5rem', 
                padding: '1.5rem', 
                boxShadow: '0 4px 15px rgba(255, 179, 167, 0.15)',
                transition: 'all 0.3s ease',
                border: '1px solid #ffe6e2'
              }}
            >
              <h3 style={{ 
                color: '#ff6b6b', 
                fontSize: '1.1rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem'
              }}>
                {item.name}
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {item.description || 'Fresh and delicious'}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <span style={{ 
                  color: '#ff6b6b', 
                  fontWeight: '700', 
                  fontSize: '1.2rem'
                }>₹{item.price}</span>
                <Link 
                  to={`/menu/${item.id}`} 
                  style={{
                    padding: '0.5rem 1rem', 
                    background: '#ff6b6b', 
                    color: 'white', 
                    borderRadius: '0.5rem', 
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '2rem', 
          boxShadow: '0 8px 25px rgba(255, 179, 167, 0.15)',
          maxWidth: '500px', 
          margin: '0 auto'
        }}>
          <h2 style={{ 
            color: '#ff6b6b', 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            textAlign: 'center', 
            marginBottom: '1rem'
          }}>Special Today</h2>
          <p style={{ 
            color: '#888', 
            textAlign: 'center', 
            fontSize: '1rem',
            marginBottom: '1.5rem'
          }}>Ask our staff about today's specials!</p>
          <button 
            onClick={() => alert('Contact us for today specials!')} 
            style={{
              width: '100%', 
              padding: '0.8rem', 
              background: '#ff6b6b', 
              color: 'white', 
              borderRadius: '0.75rem', 
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none'
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage