import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FoodCard = ({ item, onAdd }) => {
  return (
    <motion.div 
      className="food-card"
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
      transition={{ duration: 0.3 }}
      style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        background: 'var(--bg-card)',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: 'var(--radius-xl)'
      }}
    >
      <div>
        <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-dark)', lineHeight: '1.2' }}>{item.name}</h3>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-pink)' }}>₹{item.price}</div>
        </div>
        
        <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1.5rem' }}>
          {item.description}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <span style={{ fontSize: '0.75rem', color: 'var(--primary-green)', fontWeight: '600', background: 'rgba(103,140,107,0.1)', padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {item.category}
        </span>
        
        <motion.button 
          onClick={() => onAdd(item)}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          style={{
            background: 'var(--primary-green)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(103,140,107,0.3)'
          }}
        >
          <Plus size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
