import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export default function AdminDashboardPage({
  doctors = [],
  patients = [],
  appointments = [],
  onAddDoctor,
  onUpdateDoctor,
  onDeleteDoctor,
  onUpdateAppointmentStatus
}) {
  const [activeTab, setActiveTab] = useState('DOCTORS'); // DOCTORS, PATIENTS, APPOINTMENTS, SCHEDULES
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Form State for Add / Edit Doctor
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialization: 'Cardiologist',
    qualification: '',
    experience: '',
    phone: '',
    email: '',
    consultationFee: '',
    status: 'AVAILABLE',
    availableDays: 'Monday, Tuesday, Wednesday, Thursday, Friday',
    availableTimings: '10:00 AM, 11:00 AM, 04:00 PM, 05:00 PM'
  });

  const openAddDoctor = () => {
    setEditingDoctor(null);
    setDoctorForm({
      name: '',
      specialization: 'Cardiologist',
      qualification: '',
      experience: '',
      phone: '',
      email: '',
      consultationFee: '',
      status: 'AVAILABLE',
      availableDays: 'Monday, Tuesday, Wednesday, Thursday, Friday',
      availableTimings: '10:00 AM, 11:00 AM, 04:00 PM, 05:00 PM'
    });
    setIsDoctorModalOpen(true);
  };

  const openEditDoctor = (doc) => {
    setEditingDoctor(doc);
    setDoctorForm({
      name: doc.name,
      specialization: doc.specialization,
      qualification: doc.qualification,
      experience: doc.experience,
      phone: doc.phone,
      email: doc.email,
      consultationFee: doc.consultationFee,
      status: doc.status || 'AVAILABLE',
      availableDays: doc.availableDays ? doc.availableDays.join(', ') : 'Monday, Tuesday, Wednesday',
      availableTimings: doc.availableTimings ? doc.availableTimings.join(', ') : '10:00 AM, 11:00 AM'
    });
    setIsDoctorModalOpen(true);
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    const daysArray = doctorForm.availableDays
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const timingsArray = doctorForm.availableTimings
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const docPayload = {
      ...doctorForm,
      experience: Number(doctorForm.experience),
      consultationFee: Number(doctorForm.consultationFee),
      availableDays: daysArray,
      availableTimings: timingsArray
    };

    if (editingDoctor) {
      onUpdateDoctor(editingDoctor.id, docPayload);
    } else {
      onAddDoctor(docPayload);
    }

    setIsDoctorModalOpen(false);
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {/* Admin Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <span className="demo-pill" style={{ marginBottom: '6px', display: 'inline-block' }}>Hospital Management System</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a' }}>Administrator Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            System-wide oversight: Doctors, Patients, Clinical Schedules & Appointment Bookings
          </p>
        </div>

        <button className="btn btn-primary" onClick={openAddDoctor}>
          + Add New Doctor
        </button>
      </div>

      {/* Metric Counters */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon blue">🩺</div>
          <div className="metric-info">
            <h3>{doctors.length}</h3>
            <p>Total Doctors Registered</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon teal">👥</div>
          <div className="metric-info">
            <h3>{patients.length}</h3>
            <p>Total Patients Registered</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple">📅</div>
          <div className="metric-info">
            <h3>{appointments.length}</h3>
            <p>Total Appointments Booked</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeTab === 'DOCTORS' ? 'active' : ''}`}
          onClick={() => setActiveTab('DOCTORS')}
        >
          🩺 Manage Doctors ({doctors.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'PATIENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('PATIENTS')}
        >
          👤 View Patients ({patients.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'APPOINTMENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('APPOINTMENTS')}
        >
          📋 View Appointments ({appointments.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'SCHEDULES' ? 'active' : ''}`}
          onClick={() => setActiveTab('SCHEDULES')}
        >
          ⏰ Doctor Schedules
        </button>
      </div>

      {/* SECTION 1: MANAGE DOCTORS */}
      {activeTab === 'DOCTORS' && (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id}>
                  <td><strong>DOC-{doc.id}</strong></td>
                  <td>
                    <strong>{doc.name}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{doc.email}</div>
                  </td>
                  <td><span style={{ color: '#0d9488', fontWeight: '600' }}>{doc.specialization}</span></td>
                  <td>{doc.qualification}</td>
                  <td>{doc.experience} yrs</td>
                  <td><strong>₹{doc.consultationFee}</strong></td>
                  <td>
                    <span style={{ color: doc.status === 'AVAILABLE' ? '#16a34a' : '#dc2626', fontWeight: '700', fontSize: '0.8rem' }}>
                      ● {doc.status || 'AVAILABLE'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => openEditDoctor(doc)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${doc.name}?`)) {
                            onDeleteDoctor(doc.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SECTION 2: VIEW PATIENTS */}
      {activeTab === 'PATIENTS' && (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age & Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Residential Address</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((pat) => (
                <tr key={pat.id}>
                  <td><strong>PAT-{pat.id}</strong></td>
                  <td><strong>{pat.name}</strong></td>
                  <td>{pat.age} yrs • {pat.gender}</td>
                  <td>+91 {pat.phone}</td>
                  <td>{pat.email}</td>
                  <td style={{ maxWidth: '250px' }}>{pat.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SECTION 3: VIEW APPOINTMENTS */}
      {activeTab === 'APPOINTMENTS' && (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Appt ID</th>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date & Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td><strong>#{appt.id}</strong></td>
                  <td>
                    <strong>{appt.doctorName}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#0d9488' }}>{appt.doctorSpecialization}</div>
                  </td>
                  <td>
                    <strong>{appt.patientName}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{appt.patientPhone}</div>
                  </td>
                  <td>
                    <strong>{appt.appointmentDate}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{appt.appointmentTime}</div>
                  </td>
                  <td style={{ maxWidth: '200px', fontSize: '0.85rem' }}>{appt.reason}</td>
                  <td><StatusBadge status={appt.status} /></td>
                  <td>
                    <select
                      className="form-select"
                      style={{ padding: '6px 10px', fontSize: '0.8rem', width: 'auto' }}
                      value={appt.status}
                      onChange={(e) => onUpdateAppointmentStatus(appt.id, e.target.value)}
                    >
                      <option value="BOOKED">BOOKED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SECTION 4: MANAGE DOCTOR SCHEDULES */}
      {activeTab === 'SCHEDULES' && (
        <div className="doctors-grid">
          {doctors.map((doc) => (
            <div key={doc.id} style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: '800' }}>{doc.name}</h3>
              <p style={{ color: '#0d9488', fontSize: '0.85rem', fontWeight: '600', marginBottom: '14px' }}>
                {doc.specialization} • {doc.qualification}
              </p>

              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>AVAILABLE DAYS:</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {(doc.availableDays || ['Monday', 'Wednesday', 'Friday']).map((day) => (
                    <span key={day} style={{ background: '#f0fdfa', border: '1px solid #99f6e4', color: '#0f766e', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>TIMING SLOTS:</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {(doc.availableTimings || ['10:00 AM', '11:00 AM', '04:00 PM']).map((t) => (
                    <span key={t} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#334155', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Doctor Modal */}
      <Modal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        title={editingDoctor ? `Edit Doctor: ${editingDoctor.name}` : 'Add New Doctor'}
      >
        <form onSubmit={handleDoctorSubmit}>
          <div className="form-group">
            <label className="form-label">Doctor Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Dr. Ananya Sharma"
              value={doctorForm.name}
              onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Specialization *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Cardiologist"
                value={doctorForm.specialization}
                onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Qualification *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., MBBS, MD"
                value={doctorForm.qualification}
                onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Years of Experience *</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 10"
                value={doctorForm.experience}
                onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Consultation Fee (₹) *</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 700"
                value={doctorForm.consultationFee}
                onChange={(e) => setDoctorForm({ ...doctorForm, consultationFee: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-input"
                placeholder="9876543210"
                value={doctorForm.phone}
                onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                placeholder="doctor@medicare.com"
                value={doctorForm.email}
                onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Availability Status</label>
            <select
              className="form-select"
              value={doctorForm.status}
              onChange={(e) => setDoctorForm({ ...doctorForm, status: e.target.value })}
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="ON_LEAVE">ON_LEAVE</option>
              <option value="BUSY">BUSY</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Available Days (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              value={doctorForm.availableDays}
              onChange={(e) => setDoctorForm({ ...doctorForm, availableDays: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Available Timings (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              value={doctorForm.availableTimings}
              onChange={(e) => setDoctorForm({ ...doctorForm, availableTimings: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={() => setIsDoctorModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 2 }}
            >
              {editingDoctor ? 'Save Changes' : 'Create Doctor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
