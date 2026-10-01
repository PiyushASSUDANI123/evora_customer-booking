import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: ''
  })
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => {
    // Save form data locally on change
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      localStorage.setItem('checkoutDetails', JSON.stringify(formData))
    }
    
    ;['name', 'phone', 'address', 'landmark'].forEach(field => {
      const el = document.querySelector(`input[name="${field}"]`)
      if (el) el.addEventListener('change', handleChange)
    })
  }, [])

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: window.featuredItems || [],
          total: 0, // Will be calculated from cart
          status: 'Pending'
        })
      })
      const result = await response.json()
      
      if (response.ok) {
        setOrderSuccess(true)
        localStorage.removeItem('checkoutDetails')
        setTimeout(() => navigate('/'), 2000)
      } else {
        alert('Failed to place order: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Error placing order. Please try again.')
    }
  }

  if (orderSuccess) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #ffffff 0%, #ffe6e2 100%)'
      }}>
        <div style={{
          background: 'white', 
          padding: '3rem', 
          borderRadius: '2rem', 
          boxShadow: '0 8px 25px rgba(255, 179, 167, 0.2)',
          maxWidth: '500px', 
          width: '100%'
        }}>
          <div style={{ width: '80px', height: '80px', background: '#ff6b6b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7h20l-8-5zM2 21h20v2H2v-2zm10-8h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v3h-2v-3z"/></svg>
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Order Placed!</h2>
          <p style={{ color: '#888', marginBottom: '1.5rem' }}>Your order has been successfully placed!</p>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Order ID: #ORD-{{ Date.now() % 10000 }}</p>
          <button 
            onClick={() => navigate('/')} 
            style={{
              padding: '0.8rem 2rem', 
              background: '#ff6b6b', 
              color: 'white', 
              borderRadius: '1rem', 
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              marginTop: '1rem'
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  // Check if cart has items (from localStorage)
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  
  if (cart.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 1rem',
        color: '#888'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h2>
        <p>Add some healthy meals before checking out.</p>
        <Link to="/menu" style={{ 
          padding: '0.8rem 1.5rem', 
          background: '#ff6b6b', 
          color: 'white', 
          borderRadius: '0.5rem', 
          fontWeight: 'bold',
          textDecoration: 'none'
        }}>
          Browse Menu
        </Link>
      </div>
    )
  }

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
        }}>Checkout</h2>

        <div style={{ 
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '2rem', 
          boxShadow: '0 8px 25px rgba(255, 179, 167, 0.15)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ 
            color: '#ff6b6b', 
            fontSize: '1.2rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>Order Summary</h3>
          
          {cart.length > 0 ? (
            cart.map((item, idx) => (
              <div 
                key={item.id}
                style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '0.75rem 0',
                  borderBottom: '1px solid #ffe6e2'
                }}
              >
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span style={{ 
                  color: '#ff6b6b', 
                  fontWeight: '700'
                }>₹{item.price * item.quantity}</span>
              </div>
            ))
          ) : (
            <p style={{ 
              textAlign: 'center', 
              color: '#888', 
              margin: '1rem 0'
            }}>No items in cart</p>
          )}

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '1rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid #ffe6e2'
          }}>
            <span>Total</span>
            <span style={{ 
              color: '#ff6b6b', 
              fontWeight: '800', 
              fontSize: '1.2rem'
            }>₹{cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}</span>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} style={{
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '2rem', 
          boxShadow: '0 8px 25px rgba(255, 179, 167, 0.15)',
          maxWidth: '500px', 
          margin: '0 auto'
        }}>
          <h3 style={{ 
            color: '#ff6b6b', 
            fontSize: '1.2rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>Delivery Details</h3>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              color: '#555', 
              marginBottom: '0.5rem'
            }}>
              Full Name
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                marginBottom: '0.75rem'
              }}
              required
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
              Phone (10 digits)
            </label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                marginBottom: '0.75rem'
              }}
              required
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
              Delivery Address
            </label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                resize: 'none',
                height: '100px',
                marginBottom: '0.75rem'
              }}
              required
            ></textarea>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              color: '#555', 
              marginBottom: '0.5rem'
            }}>
              Landmark (Optional)
            </label>
            <input 
              type="text" 
              name="landmark" 
              value={formData.landmark} 
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} 
              style={{
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #ffe6e2', 
                outline: 'none', 
                fontSize: '0.9rem',
                marginBottom: '0.75rem'
              }}
            />
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%', 
              padding: '0.8rem', 
              background: '#ff6b6b', 
              color: 'white', 
              borderRadius: '0.75rem', 
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              marginTop: '1rem'
            }}
          >
            Place Order • ₹{cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage