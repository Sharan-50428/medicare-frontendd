import React from 'react';
import StatusBadge from './StatusBadge';

export default function AppointmentCard({
  appointment,
  role = 'patient',
  onCancel,
  onConfirm,
  onComplete
}) {
  const isCancelled = appointment.status === 'CANCELLED';
  const isCompleted = appointment.status === 'COMPLETED';

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700' }}>
            APPT ID: #{appointment.id}
          </span>
          <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: '700', marginTop: '2px' }}>
            {role === 'doctor' ? `Patient: ${appointment.patientName}` : appointment.doctorName}
          </h4>
          <span style={{ fontSize: '0.85rem', color: '#0d9488', fontWeight: '600' }}>
            {role === 'doctor' ? `Phone: ${appointment.patientPhone || 'N/A'}` : appointment.doctorSpecialization}
          </span>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem' }}>
        <div>
          <p style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600' }}>DATE</p>
          <p style={{ fontWeight: '700', color: '#1e293b' }}>📅 {appointment.appointmentDate}</p>
        </div>
        <div>
          <p style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600' }}>TIME SLOT</p>
          <p style={{ fontWeight: '700', color: '#1e293b' }}>⏰ {appointment.appointmentTime}</p>
        </div>
      </div>

      <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: '700', marginBottom: '2px' }}>REASON FOR VISIT</p>
        <p style={{ color: '#334155' }}>{appointment.reason}</p>
      </div>

      {appointment.consultationFee && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ color: '#64748b' }}>Consultation Fee:</span>
          <span style={{ fontWeight: '800', color: '#0f766e' }}>₹{appointment.consultationFee}</span>
        </div>
      )}

      {/* Action Controls */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
        {role === 'patient' && !isCancelled && !isCompleted && (
          <button
            className="btn btn-danger btn-sm"
            style={{ width: '100%' }}
            onClick={() => onCancel && onCancel(appointment.id)}
          >
            Cancel Appointment
          </button>
        )}

        {(role === 'doctor' || role === 'admin') && (
          <>
            {appointment.status === 'BOOKED' && onConfirm && (
              <button
                className="btn btn-success btn-sm"
                style={{ flex: 1 }}
                onClick={() => onConfirm(appointment.id)}
              >
                ✓ Confirm
              </button>
            )}

            {!isCompleted && !isCancelled && onComplete && (
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => onComplete(appointment.id)}
              >
                ★ Complete
              </button>
            )}

            {!isCancelled && !isCompleted && onCancel && (
              <button
                className="btn btn-danger btn-sm"
                style={{ flex: 1 }}
                onClick={() => onCancel(appointment.id)}
              >
                ✕ Cancel
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
