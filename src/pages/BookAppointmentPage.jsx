import React, { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';

export default function BookAppointmentPage({
  doctors = [],
  selectedDoctor,
  existingAppointments = [],
  currentUser,
  onBookAppointment,
  onNavigate
}) {
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const handleBooking = async (formData) => {
    const result = await onBookAppointment(formData);
    setBookingSuccess(result || formData);
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {bookingSuccess ? (
        <div className="form-card" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '1.8rem', color: '#0f766e', fontWeight: '800', marginBottom: '8px' }}>
            Appointment Booked Successfully!
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '24px' }}>
            Your consultation has been confirmed. You will receive an SMS and email notification.
          </p>

          <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '12px', padding: '20px', textAlign: 'left', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Date & Time:</span>
              <strong style={{ color: '#0f172a' }}>{bookingSuccess.appointmentDate} at {bookingSuccess.appointmentTime}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Doctor:</span>
              <strong style={{ color: '#0f766e' }}>{bookingSuccess.doctorName || 'Selected Doctor'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Specialization:</span>
              <strong style={{ color: '#1e293b' }}>{bookingSuccess.doctorSpecialization || 'Clinical Specialist'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Status:</span>
              <span style={{ color: '#0284c7', fontWeight: '800' }}>● BOOKED</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => {
                setBookingSuccess(null);
                onNavigate('my-appointments');
              }}
            >
              View My Appointments
            </button>
            <button
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={() => {
                setBookingSuccess(null);
                onNavigate('doctors');
              }}
            >
              Browse Other Doctors
            </button>
          </div>
        </div>
      ) : (
        <AppointmentForm
          doctors={doctors}
          selectedDoctorId={selectedDoctor ? selectedDoctor.id : null}
          existingAppointments={existingAppointments}
          patientId={currentUser ? currentUser.id : 1}
          onBookAppointment={handleBooking}
          onCancel={() => onNavigate('doctors')}
        />
      )}
    </div>
  );
}
