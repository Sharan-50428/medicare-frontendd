import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DoctorListPage from './pages/DoctorListPage';
import DoctorDetailsPage from './pages/DoctorDetailsPage';
import PatientRegisterPage from './pages/PatientRegisterPage';
import PatientLoginPage from './pages/PatientLoginPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import {
  doctorService,
  patientService,
  appointmentService,
  adminService
} from './services/api';
import { initialPatients } from './services/mockData';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState('home');

  // Role and Auth State
  const [currentRole, setCurrentRole] = useState('patient'); // 'patient' | 'doctor' | 'admin' | 'guest'
  const [currentUser, setCurrentUser] = useState(initialPatients[0]); // Default to Rohan Mehta for immediate demo

  // Global Data State
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecFilter, setSelectedSpecFilter] = useState('All Specializations');

  // Feedback Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Load Data on Initial Render using Axios API services
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const docRes = await doctorService.getAllDoctors();
      setDoctors(docRes.data || []);

      const patRes = await patientService.getAllPatients();
      setPatients(patRes.data || []);

      const apptRes = await appointmentService.getAllAppointments();
      setAppointments(apptRes.data || []);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  // Role Switcher for seamless Viva demonstrations
  const handleSwitchRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'patient') {
      const patient = patients.length > 0 ? patients[0] : initialPatients[0];
      setCurrentUser(patient);
      setActivePage('patient-dashboard');
      showToast(`Switched persona to Patient: ${patient.name}`);
    } else if (newRole === 'doctor') {
      const doctor = doctors.length > 0 ? doctors[0] : null;
      setCurrentUser(doctor);
      setActivePage('doctor-dashboard');
      showToast(`Switched persona to Doctor: ${doctor ? doctor.name : 'Dr. Rahul Sharma'}`);
    } else if (newRole === 'admin') {
      const adminUser = { id: 1, username: 'admin', email: 'admin@medicare.com', role: 'ADMIN' };
      setCurrentUser(adminUser);
      setActivePage('admin-dashboard');
      showToast('Switched persona to Hospital Administrator');
    } else {
      setCurrentUser(null);
      setActivePage('home');
      showToast('Switched persona to Guest visitor');
    }
  };

  // Authentication Handlers
  const handleLogin = async ({ email, password, role }) => {
    if (role === 'patient') {
      const res = await patientService.login({ email, password });
      setCurrentUser(res.data);
      setCurrentRole('patient');
      setActivePage('patient-dashboard');
      showToast(`Welcome back, ${res.data.name}!`);
    } else if (role === 'doctor') {
      // Find doctor by email or fallback to first doctor
      const foundDoc = doctors.find((d) => d.email.toLowerCase() === email.toLowerCase()) || doctors[0];
      setCurrentUser(foundDoc);
      setCurrentRole('doctor');
      setActivePage('doctor-dashboard');
      showToast(`Welcome, Dr. ${foundDoc.name}!`);
    } else if (role === 'admin') {
      const res = await adminService.login({ email, password });
      setCurrentUser(res.data);
      setCurrentRole('admin');
      setActivePage('admin-dashboard');
      showToast('Welcome, Administrator!');
    }
  };

  const handleRegister = async (patientFormData) => {
    const res = await patientService.register(patientFormData);
    const newPat = res.data;
    setPatients((prev) => [...prev, newPat]);
    setCurrentUser(newPat);
    setCurrentRole('patient');
    setActivePage('patient-dashboard');
    showToast('Registration successful! Welcome to MediCare.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('guest');
    setActivePage('home');
    showToast('You have been logged out.');
  };

  const handleUpdateProfile = async (updatedData) => {
    if (!currentUser) return;
    const res = await patientService.updateProfile(currentUser.id, updatedData);
    setCurrentUser(res.data);
    setPatients((prev) =>
      prev.map((p) => (String(p.id) === String(currentUser.id) ? res.data : p))
    );
    showToast('Profile updated successfully.');
  };

  const handleDeleteAccount = async (patientId) => {
    if (!window.confirm('Are you sure you want to permanently delete your patient account? All your booked appointments will also be cancelled.')) {
      return;
    }
    try {
      await patientService.deleteAccount(patientId);
      setPatients((prev) => prev.filter((p) => String(p.id) !== String(patientId)));
      setAppointments((prev) => prev.filter((a) => String(a.patientId) !== String(patientId)));
      handleLogout();
      showToast('Your patient account has been permanently deleted.', 'info');
    } catch (err) {
      showToast(err.message || 'Error deleting account', 'error');
    }
  };

  // Appointment Actions
  const handleBookAppointment = async (bookingData) => {
    const res = await appointmentService.bookAppointment(bookingData);
    const newAppt = res.data;
    setAppointments((prev) => [newAppt, ...prev]);
    showToast(`Appointment booked successfully with ${newAppt.doctorName}!`);
    return newAppt;
  };

  const handleCancelAppointment = async (apptId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await appointmentService.cancelAppointment(apptId);
      setAppointments((prev) =>
        prev.map((a) => (String(a.id) === String(apptId) ? { ...a, status: 'CANCELLED' } : a))
      );
      showToast('Appointment cancelled successfully.', 'info');
    } catch (err) {
      showToast(err.message || 'Error cancelling appointment', 'error');
    }
  };

  const handleConfirmAppointment = async (apptId) => {
    try {
      await appointmentService.updateStatus(apptId, 'CONFIRMED');
      setAppointments((prev) =>
        prev.map((a) => (String(a.id) === String(apptId) ? { ...a, status: 'CONFIRMED' } : a))
      );
      showToast('Appointment status confirmed.');
    } catch (err) {
      showToast(err.message || 'Error confirming appointment', 'error');
    }
  };

  const handleCompleteAppointment = async (apptId) => {
    try {
      await appointmentService.updateStatus(apptId, 'COMPLETED');
      setAppointments((prev) =>
        prev.map((a) => (String(a.id) === String(apptId) ? { ...a, status: 'COMPLETED' } : a))
      );
      showToast('Appointment marked as completed.');
    } catch (err) {
      showToast(err.message || 'Error completing appointment', 'error');
    }
  };

  const handleUpdateAppointmentStatus = async (apptId, newStatus) => {
    try {
      await appointmentService.updateStatus(apptId, newStatus);
      setAppointments((prev) =>
        prev.map((a) => (String(a.id) === String(apptId) ? { ...a, status: newStatus } : a))
      );
      showToast(`Appointment status changed to ${newStatus}.`);
    } catch (err) {
      showToast(err.message || 'Error updating status', 'error');
    }
  };

  // Admin Doctor Management
  const handleAddDoctor = async (doctorData) => {
    try {
      const res = await doctorService.createDoctor(doctorData);
      setDoctors((prev) => [...prev, res.data]);
      showToast(`Doctor ${doctorData.name} added successfully!`);
    } catch (err) {
      showToast(err.message || 'Error adding doctor', 'error');
    }
  };

  const handleUpdateDoctor = async (id, doctorData) => {
    try {
      const res = await doctorService.updateDoctor(id, doctorData);
      setDoctors((prev) =>
        prev.map((d) => (String(d.id) === String(id) ? res.data : d))
      );
      showToast(`Doctor details updated successfully.`);
    } catch (err) {
      showToast(err.message || 'Error updating doctor', 'error');
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await doctorService.deleteDoctor(id);
      setDoctors((prev) => prev.filter((d) => String(d.id) !== String(id)));
      showToast('Doctor record deleted successfully.');
    } catch (err) {
      showToast(err.message || 'Error deleting doctor', 'error');
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        currentUser={currentUser}
        currentRole={currentRole}
        onSwitchRole={handleSwitchRole}
        onLogout={handleLogout}
      />

      {/* Main Page Content */}
      <main className="main-content">
        {activePage === 'home' && (
          <HomePage
            doctors={doctors}
            onNavigate={setActivePage}
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            onSelectSpecFilter={(spec) => setSelectedSpecFilter(spec)}
          />
        )}

        {activePage === 'doctors' && (
          <DoctorListPage
            doctors={doctors}
            selectedSpecFilter={selectedSpecFilter}
            onSelectSpecFilter={setSelectedSpecFilter}
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'doctor-details' && (
          <DoctorDetailsPage
            doctor={selectedDoctor || doctors[0]}
            onNavigate={setActivePage}
            onBookAppointment={(doc) => {
              setSelectedDoctor(doc);
              setActivePage('book');
            }}
          />
        )}

        {activePage === 'register' && (
          <PatientRegisterPage
            onRegister={handleRegister}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'login' && (
          <PatientLoginPage
            onLogin={handleLogin}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'patient-dashboard' && (
          <PatientDashboardPage
            patient={currentUser}
            appointments={appointments}
            doctors={doctors}
            onNavigate={setActivePage}
            onCancelAppointment={handleCancelAppointment}
            onUpdateProfile={handleUpdateProfile}
            onDeleteAccount={handleDeleteAccount}
          />
        )}

        {activePage === 'book' && (
          <BookAppointmentPage
            doctors={doctors}
            selectedDoctor={selectedDoctor}
            existingAppointments={appointments}
            currentUser={currentUser}
            onBookAppointment={handleBookAppointment}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'my-appointments' && (
          <MyAppointmentsPage
            appointments={appointments}
            currentUser={currentUser}
            onCancelAppointment={handleCancelAppointment}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'doctor-dashboard' && (
          <DoctorDashboardPage
            doctor={currentUser || doctors[0]}
            appointments={appointments}
            onConfirmAppointment={handleConfirmAppointment}
            onCancelAppointment={handleCancelAppointment}
            onCompleteAppointment={handleCompleteAppointment}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'admin-dashboard' && (
          <AdminDashboardPage
            doctors={doctors}
            patients={patients}
            appointments={appointments}
            onAddDoctor={handleAddDoctor}
            onUpdateDoctor={handleUpdateDoctor}
            onDeleteDoctor={handleDeleteDoctor}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
          />
        )}
      </main>

      {/* Global Toast Alert Notifications */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <span>{toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '✓'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer onNavigate={setActivePage} />
    </div>
  );
}
