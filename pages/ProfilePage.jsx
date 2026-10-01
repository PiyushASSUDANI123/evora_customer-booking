import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="container" style={{ paddingBottom: '5rem', paddingTop: '1rem' }}>
      <h1 className="heading-2" style={{ marginBottom: '2rem' }}>My Profile</h1>
      
      <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-pink), var(--primary-pink-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <User size={30} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Guest Account</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Sign in to save orders</p>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div style={{ padding: '1.2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
          <Settings size={20} color="var(--text-muted)" />
          <span style={{ fontWeight: '500' }}>Account Settings</span>
        </div>
        <div style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', color: 'var(--primary-pink)' }}>
          <LogOut size={20} />
          <span style={{ fontWeight: '500' }}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
