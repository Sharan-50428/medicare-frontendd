import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">+ MediCare</div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
              MediCare Appointment System is a dedicated healthcare scheduling portal connecting patients with certified medical specialists, facilitating seamless doctor searches and transparent appointment bookings.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#5eead4' }}>
              🏥 Designed & Built for B.Tech CSE Final Year / Semester Evaluation
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
              <li><a href="#doctors" onClick={(e) => { e.preventDefault(); onNavigate('doctors'); }}>Our Doctors</a></li>
              <li><a href="#book" onClick={(e) => { e.preventDefault(); onNavigate('book'); }}>Book Appointment</a></li>
              <li><a href="#login" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Patient Portal</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Departments</h4>
            <ul className="footer-links">
              <li>Cardiology</li>
              <li>Dermatology</li>
              <li>Pediatrics</li>
              <li>Orthopedics</li>
              <li>Neurology</li>
              <li>General Medicine</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hospital Helplines</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
              📞 <strong>24/7 Helpline:</strong> +91 (80) 4567-8900
            </p>
            <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
              ✉️ <strong>Support Email:</strong> support@medicare-health.org
            </p>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              🕒 <strong>OPD Timings:</strong> Mon - Sat: 8:00 AM - 8:00 PM
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MediCare Appointment System. Built with React.js & Spring Boot Layered Architecture.</p>
        </div>
      </div>
    </footer>
  );
}
