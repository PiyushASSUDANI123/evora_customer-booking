import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Get cart count from backend
    fetch('/api/cart/count')
      .then(res => res.json())
      .then(data => setCartCount(data.count || 0))
      .catch(err => console.error('Failed to fetch cart count:', err))
  }, [navigate])

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/menu', label: 'Menu', icon: '🍽️' },
    { path: '/checkout', label: 'Cart', icon: '🛒', showBadge: cartCount > 0 },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ]

  return (
    <nav className="bottom-nav glass-panel" style={{ 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderTopLeftRadius: '1.25rem',
      borderTopRightRadius: '1.25rem'
    }}>
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.25rem',
            color: item.path === window.location.pathname ? '#ff6b6b' : '#888',
            fontWeight: item.path === window.location.pathname ? '600' : '500',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
      ))}
      {navItems.find(item => item.showBadge) && (
        <span style={{ 
          position: 'absolute', 
          top: '-4px', 
          right: '-4px', 
          background: '#ff6b6b', 
          color: 'white', 
          fontSize: '0.65rem', 
          fontWeight: '800', 
          width: '1.25rem', 
          height: '1.25rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '50%',
        }}>•</span>
      )}
    </nav>
  )
}

export default Navbar