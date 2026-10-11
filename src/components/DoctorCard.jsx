import React from 'react';

export default function DoctorCard({ doctor, onViewDetails, onBookAppointment }) {
  const isAvailable = doctor.status === 'AVAILABLE';

  return (
    <div className="doctor-card">
      <div className="doctor-card-top">
        <img
          src={doctor.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'}
          alt={doctor.name}
          className="doctor-card-avatar"
        />
        <div className="doctor-card-info">
          <h3 className="doctor-card-name">{doctor.name}</h3>
          <p className="doctor-card-spec">{doctor.specialization}</p>
          <p className="doctor-card-qual">{doctor.qualification}</p>
        </div>
      </div>

      <div className="doctor-card-body">
        <div className="doctor-meta-row">
          <span className="doctor-meta-label">Experience:</span>
          <span className="doctor-meta-val">{doctor.experience} Years</span>
        </div>

        <div className="doctor-meta-row">
          <span className="doctor-meta-label">Consultation Fee:</span>
          <span className="doctor-fee">₹{doctor.consultationFee}</span>
        </div>

        <div className="doctor-meta-row">
          <span className="doctor-meta-label">Availability:</span>
          <span style={{ color: isAvailable ? '#16a34a' : '#dc2626', fontWeight: '700' }}>
            ● {doctor.status || 'AVAILABLE'}
          </span>
        </div>

        {doctor.availableDays && doctor.availableDays.length > 0 && (
          <div className="doctor-timings-preview">
            <strong>Days:</strong> {doctor.availableDays.slice(0, 3).join(', ')}
            {doctor.availableDays.length > 3 ? '...' : ''}
          </div>
        )}
      </div>

      <div className="doctor-card-footer">
        <button
          className="btn btn-outline btn-sm"
          style={{ flex: 1 }}
          onClick={() => onViewDetails && onViewDetails(doctor)}
        >
          View Details
        </button>
        <button
          className="btn btn-primary btn-sm"
          style={{ flex: 1.2 }}
          onClick={() => onBookAppointment && onBookAppointment(doctor)}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
