import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Minus, Plus, CreditCard, Banknote, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cart, cartTotal, updateQuantity, placeOrder } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;
    
    const success = await placeOrder({ ...formData, paymentMethod });
    if (!success) return;

    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate([50, 100, 50]);
    toast.success('Order successfully placed! 🎉', { position: 'top-center', autoClose: 2500, hideProgressBar: true, closeButton: false, style: { borderRadius: '2rem', textAlign: 'center', fontWeight: 600, fontSize: '1rem', background: 'var(--primary-pink)', color: 'white' } });
    setOrderSuccess(true);
    
    // Redirect after short delay
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (orderSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="container flex flex-col items-center justify-center text-center" 
        style={{ height: '70vh' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, delay: 0.2 }}
        >
          <CheckCircle size={80} color="var(--primary-green)" style={{ marginBottom: '1rem' }} />
        </motion.div>
        <h2 className="heading-2">Order Placed!</h2>
        <p className="text-muted" style={{ marginTop: '0.5rem' }}>Your delicious healthy meal is on the way.</p>
      </motion.div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center text-center" style={{ paddingTop: '4rem' }}>
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 className="heading-3 mb-4" style={{ marginBottom: '1rem' }}>Your Cart is Empty</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>Add some healthy meals before checking out.</p>
          <Link to="/" className="btn btn-primary-green">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '2rem' }}>
      <h1 className="heading-2" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>Checkout</h1>
      
      {/* Cart Review */}
      <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
        <h3 className="heading-3" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Order Summary</h3>
        
        <div className="flex-col gap-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center" style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <div className="flex items-center gap-3">
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245, 153, 168, 0.15)', color: 'var(--primary-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem' }}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-dark)' }}>{item.name}</div>
                  <div className="text-muted" style={{ fontSize: '0.85rem', fontWeight: '600' }}>₹{item.price}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-light" style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-xl)', padding: '0.25rem' }}>
                <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.25rem', color: 'var(--text-dark)' }}><Minus size={14} /></button>
                <span style={{ fontWeight: '700', fontSize: '0.85rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.25rem', color: 'var(--primary-green)' }}><Plus size={14} /></button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between" style={{ marginTop: '1rem', fontWeight: '800', fontSize: '1.2rem' }}>
          <span>Total:</span>
          <span style={{ color: 'var(--primary-pink)' }}>₹{cartTotal}</span>
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handlePlaceOrder}>
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
          <h3 className="heading-3" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Delivery Details</h3>
          
          <div className="flex-col gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="input-field" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-lg)', border: 'none', background: 'rgba(0,0,0,0.03)', outline: 'none', fontWeight: '500' }}
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="input-field" 
              required
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-lg)', border: 'none', background: 'rgba(0,0,0,0.03)', outline: 'none', marginTop: '1rem', fontWeight: '500' }}
            />
            <textarea 
              placeholder="Delivery Address" 
              className="input-field" 
              required
              rows="3"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-lg)', border: 'none', background: 'rgba(0,0,0,0.03)', outline: 'none', marginTop: '1rem', resize: 'none', fontWeight: '500' }}
            ></textarea>
          </div>
        </div>

        {/* Payment Method */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
          <h3 className="heading-3" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Payment Method</h3>
          
          <div className="flex-col gap-2">
            <div 
              style={{ 
                padding: '1rem', 
                border: '2px solid var(--primary-green)', 
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'rgba(103, 140, 107, 0.05)'
              }}
            >
              <Banknote color="var(--primary-green)" />
              <div style={{ fontWeight: '600' }}>Cash on Delivery</div>
            </div>

            <div 
              style={{ 
                padding: '1rem', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                opacity: 0.5,
                position: 'relative'
              }}
            >
              <CreditCard />
              <div style={{ fontWeight: '500' }}>Online Payment</div>
              <span className="badge badge-pink" style={{ position: 'absolute', right: '1rem', fontSize: '0.6rem' }}>Not Launched Yet</span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary-pink" style={{ width: '100%' }}>
          Confirm Order • ₹{cartTotal}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
