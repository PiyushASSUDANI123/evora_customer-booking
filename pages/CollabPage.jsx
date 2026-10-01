import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const CollabPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dealType: 'Bulk Order',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'collabs'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'Unread'
      });
      toast.success("Request submitted successfully!");
      setFormData({ name: '', email: '', phone: '', dealType: 'Bulk Order', message: '' });
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container" style={{ paddingBottom: '5rem', paddingTop: '2rem' }}>
      <h1 className="heading-2" style={{ marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Collab & Deals</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Looking for bulk orders, catering, or brand collaborations? Drop us a message.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        
        <input 
          type="text" 
          placeholder="Your Name / Company Name" 
          required
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'rgba(0,0,0,0.03)', outline: 'none', fontWeight: '500' }}
        />
        
        <input 
          type="email" 
          placeholder="Email Address" 
          required
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'rgba(0,0,0,0.03)', outline: 'none', fontWeight: '500' }}
        />

        <input 
          type="tel" 
          placeholder="Phone Number" 
          required
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
          style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'rgba(0,0,0,0.03)', outline: 'none', fontWeight: '500' }}
        />

        <select
          value={formData.dealType}
          onChange={e => setFormData({...formData, dealType: e.target.value})}
          style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'rgba(0,0,0,0.03)', outline: 'none', fontWeight: '500', color: 'var(--text-dark)' }}
        >
          <option value="Bulk Order">Bulk Order</option>
          <option value="Event Catering">Event Catering</option>
          <option value="Brand Collaboration">Brand Collaboration</option>
          <option value="Other">Other</option>
        </select>

        <textarea 
          placeholder="Tell us about your requirements..." 
          required
          rows="4"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'rgba(0,0,0,0.03)', outline: 'none', fontWeight: '500', resize: 'none' }}
        ></textarea>

        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary-green"
          style={{ padding: '1rem', width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </motion.div>
  );
};

export default CollabPage;
