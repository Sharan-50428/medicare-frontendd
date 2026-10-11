import axios from 'axios';
import { initialDoctors, initialPatients, initialAppointments } from './mockData';

// Base URL pointing to Java Spring Boot REST API
const BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000, // Quick timeout so fallback engages seamlessly if backend is offline
});

// Helper for LocalStorage Persistence in fallback mode
const getStorageItem = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStorageItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
};

// Initialize LocalStorage with seed data if not present
if (!localStorage.getItem('medicare_doctors')) {
  setStorageItem('medicare_doctors', initialDoctors);
}
if (!localStorage.getItem('medicare_patients')) {
  setStorageItem('medicare_patients', initialPatients);
}
if (!localStorage.getItem('medicare_appointments')) {
  setStorageItem('medicare_appointments', initialAppointments);
}

// ----------------------------------------------------------------------
// DOCTOR SERVICES
// ----------------------------------------------------------------------
export const doctorService = {
  // GET /api/doctors
  async getAllDoctors() {
    try {
      const response = await apiClient.get('/doctors');
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    return { data: getStorageItem('medicare_doctors', initialDoctors), source: 'LOCAL' };
  },

  // GET /api/doctors/{id}
  async getDoctorById(id) {
    try {
      const response = await apiClient.get(`/doctors/${id}`);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const docs = getStorageItem('medicare_doctors', initialDoctors);
    const found = docs.find((d) => String(d.id) === String(id));
    return { data: found, source: 'LOCAL' };
  },

  // POST /api/doctors
  async createDoctor(doctorData) {
    try {
      const response = await apiClient.post('/doctors', doctorData);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const docs = getStorageItem('medicare_doctors', initialDoctors);
    const newDoc = {
      ...doctorData,
      id: Date.now(),
      status: doctorData.status || 'AVAILABLE',
      avatar: doctorData.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
      availableDays: doctorData.availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      availableTimings: doctorData.availableTimings || ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
    };
    docs.push(newDoc);
    setStorageItem('medicare_doctors', docs);
    return { data: newDoc, source: 'LOCAL' };
  },

  // PUT /api/doctors/{id}
  async updateDoctor(id, doctorData) {
    try {
      const response = await apiClient.put(`/doctors/${id}`, doctorData);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const docs = getStorageItem('medicare_doctors', initialDoctors);
    const index = docs.findIndex((d) => String(d.id) === String(id));
    if (index !== -1) {
      docs[index] = { ...docs[index], ...doctorData };
      setStorageItem('medicare_doctors', docs);
      return { data: docs[index], source: 'LOCAL' };
    }
    throw new Error('Doctor not found');
  },

  // DELETE /api/doctors/{id}
  async deleteDoctor(id) {
    try {
      await apiClient.delete(`/doctors/${id}`);
      return { success: true, source: 'API' };
    } catch {
      // Fallback
    }
    const docs = getStorageItem('medicare_doctors', initialDoctors);
    const filtered = docs.filter((d) => String(d.id) !== String(id));
    setStorageItem('medicare_doctors', filtered);
    return { success: true, source: 'LOCAL' };
  },

  // Search/Filter doctors
  async searchDoctors(query, specialization) {
    try {
      const params = {};
      if (query) params.query = query;
      if (specialization && specialization !== 'All Specializations') params.specialization = specialization;
      const response = await apiClient.get('/doctors/search', { params });
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    let docs = getStorageItem('medicare_doctors', initialDoctors);
    if (specialization && specialization !== 'All Specializations') {
      docs = docs.filter((d) => d.specialization.toLowerCase() === specialization.toLowerCase());
    }
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      docs = docs.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          (d.qualification && d.qualification.toLowerCase().includes(q))
      );
    }
    return { data: docs, source: 'LOCAL' };
  }
};

// ----------------------------------------------------------------------
// PATIENT SERVICES
// ----------------------------------------------------------------------
export const patientService = {
  // POST /api/patients/register
  async register(patientData) {
    try {
      const response = await apiClient.post('/patients/register', patientData);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    // Fallback
    const patients = getStorageItem('medicare_patients', initialPatients);
    if (patients.some((p) => p.email.toLowerCase() === patientData.email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newPatient = {
      ...patientData,
      id: Date.now()
    };
    patients.push(newPatient);
    setStorageItem('medicare_patients', patients);
    return { data: newPatient, source: 'LOCAL' };
  },

  // POST /api/patients/login
  async login(credentials) {
    try {
      const response = await apiClient.post('/patients/login', credentials);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    // Fallback
    const patients = getStorageItem('medicare_patients', initialPatients);
    const found = patients.find(
      (p) =>
        p.email.toLowerCase() === credentials.email.toLowerCase() &&
        p.password === credentials.password
    );
    if (!found) {
      throw new Error('Invalid email or password.');
    }
    return { data: found, source: 'LOCAL' };
  },

  // GET /api/patients/{id}
  async getById(id) {
    try {
      const response = await apiClient.get(`/patients/${id}`);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const patients = getStorageItem('medicare_patients', initialPatients);
    const found = patients.find((p) => String(p.id) === String(id));
    return { data: found, source: 'LOCAL' };
  },

  // PUT /api/patients/{id}
  async updateProfile(id, patientData) {
    try {
      const response = await apiClient.put(`/patients/${id}`, patientData);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const patients = getStorageItem('medicare_patients', initialPatients);
    const index = patients.findIndex((p) => String(p.id) === String(id));
    if (index !== -1) {
      patients[index] = { ...patients[index], ...patientData };
      setStorageItem('medicare_patients', patients);
      return { data: patients[index], source: 'LOCAL' };
    }
    throw new Error('Patient not found');
  },

  // GET /api/patients
  async getAllPatients() {
    try {
      const response = await apiClient.get('/patients');
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    return { data: getStorageItem('medicare_patients', initialPatients), source: 'LOCAL' };
  },

  // DELETE /api/patients/{id}
  async deleteAccount(id) {
    try {
      await apiClient.delete(`/patients/${id}`);
      return { success: true, source: 'API' };
    } catch {
      // Fallback
    }
    const patients = getStorageItem('medicare_patients', initialPatients);
    const filtered = patients.filter((p) => String(p.id) !== String(id));
    setStorageItem('medicare_patients', filtered);

    // Cascade delete patient's appointments
    const appts = getStorageItem('medicare_appointments', initialAppointments);
    const remainingAppts = appts.filter((a) => String(a.patientId) !== String(id));
    setStorageItem('medicare_appointments', remainingAppts);

    return { success: true, source: 'LOCAL' };
  }
};

// ----------------------------------------------------------------------
// APPOINTMENT SERVICES
// ----------------------------------------------------------------------
export const appointmentService = {
  // POST /api/appointments
  async bookAppointment(appointmentData) {
    try {
      const response = await apiClient.post('/appointments', appointmentData);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }

    // Fallback slot collision verification logic matching backend
    const appointments = getStorageItem('medicare_appointments', initialAppointments);
    const docs = getStorageItem('medicare_doctors', initialDoctors);
    const patients = getStorageItem('medicare_patients', initialPatients);

    const doc = docs.find((d) => String(d.id) === String(appointmentData.doctorId));
    const pat = patients.find((p) => String(p.id) === String(appointmentData.patientId));

    // Collision check
    const isBooked = appointments.some(
      (a) =>
        String(a.doctorId) === String(appointmentData.doctorId) &&
        a.appointmentDate === appointmentData.appointmentDate &&
        a.appointmentTime === appointmentData.appointmentTime &&
        a.status !== 'CANCELLED'
    );

    if (isBooked) {
      throw new Error(`Slot ${appointmentData.appointmentTime} on ${appointmentData.appointmentDate} is already booked. Please choose another slot.`);
    }

    const newAppt = {
      ...appointmentData,
      id: Date.now(),
      patientName: pat ? pat.name : 'Registered Patient',
      patientPhone: pat ? pat.phone : '9876543210',
      patientEmail: pat ? pat.email : 'patient@medicare.com',
      doctorName: doc ? doc.name : 'Doctor',
      doctorSpecialization: doc ? doc.specialization : 'General',
      consultationFee: doc ? doc.consultationFee : 500.0,
      status: 'BOOKED'
    };

    appointments.unshift(newAppt);
    setStorageItem('medicare_appointments', appointments);
    return { data: newAppt, source: 'LOCAL' };
  },

  // GET /api/appointments/patient/{patientId}
  async getByPatientId(patientId) {
    try {
      const response = await apiClient.get(`/appointments/patient/${patientId}`);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const appts = getStorageItem('medicare_appointments', initialAppointments);
    const filtered = appts.filter((a) => String(a.patientId) === String(patientId));
    return { data: filtered, source: 'LOCAL' };
  },

  // GET /api/appointments/doctor/{doctorId}
  async getByDoctorId(doctorId) {
    try {
      const response = await apiClient.get(`/appointments/doctor/${doctorId}`);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const appts = getStorageItem('medicare_appointments', initialAppointments);
    const filtered = appts.filter((a) => String(a.doctorId) === String(doctorId));
    return { data: filtered, source: 'LOCAL' };
  },

  // GET /api/appointments
  async getAllAppointments() {
    try {
      const response = await apiClient.get('/appointments');
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    return { data: getStorageItem('medicare_appointments', initialAppointments), source: 'LOCAL' };
  },

  // PUT /api/appointments/{id}/status
  async updateStatus(id, newStatus) {
    try {
      const response = await apiClient.put(`/appointments/${id}/status`, { status: newStatus });
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const appts = getStorageItem('medicare_appointments', initialAppointments);
    const index = appts.findIndex((a) => String(a.id) === String(id));
    if (index !== -1) {
      appts[index].status = newStatus;
      setStorageItem('medicare_appointments', appts);
      return { data: appts[index], source: 'LOCAL' };
    }
    throw new Error('Appointment not found');
  },

  // Cancel appointment
  async cancelAppointment(id) {
    return this.updateStatus(id, 'CANCELLED');
  }
};

// ----------------------------------------------------------------------
// ADMIN SERVICES
// ----------------------------------------------------------------------
export const adminService = {
  // POST /api/admin/login
  async login(credentials) {
    try {
      const response = await apiClient.post('/admin/login', credentials);
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    if (
      (credentials.email === 'admin' || credentials.email === 'admin@medicare.com') &&
      credentials.password === 'admin123'
    ) {
      return {
        data: {
          id: 1,
          username: 'admin',
          email: 'admin@medicare.com',
          role: 'ADMIN'
        },
        source: 'LOCAL'
      };
    }
    throw new Error('Invalid admin credentials. Use admin / admin123');
  },

  // GET /api/admin/stats
  async getStats() {
    try {
      const response = await apiClient.get('/admin/stats');
      if (response.data && response.data.data) {
        return { data: response.data.data, source: 'API' };
      }
    } catch {
      // Fallback
    }
    const docs = getStorageItem('medicare_doctors', initialDoctors);
    const pats = getStorageItem('medicare_patients', initialPatients);
    const appts = getStorageItem('medicare_appointments', initialAppointments);
    return {
      data: {
        totalDoctors: docs.length,
        totalPatients: pats.length,
        totalAppointments: appts.length
      },
      source: 'LOCAL'
    };
  }
};

export default apiClient;
