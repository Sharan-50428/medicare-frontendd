import React, { useState } from 'react';

export default function LoginForm({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // patient, doctor, admin
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email or username is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    try {
      setLoading(true);
      await onLogin({ email: email.trim(), password, role });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'patient') {
      setEmail('rohan@gmail.com');
      setPassword('rohan123');
    } else if (selectedRole === 'doctor') {
      setEmail('rahul.sharma@medicare.com');
      setPassword('password123');
    } else if (selectedRole === 'admin') {
      setEmail('admin');
      setPassword('admin123');
    }
    setError('');
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Account Login</h2>
      <p className="form-subtitle">Enter your credentials to access the MediCare Portal</p>

      {/* Role Selection Tabs */}
      <div className="tabs-header" style={{ marginBottom: '20px' }}>
        <button
          type="button"
          className={`tab-btn ${role === 'patient' ? 'active' : ''}`}
          onClick={() => setRole('patient')}
        >
          👤 Patient
        </button>
        <button
          type="button"
          className={`tab-btn ${role === 'doctor' ? 'active' : ''}`}
          onClick={() => setRole('doctor')}
        >
          🩺 Doctor
        </button>
        <button
          type="button"
          className={`tab-btn ${role === 'admin' ? 'active' : ''}`}
          onClick={() => setRole('admin')}
        >
          ⚙️ Admin
        </button>
      </div>

      {/* Quick Viva Demo Helper Buttons */}
      <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '18px' }}>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
          VIVA DEMO: CLICK TO AUTOFILL TEST CREDENTIALS:
        </span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="demo-btn"
            style={{ color: '#0f766e', borderColor: '#99f6e4', background: '#ccfbf1' }}
            onClick={() => autofillDemo('patient')}
          >
            Autofill Patient (Rohan)
          </button>
          <button
            type="button"
            className="demo-btn"
            style={{ color: '#0369a1', borderColor: '#bae6fd', background: '#e0f2fe' }}
            onClick={() => autofillDemo('doctor')}
          >
            Autofill Doctor (Dr. Rahul)
          </button>
          <button
            type="button"
            className="demo-btn"
            style={{ color: '#7e22ce', borderColor: '#e9d5ff', background: '#f3e8ff' }}
            onClick={() => autofillDemo('admin')}
          >
            Autofill Admin
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">{role === 'admin' ? 'Username or Email' : 'Email Address'}</label>
          <input
            type={role === 'admin' ? 'text' : 'email'}
            className="form-input"
            placeholder={role === 'admin' ? 'admin' : 'name@example.com'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '10px' }}
          disabled={loading}
        >
          {loading ? 'Authenticating...' : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
        </button>

        {role === 'patient' && (
          <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.88rem', color: '#64748b' }}>
            New patient?{' '}
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: '#0d9488', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={onSwitchToRegister}
            >
              Create an account here
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
