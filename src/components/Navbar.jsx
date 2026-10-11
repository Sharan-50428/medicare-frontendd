import React from 'react';

export default function Navbar({
  activePage,
  setActivePage,
  currentUser,
  currentRole,
  onSwitchRole,
  onLogout
}) {
  return (
    <>
      {/* Top Demo Bar for quick viva role demonstration */}
      <div className="demo-bar">
        <div className="demo-bar-left">
          <span className="demo-pill">B.Tech Project Demo Mode</span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Current Persona: <strong style={{ color: '#fff' }}>{currentUser ? currentUser.name || currentUser.username : 'Guest'}</strong> ({currentRole.toUpperCase()})
          </span>
        </div>
        <div className="demo-bar-right">
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginRight: '4px' }}>Quick Switch:</span>
          <button
            className={`demo-btn ${currentRole === 'patient' ? 'active' : ''}`}
            onClick={() => onSwitchRole('patient')}
          >
            👤 Patient
          </button>
          <button
            className={`demo-btn ${currentRole === 'doctor' ? 'active' : ''}`}
            onClick={() => onSwitchRole('doctor')}
          >
            🩺 Doctor
          </button>
          <button
            className={`demo-btn ${currentRole === 'admin' ? 'active' : ''}`}
            onClick={() => onSwitchRole('admin')}
          >
            ⚙️ Admin
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <div
            className="brand-logo"
            style={{ cursor: 'pointer' }}
            onClick={() => setActivePage('home')}
          >
            <div className="brand-icon">+</div>
            <span>MediCare</span>
          </div>

          <ul className="nav-links">
            <li
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => setActivePage('home')}
            >
              Home
            </li>
            <li
              className={`nav-link ${activePage === 'doctors' ? 'active' : ''}`}
              onClick={() => setActivePage('doctors')}
            >
              Doctors
            </li>
            <li
              className={`nav-link ${activePage === 'book' ? 'active' : ''}`}
              onClick={() => setActivePage('book')}
            >
              Book Appointment
            </li>

            {currentRole === 'patient' && currentUser && (
              <>
                <li
                  className={`nav-link ${activePage === 'my-appointments' ? 'active' : ''}`}
                  onClick={() => setActivePage('my-appointments')}
                >
                  My Appointments
                </li>
                <li
                  className={`nav-link ${activePage === 'patient-dashboard' ? 'active' : ''}`}
                  onClick={() => setActivePage('patient-dashboard')}
                >
                  Dashboard
                </li>
              </>
            )}

            {currentRole === 'doctor' && (
              <li
                className={`nav-link ${activePage === 'doctor-dashboard' ? 'active' : ''}`}
                onClick={() => setActivePage('doctor-dashboard')}
              >
                Doctor Dashboard
              </li>
            )}

            {currentRole === 'admin' && (
              <li
                className={`nav-link ${activePage === 'admin-dashboard' ? 'active' : ''}`}
                onClick={() => setActivePage('admin-dashboard')}
              >
                Admin Panel
              </li>
            )}
          </ul>

          <div className="nav-auth">
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                  Hi, {currentUser.name ? currentUser.name.split(' ')[0] : currentUser.username}
                </span>
                <button className="btn btn-outline btn-sm" onClick={onLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setActivePage('login')}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setActivePage('register')}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
