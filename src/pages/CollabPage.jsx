import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CollabPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dealType: 'Bulk Order',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Send to backend instead of direct Firebase
      await fetch('/api/collabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'Unread',
          createdAt: new Date().toISOString()
        })
      })
      alert("Request submitted successfully!")
      setFormData({ name: '', email: '', phone: '', dealType: 'Bulk Order', message: '' })
    } catch (error) {
      console.error("Error submitting form: ", error)
      alert("Failed to submit request.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      padding: '4rem 0', 
      background: 'linear-gradient(180deg, #fff8f0 0%, #ffe6e2 100%)'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: '#ff6b6b', 
          fontSize: '2rem', 
          fontWeight: '800', 
          marginBottom: '1rem'
        }}>Collab & Deals</h1>
        <p style={{ 
          color: '#888', 
          fontSize: '1rem', 
          marginBottom: '2rem'
        }}>Looking for bulk orders, catering, or brand collaborations? Drop us a message.</p>

        <form onSubmit={handleSubmit} style={{
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '2rem', 
          boxShadow: '0 8px 25px rgba(255, 179, 167, 0.15)',
          maxWidth: '500px', 
          margin: '0 auto'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              color: '#555', 
              marginBottom: '0.5rem'
            }}>
              Your Name / Company Name
            </label>
            <input 
              type="text" 
              required 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              color: '#555', 
              marginBottom: '0.5rem'
            }}>
              Email Address
            </label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              color: '#555', 
              marginBottom: '0.5rem'
            }}>
              Phone Number
            </label>
            <input 
              type="tel" 
              required 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
              }}
              maxLength="10"
              placeholder="9876543210"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              color: '#555', 
              marginBottom: '0.5rem'
            }}>
              Deal Type
            </label>
            <select 
              value={formData.dealType} 
              onChange={(e) => setFormData({ ...formData, dealType: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
              }}
            >
              <option value="Bulk Order">Bulk Order</option>
              <option value="Event Catering">Event Catering</option>
              <option value="Brand Collaboration">Brand Collaboration</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              color: '#555', 
              marginBottom: '0.5rem'
            }}>
              Tell us about your requirements
            </label>
            <textarea 
              required 
              rows="4" 
              value={formData.message} 
              onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                resize: 'none',
                marginBottom: '0.5rem'
              }}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%', 
              padding: '0.8rem', 
              background: '#ff6b6b', 
              color: 'white', 
              borderRadius: '0.75rem', 
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              marginTop: '0.5rem'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CollabPage