import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({ name: '', phone: '', address: '', landmark: '' })
  const [savedDetails, setSavedDetails] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Load saved details from localStorage
    const saved = localStorage.getItem('userDetails')
    if (saved) {
      setUserDetails(JSON.parse(saved))
    }
  }, [])

  const handleSaveDetails = (e) => {
    e.preventDefault()
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
    setSavedDetails(userDetails)
    alert("Profile updated successfully!")
  }

  return (
    <div style={{ 
      padding: '4rem 0', 
      background: 'linear-gradient(180deg, #fff8f0 0%, #ffe6e2 100%)'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Profile Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #ff6b6b, #ff8c42)', 
          padding: '2rem', 
          borderRadius: '1.5rem', 
          marginBottom: '2rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0.5rem 0' }}>My Profile</h2>
          <p style={{ margin: '0.2rem 0', opacity: '0.9' }}>Welcome back!</p>
        </div>

        {savedDetails ? (
          <div style={{ 
            background: 'white', 
            borderRadius: '1.5rem', 
            padding: '2rem', 
            boxShadow: '0 8px 25px rgba(255, 179, 167, 0.15)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, #ff6b6b, #ff8c42)', 
                borderRadius: 'var(--radius-full)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.5rem'
              }}>
                <span>{userDetails.name ? userDetails.name[0] : 'U'}</span>
              </div>
              <div>
                <h3 style={{ margin: '0', fontSize: '1.2rem' }}>{userDetails.name || 'Guest Account'}</h3>
                <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', opacity: '0.8' }}>Joined Evora</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <p style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Phone</p>
                <p style={{ color: '#333', fontWeight: '500', fontSize: '1.1rem' }}+91 {userDetails.phone || 'Not set'}
              </div>
              <div>
                <p style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Address</p>
                <p style={{ color: '#333', fontWeight: '500', fontSize: '1.1rem' }}{userDetails.address || 'Not set'}
              </div>
            </div>

            <button 
              onClick={() => {
                const newDetails = prompt('Enter your new details (name,phone,address,landmark separated by commas):')
                if (newDetails) {
                  const [name, phone, address, landmark] = newDetails.split(',')
                  setUserDetails({ name: name.trim(), phone: phone.trim(), address: address.trim(), landmark: landmark.trim() })
                }
              }}
              style={{
                width: '100%', 
                padding: '0.8rem', 
                background: '#ffe6e2', 
                color: '#ff6b6b', 
                borderRadius: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.9rem',
                border: 'none',
                marginTop: '1rem'
              }}
            >
              Update Profile
            </button>
          </div>
        ) : (
          <div style={{ 
            background: 'white', 
            borderRadius: '1.5rem', 
            padding: '2rem', 
            boxShadow: '0 8px 25px rgba(255, 179, 167, 0.15)',
            marginBottom: '2rem'
          }}>
            <p style={{ color: '#888', fontSize: '1rem', textAlign: 'center' }}>
              Fill your details once so we can auto-fill them during checkout.
            </p>
            <form onSubmit={(e) => { 
              e.preventDefault()
              const name = e.target.elements.name.value
              const phone = e.target.elements.phone.value
              const address = e.target.elements.address.value
              const landmark = e.target.elements.landmark.value
              if (name && phone) {
                setUserDetails({ name, phone, address, landmark })
                localStorage.setItem('userDetails', JSON.stringify(userDetails))
                alert('Profile saved successfully!')
              }
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>
                  Full Name
                </label>
                <input type="text" name="name" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ffe6e2', outline: 'none', fontSize: '0.9rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>
                  Phone (10 digits)
                </label>
                <input type="tel" name="phone" required maxLength="10" pattern="[0-9]+" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ffe6e2', outline: 'none', fontSize: '0.9rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>
                  Delivery Address
                </label>
                <textarea name="address" rows="3" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ffe6e2', outline: 'none', fontSize: '0.9rem', resize: 'none' }}></textarea>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>
                  Landmark (Optional)
                </label>
                <input type="text" name="landmark" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ffe6e2', outline: 'none', fontSize: '0.9rem' }} />
              </div>
              <button type="submit" style={{
                width: '100%', 
                padding: '0.8rem', 
                background: '#ff6b6b', 
                color: 'white', 
                borderRadius: '0.75rem', 
                fontWeight: 'bold',
                fontSize: '0.9rem',
                border: 'none',
                marginTop: '1rem'
              }}>
                Save Details
              </button>
            </form>
          </div>
        )}

        {/* Order History Section */}
        <div style={{ 
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '1.5rem', 
          boxShadow: '0 8px 25px rgba(255, 179, 167, 0.15)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#ff6b6b', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Your Orders</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', textAlign: 'center' }}>
            Your order history will appear here
          </p>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage