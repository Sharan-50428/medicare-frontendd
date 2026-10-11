import React, { useState, useEffect } from 'react';

export default function AppointmentForm({
  doctors,
  selectedDoctorId,
  existingAppointments = [],
  patientId,
  onBookAppointment,
  onCancel
}) {
  const [doctorId, setDoctorId] = useState(selectedDoctorId || (doctors[0] ? doctors[0].id : ''));
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync when selectedDoctorId prop changes
  useEffect(() => {
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId);
    }
  }, [selectedDoctorId]);

  // Today's minimum date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const currentDoctor = doctors.find((d) => String(d.id) === String(doctorId)) || doctors[0];

  // Calculate day of week for selected date
  let dayOfWeek = '';
  let isDoctorAvailableOnDay = true;
  if (appointmentDate) {
    const parts = appointmentDate.split('-');
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayOfWeek = days[dateObj.getDay()];

    if (currentDoctor && currentDoctor.availableDays) {
      isDoctorAvailableOnDay = currentDoctor.availableDays.some(
        (d) => d.toLowerCase() === dayOfWeek.toLowerCase()
      );
    }
  }

  // Doctor timings
  const timings = currentDoctor && currentDoctor.availableTimings ? currentDoctor.availableTimings : [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  // Identify already booked slots for this doctor on the selected date
  const bookedSlots = existingAppointments
    .filter(
      (a) =>
        String(a.doctorId) === String(doctorId) &&
        a.appointmentDate === appointmentDate &&
        a.status !== 'CANCELLED'
    )
    .map((a) => a.appointmentTime);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!doctorId) {
      setError('Please select a doctor.');
      return;
    }
    if (!appointmentDate) {
      setError('Please select an appointment date.');
      return;
    }
    if (appointmentDate < todayStr) {
      setError('Appointment date cannot be in the past.');
      return;
    }
    if (!isDoctorAvailableOnDay) {
      setError(`${currentDoctor.name} is not available on ${dayOfWeek}s. Please choose an available day.`);
      return;
    }
    if (!selectedTime) {
      setError('Please choose an available time slot.');
      return;
    }
    if (bookedSlots.includes(selectedTime)) {
      setError(`Slot ${selectedTime} is already booked for this doctor. Please pick another time.`);
      return;
    }
    if (!reason.trim()) {
      setError('Please enter the reason for your visit.');
      return;
    }

    try {
      setLoading(true);
      await onBookAppointment({
        patientId: patientId || 1,
        doctorId: Number(doctorId),
        appointmentDate,
        appointmentTime: selectedTime,
        reason: reason.trim()
      });
    } catch (err) {
      setError(err.message || 'Failed to book appointment. Please check availability.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card" style={{ maxWidth: '680px' }}>
      <h2 className="form-title">Book a Medical Appointment</h2>
      <p className="form-subtitle">Choose your specialist, select date & time slot, and confirm consultation</p>

      {error && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '18px', fontSize: '0.88rem' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Select Doctor */}
        <div className="form-group">
          <label className="form-label">Step 1: Select Doctor *</label>
          <select
            className="form-select"
            value={doctorId}
            onChange={(e) => {
              setDoctorId(e.target.value);
              setSelectedTime('');
            }}
          >
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialization} (Fee: ₹{d.consultationFee})
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Summary Preview */}
        {currentDoctor && (
          <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ color: '#0f766e', fontSize: '1rem', fontWeight: '700' }}>{currentDoctor.name}</h4>
                <p style={{ color: '#0d9488', fontSize: '0.85rem' }}>{currentDoctor.specialization} • {currentDoctor.qualification}</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>
                  <strong>Available Days:</strong> {currentDoctor.availableDays ? currentDoctor.availableDays.join(', ') : 'Mon - Fri'}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Consultation Fee</span>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f766e' }}>₹{currentDoctor.consultationFee}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Date */}
        <div className="form-group">
          <label className="form-label">Step 2: Appointment Date (No past dates) *</label>
          <input
            type="date"
            className="form-input"
            min={todayStr}
            value={appointmentDate}
            onChange={(e) => {
              setAppointmentDate(e.target.value);
              setSelectedTime('');
            }}
            required
          />
          {appointmentDate && (
            <p style={{ fontSize: '0.82rem', marginTop: '6px', color: isDoctorAvailableOnDay ? '#16a34a' : '#dc2626', fontWeight: '600' }}>
              {isDoctorAvailableOnDay
                ? `✓ Doctor is available on ${dayOfWeek} (${appointmentDate})`
                : `✕ Doctor is NOT available on ${dayOfWeek}. Available: ${currentDoctor?.availableDays?.join(', ')}`}
            </p>
          )}
        </div>

        {/* Step 3: Available Time Slots */}
        <div className="form-group">
          <label className="form-label">
            Step 3: Select Available Time Slot *
            <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#64748b', marginLeft: '6px' }}>
              (Grey crossed-out slots are already booked)
            </span>
          </label>

          {!appointmentDate ? (
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>
              Please select an appointment date first to check available time slots.
            </p>
          ) : !isDoctorAvailableOnDay ? (
            <p style={{ fontSize: '0.85rem', color: '#dc2626' }}>
              No slots available on this day. Please select another date.
            </p>
          ) : (
            <div className="slots-grid">
              {timings.map((time) => {
                const isBooked = bookedSlots.includes(time);
                const isSelected = selectedTime === time;

                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isBooked}
                    className={`slot-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                    title={isBooked ? 'Slot already booked by another patient' : 'Click to select slot'}
                  >
                    {time}
                    {isBooked && <span style={{ display: 'block', fontSize: '0.65rem' }}>Booked</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 4: Reason for Visit */}
        <div className="form-group">
          <label className="form-label">Step 4: Reason for Visit / Symptoms *</label>
          <textarea
            rows="3"
            className="form-textarea"
            placeholder="Describe your health symptoms, medical concern, or follow-up reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          {onCancel && (
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onCancel}>
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ flex: 2 }}
            disabled={loading || !selectedTime || !isDoctorAvailableOnDay}
          >
            {loading ? 'Confirming Appointment...' : 'Confirm & Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
}
