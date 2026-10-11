import React, { useState } from 'react';

export default function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Patient name is required.';
    else if (formData.name.length < 2) errs.name = 'Name must be at least 2 characters.';

    if (!formData.age) errs.age = 'Age is required.';
    else if (Number(formData.age) < 1 || Number(formData.age) > 130) errs.age = 'Age must be between 1 and 130.';

    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(formData.phone.trim())) errs.phone = 'Phone must be exactly 10 digits.';

    if (!formData.email.trim()) errs.email = 'Email address is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) errs.email = 'Please enter a valid email address.';

    if (!formData.address.trim()) errs.address = 'Residential address is required.';

    if (!formData.password) errs.password = 'Password is required.';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters.';

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    try {
      setLoading(true);
      await onRegister(formData);
    } catch (err) {
      setSubmitError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card" style={{ maxWidth: '650px' }}>
      <h2 className="form-title">Patient Registration</h2>
      <p className="form-subtitle">Register a new patient account to book and manage consultations</p>

      {submitError && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem' }}>
          ⚠️ {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="e.g., Rohan Mehta"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Age *</label>
            <input
              type="number"
              name="age"
              className="form-input"
              placeholder="e.g., 28"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p className="form-error">{errors.age}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Gender *</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Phone Number (10 digits) *</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="rohan@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Residential Address *</label>
          <textarea
            name="address"
            rows="2"
            className="form-textarea"
            placeholder="Flat 402, Green Glen Layout, Bangalore"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="form-error">{errors.address}</p>}
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Password (min 6 chars) *</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '10px' }}
          disabled={loading}
        >
          {loading ? 'Registering Patient...' : 'Register Patient'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.88rem', color: '#64748b' }}>
          Already have an account?{' '}
          <button
            type="button"
            style={{ background: 'none', border: 'none', color: '#0d9488', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={onSwitchToLogin}
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
