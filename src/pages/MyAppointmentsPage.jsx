import React, { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';

export default function MyAppointmentsPage({
  appointments = [],
  currentUser,
  onCancelAppointment,
  onNavigate
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Filter for current patient
  const patientId = currentUser ? currentUser.id : 1;
  const myAppointments = appointments.filter((a) => String(a.patientId) === String(patientId));

  const filteredAppointments = myAppointments.filter((a) => {
    if (filterStatus === 'ALL') return true;
    return a.status.toUpperCase() === filterStatus.toUpperCase();
  });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a' }}>My Booked Appointments</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
            Track your appointment statuses, timings, and cancel scheduled consultations
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => onNavigate('book')}>
          + Book New Appointment
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="tabs-header">
        {['ALL', 'BOOKED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            className={`tab-btn ${filterStatus === st ? 'active' : ''}`}
            onClick={() => setFilterStatus(st)}
          >
            {st === 'ALL' ? 'All Appointments' : st}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '60px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</p>
          <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>No Appointments Found</h3>
          <p style={{ color: '#64748b' }}>
            {filterStatus === 'ALL'
              ? "You haven't scheduled any doctor appointments yet."
              : `No appointments found with status: ${filterStatus}`}
          </p>
          <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => onNavigate('book')}>
            Book an Appointment Now
          </button>
        </div>
      ) : (
        <div className="doctors-grid">
          {filteredAppointments.map((appt) => (
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
  );
}
