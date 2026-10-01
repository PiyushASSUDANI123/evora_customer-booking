import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    // Fetch menu from backend
    fetch('/api/menu')
      .then(res => res.json())
      .then(items => {
        setMenuItems(items)
      })
      .catch(err => console.error('Failed to fetch menu:', err))
  }, [])

  const CATEGORIES = ['All', 'Morning', 'Evening']

  const filteredMenu = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #fff8f0 0%, #ffe6e2 100%)',
      padding: '2rem 0'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          color: '#ff6b6b', 
          fontSize: '2rem', 
          fontWeight: '800', 
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>Our Menu</h2>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {CATEGORIES.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '0.75rem 1.5rem', 
                background: activeCategory === category ? '#ff6b6b' : '#ffe6e2',
                color: activeCategory === category ? 'white' : '#ff6b6b',
                borderRadius: '2rem',
                fontWeight: '600',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {menuItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 1rem', 
            color: '#888',
            fontSize: '1rem'
          }}>
            <p>Loading menu...</p>
            <p>Menu items will appear once the admin adds them.</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem'
          }}>
            {filteredMenu.map(item => (
              <div 
                key={item.id}
                style={{
                  background: 'white', 
                  borderRadius: '1rem', 
                  padding: '1.5rem', 
                  boxShadow: '0 4px 15px rgba(255, 179, 167, 0.15)',
                  border: '1px solid #ffe6e2',
                  transition: 'all 0.3s ease',
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ 
                    color: '#ff6b6b', 
                    fontSize: '1.1rem', 
                    fontWeight: '700', 
                    marginBottom: '0.25rem'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    {item.description || 'Fresh and delicious'}
                  </p>
                  <span style={{ 
                    color: '#ff6b6b', 
                    fontWeight: '600', 
                    fontSize: '0.85rem'
                  }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    color: '#ff6b6b', 
                    fontWeight: '700', 
                    fontSize: '1.2rem'
                  }}>
                    ₹{item.price}
                  </span>
                  <Link 
                    to={`/cart/add/${item.id}`} 
                    style={{
                      padding: '0.5rem 1rem', 
                      background: '#ff6b6b', 
                      color: 'white', 
                      borderRadius: '0.5rem', 
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      textDecoration: 'none'
                    }}
                  >
                    Add
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuPage