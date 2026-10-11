import React from 'react';
import DoctorCard from './DoctorCard';

export default function DoctorList({ doctors, onViewDetails, onBookAppointment }) {
  if (!doctors || doctors.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🩺</p>
        <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '8px' }}>No Doctors Found</h3>
        <p style={{ color: '#64748b' }}>Try adjusting your search criteria or selecting another specialization filter.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>
          Showing <strong>{doctors.length}</strong> available doctor{doctors.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onViewDetails={onViewDetails}
            onBookAppointment={onBookAppointment}
          />
        ))}
      </div>
    </div>
  );
}
