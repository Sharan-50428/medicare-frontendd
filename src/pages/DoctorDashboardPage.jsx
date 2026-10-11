import React, { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';

export default function DoctorDashboardPage({
  doctor,
  appointments = [],
  onConfirmAppointment,
  onCancelAppointment,
  onCompleteAppointment,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('ALL');

  if (!doctor) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Doctor Not Logged In</h2>
        <p style={{ color: '#64748b', marginTop: '10px' }}>Please login with doctor credentials.</p>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => onNavigate('login')}>
          Go to Login
        </button>
      </div>
    );
  }

  // Filter appointments for this doctor
  const doctorAppts = appointments.filter((a) => String(a.doctorId) === String(doctor.id));

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppts = doctorAppts.filter((a) => a.appointmentDate === todayStr);
  const upcomingAppts = doctorAppts.filter((a) => a.appointmentDate >= todayStr && a.status !== 'CANCELLED');
  const completedAppts = doctorAppts.filter((a) => a.status === 'COMPLETED');

  const displayedAppts = doctorAppts.filter((a) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'TODAY') return a.appointmentDate === todayStr;
    if (activeTab === 'BOOKED') return a.status === 'BOOKED';
    if (activeTab === 'CONFIRMED') return a.status === 'CONFIRMED';
    if (activeTab === 'COMPLETED') return a.status === 'COMPLETED';
    if (activeTab === 'CANCELLED') return a.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {/* Doctor Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b, #0f766e)',
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
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <img
            src={doctor.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'}
            alt={doctor.name}
            style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover', border: '3px solid #99f6e4' }}
          />
          <div>
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700' }}>
              DOCTOR CLINICAL DASHBOARD
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px' }}>{doctor.name}</h1>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
              {doctor.specialization} • {doctor.qualification} • Fee: ₹{doctor.consultationFee}
            </p>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 18px', borderRadius: '12px', textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>OPD Availability</span>
          <p style={{ fontWeight: '700', color: '#5eead4' }}>
            {doctor.availableDays ? doctor.availableDays.join(', ') : 'Mon - Fri'}
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon blue">📅</div>
          <div className="metric-info">
            <h3>{todayAppts.length}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon teal">⏳</div>
          <div className="metric-info">
            <h3>{upcomingAppts.length}</h3>
            <p>Upcoming Schedule</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple">✓</div>
          <div className="metric-info">
            <h3>{completedAppts.length}</h3>
            <p>Consultations Completed</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon amber">👥</div>
          <div className="metric-info">
            <h3>{doctorAppts.length}</h3>
            <p>Total Patient Bookings</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tabs-header">
        <button className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`} onClick={() => setActiveTab('ALL')}>
          All Appointments ({doctorAppts.length})
        </button>
        <button className={`tab-btn ${activeTab === 'TODAY' ? 'active' : ''}`} onClick={() => setActiveTab('TODAY')}>
          Today's Appointments ({todayAppts.length})
        </button>
        <button className={`tab-btn ${activeTab === 'BOOKED' ? 'active' : ''}`} onClick={() => setActiveTab('BOOKED')}>
          Pending Confirmation ({doctorAppts.filter(a => a.status === 'BOOKED').length})
        </button>
        <button className={`tab-btn ${activeTab === 'CONFIRMED' ? 'active' : ''}`} onClick={() => setActiveTab('CONFIRMED')}>
          Confirmed ({doctorAppts.filter(a => a.status === 'CONFIRMED').length})
        </button>
        <button className={`tab-btn ${activeTab === 'COMPLETED' ? 'active' : ''}`} onClick={() => setActiveTab('COMPLETED')}>
          Completed ({completedAppts.length})
        </button>
      </div>

      {displayedAppts.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '60px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🩺</p>
          <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>No Appointments Found</h3>
          <p style={{ color: '#64748b' }}>No patient bookings match this status filter.</p>
        </div>
      ) : (
        <div className="doctors-grid">
          {displayedAppts.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              role="doctor"
              onConfirm={onConfirmAppointment}
              onCancel={onCancelAppointment}
              onComplete={onCompleteAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
