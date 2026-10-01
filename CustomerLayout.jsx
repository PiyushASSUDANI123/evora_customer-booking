import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Navbar from './components/Navbar';
import './customer.css';
import logo from '../assets/logo.png';
import rightLogo from '../assets/right-logo.png';
import { ToastContainer, Slide } from 'react-toastify';

const CustomerLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="customer-app">
      {/* Top Header */}
      <header className="top-header" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'var(--bg-main)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container flex justify-between items-center" style={{ padding: '0.75rem 1rem' }}>
          
          {/* Left Side: Main Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Evora Logo" style={{ height: '55px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </Link>

          {/* Right Side: Right Image + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
            <img src={rightLogo} alt="Special" style={{ height: '40px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
            
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Small Dropdown Menu */}
            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: '120%',
                right: '0',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-lg)',
                borderRadius: 'var(--radius-md)',
                minWidth: '150px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                zIndex: 200
              }}>
                <Link to="/" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '1rem', color: 'var(--text-dark)', fontWeight: '500', borderBottom: '1px solid var(--border-color)' }}>Home</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '1rem', color: 'var(--text-dark)', fontWeight: '500', borderBottom: '1px solid var(--border-color)' }}>About Us</Link>
                <Link to="/collab" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '1rem', color: 'var(--primary-pink)', fontWeight: '600' }}>Collab & Deals</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container" style={{ flex: 1, paddingTop: '1rem' }}>
        <Outlet />
      </main>
      
      
      {/* Bottom Navigation */}
      <Navbar />
      <ToastContainer 
        toastClassName="glass-panel" 
        limit={3}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
    </div>
  );
};

export default CustomerLayout;
