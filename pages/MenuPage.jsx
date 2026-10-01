import React, { useState } from 'react';
import FoodCard from '../components/FoodCard';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

// Mock Data
const MOCK_MENU = [
  { id: 1, name: "Sprouts", price: 30, description: "Fresh and healthy sprouts packed with nutrients.", category: "Morning" },
  { id: 2, name: "Fruit chat", price: 50, description: "Mixed seasonal fruits with a tangy chat masala.", category: "Morning" },
  { id: 3, name: "Coconut milk", price: 50, description: "Pure, fresh, and hydrating coconut milk.", category: "Morning" },
  { id: 4, name: "Cold coco", price: 60, description: "Chilled, thick, and creamy chocolate coco.", category: "Morning" },
  { id: 5, name: "Cold coco", price: 60, description: "Chilled, thick, and creamy chocolate coco.", category: "Evening" },
  { id: 6, name: "Chips chat small", price: 50, description: "Crispy chips chat with our signature spices.", category: "Evening" },
  { id: 7, name: "Chips chat medium", price: 70, description: "Crispy chips chat with our signature spices.", category: "Evening" },
  { id: 8, name: "Chips chat large", price: 100, description: "Crispy chips chat with our signature spices.", category: "Evening" }
];

const CATEGORIES = ["All", "Morning", "Evening"];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useAppContext();

  const handleCategorySwitch = (category) => {
    if (activeCategory === category) return;
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(30);
    setActiveCategory(category);
    toast.info(`Viewing ${category}`, { position: 'top-center', autoClose: 1000, hideProgressBar: true, closeButton: false, style: { borderRadius: '2rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem' } });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const filteredMenu = activeCategory === "All"
    ? MOCK_MENU
    : MOCK_MENU.filter(item => item.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
        <motion.h1
          className="heading-2"
          style={{ marginBottom: '0.5rem' }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          Good Meal, <br />
          <span style={{ color: 'var(--primary-pink)' }}>Foodie</span>
        </motion.h1>
        <motion.p
          className="text-muted"
          style={{ fontSize: '0.9rem' }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
        >
          What healthy meal are you craving today?
        </motion.p>
      </section>

      {/* Category Scroller */}
      <div className="category-list hide-scrollbar">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`category-chip ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategorySwitch(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="menu-grid" style={{ paddingBottom: '3rem' }}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          layout
        >
          <AnimatePresence>
            {filteredMenu.map(item => (
              <FoodCard key={item.id} item={item} onAdd={handleAddToCart} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default MenuPage;
