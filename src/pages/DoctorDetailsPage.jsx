import React from 'react';

export default function DoctorDetailsPage({
  doctor,
  onNavigate,
  onBookAppointment
}) {
  if (!doctor) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>No Doctor Selected</h2>
        <p style={{ color: '#64748b', marginTop: '10px' }}>Please choose a doctor from the list.</p>
        <button
          className="btn btn-primary"
          style={{ marginTop: '20px' }}
          onClick={() => onNavigate('doctors')}
        >
          ← Back to Doctor Directory
        </button>
      </div>
    );
  }

  const isAvailable = doctor.status === 'AVAILABLE';

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <button
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '24px' }}
        onClick={() => onNavigate('doctors')}
      >
        ← Back to Doctors
      </button>

      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '36px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06)'
        }}
      >
        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '28px', marginBottom: '28px' }}>
          <img
            src={doctor.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'}
            alt={doctor.name}
            style={{ width: '130px', height: '130px', borderRadius: '16px', objectFit: 'cover', border: '3px solid #ccfbf1' }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{doctor.name}</h1>
              <span style={{
                background: isAvailable ? '#dcfce7' : '#fee2e2',
                color: isAvailable ? '#15803d' : '#b91c1c',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: '700'
              }}>
                ● {doctor.status || 'AVAILABLE'}
              </span>
            </div>

            <p style={{ color: '#0d9488', fontSize: '1.1rem', fontWeight: '700', marginTop: '4px' }}>
              {doctor.specialization}
            </p>
            <p style={{ color: '#475569', fontSize: '0.95rem' }}>{doctor.qualification}</p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>EXPERIENCE</span>
                <p style={{ fontWeight: '800', color: '#1e293b' }}>{doctor.experience} Years</p>
              </div>
              <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '20px' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>CONSULTATION FEE</span>
                <p style={{ fontWeight: '800', color: '#0f766e', fontSize: '1.2rem' }}>₹{doctor.consultationFee}</p>
              </div>
              <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '20px' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>DOCTOR ID</span>
                <p style={{ fontWeight: '800', color: '#1e293b' }}>DOC-{doctor.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Bio */}
        {doctor.bio && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Professional Biography</h3>
            <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.95rem' }}>{doctor.bio}</p>
          </div>
        )}

        {/* Contact & Clinic Availability */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>📞 Direct Contact Details</h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '8px' }}>
              <strong>Phone:</strong> +91 {doctor.phone}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              <strong>Email:</strong> {doctor.email}
            </p>
          </div>

          <div style={{ background: '#f0fdfa', padding: '20px', borderRadius: '12px', border: '1px solid #ccfbf1' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f766e', marginBottom: '12px' }}>📅 Available OPD Days</h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(doctor.availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']).map((day) => (
                <span
                  key={day}
                  style={{ background: 'white', border: '1px solid #99f6e4', color: '#0f766e', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timings */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>⏰ Scheduled Consultation Hours</h3>
          <div className="slots-grid">
            {(doctor.availableTimings || ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '04:00 PM', '04:30 PM']).map((slot) => (
              <span
                key={slot}
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Booking Action */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Ready to consult Dr. {doctor.name}?</span>
            <p style={{ fontWeight: '700', color: '#0f172a' }}>Select your date & time in the appointment booking wizard.</p>
          </div>
          <button
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '1rem' }}
            onClick={() => onBookAppointment && onBookAppointment(doctor)}
          >
            📅 Book Appointment Now
          </button>
        </div>
      </div>
    </div>
  );
}
