import React, { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import Modal from '../components/Modal';

export default function PatientDashboardPage({
  patient,
  appointments = [],
  doctors = [],
  onNavigate,
  onCancelAppointment,
  onUpdateProfile,
  onDeleteAccount
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: patient ? patient.name : '',
    age: patient ? patient.age : '',
    gender: patient ? patient.gender : 'Male',
    phone: patient ? patient.phone : '',
    email: patient ? patient.email : '',
    address: patient ? patient.address : '',
    password: ''
  });
  const [updateMsg, setUpdateMsg] = useState('');

  if (!patient) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Patient Not Logged In</h2>
        <p style={{ color: '#64748b', marginTop: '10px' }}>Please login with your patient credentials.</p>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => onNavigate('login')}>
          Go to Login
        </button>
      </div>
    );
  }

  // Filter appointments for this patient
  const patientAppts = appointments.filter((a) => String(a.patientId) === String(patient.id));
  const todayStr = new Date().toISOString().split('T')[0];

  const upcomingAppts = patientAppts.filter(
    (a) => a.appointmentDate >= todayStr && a.status !== 'CANCELLED' && a.status !== 'COMPLETED'
  );

  const pastAppts = patientAppts.filter(
    (a) => a.appointmentDate < todayStr || a.status === 'CANCELLED' || a.status === 'COMPLETED'
  );

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile(profileForm);
      setUpdateMsg('Profile updated successfully!');
      setTimeout(() => {
        setUpdateMsg('');
        setIsEditModalOpen(false);
      }, 1200);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f766e, #0284c7)',
          borderRadius: '20px',
          color: 'white',
          padding: '32px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700' }}>
            PATIENT PORTAL
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '8px' }}>
            Welcome back, {patient.name}!
          </h1>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            Patient ID: <strong>PAT-{patient.id}</strong> • {patient.email}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className="btn"
            style={{ background: 'white', color: '#0f766e', fontWeight: '700' }}
            onClick={() => onNavigate('book')}
          >
            + Book Appointment
          </button>
          <button
            className="btn"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
            onClick={() => {
              setProfileForm({
                name: patient.name,
                age: patient.age,
                gender: patient.gender,
                phone: patient.phone,
                email: patient.email,
                address: patient.address
              });
              setIsEditModalOpen(true);
            }}
          >
            ✏️ Update Profile
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon teal">📅</div>
          <div className="metric-info">
            <h3>{upcomingAppts.length}</h3>
            <p>Upcoming Appointments</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple">📁</div>
          <div className="metric-info">
            <h3>{pastAppts.length}</h3>
            <p>Previous Consultations</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon blue">🩺</div>
          <div className="metric-info">
            <h3>{doctors.length}</h3>
            <p>Available Doctors</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Profile Details + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '36px' }}>
        {/* Patient Profile Card */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>👤 Patient Information</h3>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Full Name:</span>
              <strong style={{ color: '#1e293b' }}>{patient.name}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Age & Gender:</span>
              <strong style={{ color: '#1e293b' }}>{patient.age} yrs • {patient.gender}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Phone Number:</span>
              <strong style={{ color: '#1e293b' }}>+91 {patient.phone}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Email Address:</span>
              <strong style={{ color: '#1e293b' }}>{patient.email}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Address:</span>
              <strong style={{ color: '#1e293b', textAlign: 'right', maxWidth: '200px' }}>{patient.address}</strong>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #fecaca', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: '700', textTransform: 'uppercase' }}>Account Management</span>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Permanently remove patient record</p>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDeleteAccount && onDeleteAccount(patient.id)}
            >
              🗑️ Delete Account
            </button>
          </div>
        </div>

        {/* Action Panel */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
              ⚡ Quick Services
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '20px' }}>
              Everything you need for your clinical appointments in one place.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button className="btn btn-outline" onClick={() => onNavigate('doctors')}>
              🔍 Find Doctor
            </button>
            <button className="btn btn-primary" onClick={() => onNavigate('book')}>
              📅 Book Slot
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate('my-appointments')}>
              📋 My Appointments
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate('my-appointments')}>
              ✕ Cancel Slot
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>
            📅 Upcoming Consultations ({upcomingAppts.length})
          </h2>
          <button className="btn btn-outline btn-sm" onClick={() => onNavigate('my-appointments')}>
            View All →
          </button>
        </div>

        {upcomingAppts.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '16px', padding: '36px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>You have no upcoming appointments scheduled.</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: '12px' }} onClick={() => onNavigate('book')}>
              Book an Appointment Now
            </button>
          </div>
        ) : (
          <div className="doctors-grid">
            {upcomingAppts.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                role="patient"
                onCancel={onCancelAppointment}
              />
            ))}
          </div>
        )}
      </div>

      {/* Previous Appointments Section */}
      {pastAppts.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px' }}>
            📁 Past Consultation History
          </h2>
          <div className="doctors-grid">
            {pastAppts.slice(0, 3).map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                role="patient"
              />
            ))}
          </div>
        </div>
      )}

      {/* Update Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Patient Profile"
      >
        {updateMsg && (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
            ✓ {updateMsg}
          </div>
        )}
        <form onSubmit={handleProfileSave}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-input"
                value={profileForm.age}
                onChange={(e) => setProfileForm({ ...profileForm, age: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={profileForm.gender}
                onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Residential Address</label>
            <textarea
              rows="2"
              className="form-textarea"
              value={profileForm.address}
              onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Password (Leave blank to keep current password)</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter new password (min 6 characters)"
              value={profileForm.password}
              onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 2 }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
