import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { cartCount } = useAppContext();

  const navItems = [
    { path: '/', icon: <Home size={22} />, label: 'Home' },
    { 
      path: '/checkout', 
      icon: (
        <>
          <ShoppingBag size={22} />
          {cartCount > 0 && <span className="cart-badge bounce">{cartCount}</span>}
        </>
      ), 
      label: 'Cart' 
    },
    { path: '/profile', icon: <User size={22} />, label: 'Profile' }
  ];

  return (
    <nav className="bottom-nav glass-panel">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <div className="icon-wrapper">
            {item.icon}
          </div>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
