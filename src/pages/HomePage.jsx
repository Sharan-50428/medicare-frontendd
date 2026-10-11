import React from 'react';
import DoctorCard from '../components/DoctorCard';
import { specializationsList } from '../services/mockData';

export default function HomePage({
  doctors = [],
  onNavigate,
  onSelectDoctor,
  onSelectSpecFilter
}) {
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <span className="hero-tag">✨ Advanced Healthcare Scheduling</span>
            <h1 className="hero-title">
              Your Health, Our Priority. <span>Book Appointments</span> with Top Specialists.
            </h1>
            <p className="hero-subtitle">
              MediCare provides a simple, transparent online platform where patients can browse qualified doctors, check real-time availability and clinic timings, and secure verified appointments with zero hassle.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('book')}
              >
                📅 Book Appointment
              </button>
              <button
                className="btn btn-outline"
                onClick={() => onNavigate('doctors')}
              >
                🔍 Search Doctors
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <h4>50+</h4>
                <p>Expert Doctors</p>
              </div>
              <div className="stat-item">
                <h4>15+</h4>
                <p>Specializations</p>
              </div>
              <div className="stat-item">
                <h4>99.8%</h4>
                <p>On-Time Consultations</p>
              </div>
            </div>
          </div>

          <div>
            <div className="hero-card">
              <div className="hero-card-header">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
                  alt="Doctor"
                  className="hero-card-avatar"
                />
                <div>
                  <h4 style={{ fontWeight: '800', color: '#0f172a' }}>Dr. Rahul Sharma</h4>
                  <p style={{ color: '#0d9488', fontSize: '0.85rem', fontWeight: '600' }}>Senior Cardiologist</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>AIIMS New Delhi • 12+ Yrs Exp</p>
                </div>
              </div>
              <div style={{ background: '#f0fdfa', borderRadius: '10px', padding: '12px 14px', marginBottom: '14px', fontSize: '0.85rem' }}>
                <p style={{ color: '#0f766e', fontWeight: '600' }}>⚡ Today's Available Slots</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <span style={{ background: 'white', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid #ccfbf1' }}>10:00 AM</span>
                  <span style={{ background: 'white', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid #ccfbf1' }}>11:30 AM</span>
                  <span style={{ background: 'white', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid #ccfbf1' }}>04:00 PM</span>
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  onSelectDoctor && onSelectDoctor(doctors[0]);
                  onNavigate('book');
                }}
              >
                Instant Book with Dr. Rahul
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Medical Departments</span>
            <h2 className="section-title">Explore by Specialization</h2>
            <p className="section-subtitle">
              Browse through certified specialists across various healthcare fields to find the right care for you.
            </p>
          </div>

          <div className="specializations-grid">
            {specializationsList.filter((s) => s !== 'All Specializations').map((spec) => (
              <div
                key={spec}
                className="spec-chip"
                onClick={() => {
                  if (onSelectSpecFilter) onSelectSpecFilter(spec);
                  onNavigate('doctors');
                }}
              >
                <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '6px' }}>
                  {spec === 'Cardiologist' && '❤️'}
                  {spec === 'Dermatologist' && '✨'}
                  {spec === 'Pediatrician' && '👶'}
                  {spec === 'Orthopedic Surgeon' && '🦴'}
                  {spec === 'Neurologist' && '🧠'}
                  {spec === 'General Physician' && '🩺'}
                </span>
                {spec}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Verified Professionals</span>
            <h2 className="section-title">Our Featured Doctors</h2>
            <p className="section-subtitle">
              Highly experienced medical consultants with proven clinical excellence.
            </p>
          </div>

          <div className="doctors-grid">
            {featuredDoctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                onViewDetails={(d) => {
                  onSelectDoctor(d);
                  onNavigate('doctor-details');
                }}
                onBookAppointment={(d) => {
                  onSelectDoctor(d);
                  onNavigate('book');
                }}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              className="btn btn-outline"
              onClick={() => onNavigate('doctors')}
            >
              View All Doctors →
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose MediCare Banner */}
      <section className="section">
        <div className="container" style={{ background: 'linear-gradient(135deg, #0f766e, #0284c7)', borderRadius: '24px', color: 'white', padding: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Need an urgent doctor consultation?</h2>
            <p style={{ opacity: 0.9, maxWidth: '560px' }}>
              Check doctor schedules and book an appointment in less than 2 minutes. No paperwork, zero waiting in queues.
            </p>
          </div>
          <div>
            <button
              className="btn"
              style={{ background: 'white', color: '#0f766e', fontWeight: '800', fontSize: '1rem', padding: '14px 28px' }}
              onClick={() => onNavigate('book')}
            >
              Book an Appointment Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
