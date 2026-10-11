// Initial mock seed data matching backend data.sql
export const initialDoctors = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialization: "Cardiologist",
    qualification: "MBBS, MD, DM (Cardiology)",
    experience: 12,
    phone: "9876543210",
    email: "rahul.sharma@medicare.com",
    consultationFee: 800.0,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
    bio: "Senior Consultant Cardiologist with over 12 years of experience in clinical cardiology, ECG analysis, hypertension, and preventive cardiac wellness.",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableTimings: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "04:00 PM", "04:30 PM", "05:00 PM"]
  },
  {
    id: 2,
    name: "Dr. Priya Verma",
    specialization: "Dermatologist",
    qualification: "MBBS, MD (Dermatology)",
    experience: 8,
    phone: "9876543211",
    email: "priya.verma@medicare.com",
    consultationFee: 600.0,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1594824813565-d01804f46995?w=300&auto=format&fit=crop&q=80",
    bio: "Renowned dermatologist specializing in skin care, pediatric dermatology, allergy diagnostics, and restorative cosmetic therapies.",
    availableDays: ["Monday", "Wednesday", "Saturday"],
    availableTimings: ["11:00 AM", "11:30 AM", "12:00 PM", "02:30 PM", "03:30 PM"]
  },
  {
    id: 3,
    name: "Dr. Ananya Iyer",
    specialization: "Pediatrician",
    qualification: "MBBS, DCH, MD (Pediatrics)",
    experience: 10,
    phone: "9876543212",
    email: "ananya.iyer@medicare.com",
    consultationFee: 500.0,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
    bio: "Dedicated child healthcare specialist focusing on infant nutrition, immunization schedules, growth milestones, and pediatric acute care.",
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    availableTimings: ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:00 PM"]
  },
  {
    id: 4,
    name: "Dr. Vikram Malhotra",
    specialization: "Orthopedic Surgeon",
    qualification: "MBBS, MS (Orthopedics), M.Ch",
    experience: 15,
    phone: "9876543213",
    email: "vikram.m@medicare.com",
    consultationFee: 900.0,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80",
    bio: "Expert orthopedic consultant focusing on joint replacement, sports injury rehabilitation, spine health, and arthritis management.",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableTimings: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "03:30 PM"]
  },
  {
    id: 5,
    name: "Dr. Sneha Kulkarni",
    specialization: "Neurologist",
    qualification: "MBBS, MD, DM (Neurology)",
    experience: 11,
    phone: "9876543214",
    email: "sneha.k@medicare.com",
    consultationFee: 850.0,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&auto=format&fit=crop&q=80",
    bio: "Specialist in neurological disorders, migraine treatments, stroke recovery, and neuromuscular care with extensive academic background.",
    availableDays: ["Wednesday", "Friday", "Saturday"],
    availableTimings: ["12:00 PM", "01:00 PM", "03:00 PM", "04:30 PM", "05:30 PM"]
  },
  {
    id: 6,
    name: "Dr. Rajesh Patel",
    specialization: "General Physician",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 14,
    phone: "9876543215",
    email: "rajesh.patel@medicare.com",
    consultationFee: 400.0,
    status: "AVAILABLE",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop&q=80",
    bio: "Primary care physician managing acute seasonal infections, lifestyle illnesses, diabetic care, and comprehensive wellness screenings.",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableTimings: ["09:00 AM", "10:30 AM", "11:30 AM", "03:00 PM", "04:00 PM", "05:00 PM"]
  }
];

export const initialPatients = [
  {
    id: 1,
    name: "Rohan Mehta",
    age: 28,
    gender: "Male",
    phone: "9811223344",
    email: "rohan@gmail.com",
    address: "Flat 402, Green Glen Layout, Bangalore",
    password: "password123"
  },
  {
    id: 2,
    name: "Pooja Nair",
    age: 34,
    gender: "Female",
    phone: "9822334455",
    email: "pooja@gmail.com",
    address: "12, Palm Meadows, Whitefield, Bangalore",
    password: "password123"
  },
  {
    id: 3,
    name: "Amitabh Sen",
    age: 52,
    gender: "Male",
    phone: "9833445566",
    email: "amitabh@gmail.com",
    address: "74/B, Park Street, Kolkata",
    password: "password123"
  }
];

export const initialAppointments = [
  {
    id: 101,
    patientId: 1,
    patientName: "Rohan Mehta",
    patientPhone: "9811223344",
    patientEmail: "rohan@gmail.com",
    doctorId: 1,
    doctorName: "Dr. Rahul Sharma",
    doctorSpecialization: "Cardiologist",
    consultationFee: 800.0,
    appointmentDate: "2026-10-15",
    appointmentTime: "10:00 AM",
    reason: "Routine cardiac health checkup and ECG consultation",
    status: "CONFIRMED"
  },
  {
    id: 102,
    patientId: 2,
    patientName: "Pooja Nair",
    patientPhone: "9822334455",
    patientEmail: "pooja@gmail.com",
    doctorId: 2,
    doctorName: "Dr. Priya Verma",
    doctorSpecialization: "Dermatologist",
    consultationFee: 600.0,
    appointmentDate: "2026-10-17",
    appointmentTime: "11:00 AM",
    reason: "Skin allergy and dermatological consultation",
    status: "BOOKED"
  },
  {
    id: 103,
    patientId: 1,
    patientName: "Rohan Mehta",
    patientPhone: "9811223344",
    patientEmail: "rohan@gmail.com",
    doctorId: 6,
    doctorName: "Dr. Rajesh Patel",
    doctorSpecialization: "General Physician",
    consultationFee: 400.0,
    appointmentDate: "2026-10-05",
    appointmentTime: "10:30 AM",
    reason: "Seasonal flu and recurring mild fever",
    status: "COMPLETED"
  },
  {
    id: 104,
    patientId: 3,
    patientName: "Amitabh Sen",
    patientPhone: "9833445566",
    patientEmail: "amitabh@gmail.com",
    doctorId: 4,
    doctorName: "Dr. Vikram Malhotra",
    doctorSpecialization: "Orthopedic Surgeon",
    consultationFee: 900.0,
    appointmentDate: "2026-10-12",
    appointmentTime: "02:00 PM",
    reason: "Knee joint pain after morning jogging",
    status: "BOOKED"
  }
];

export const specializationsList = [
  "All Specializations",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Neurologist",
  "General Physician"
];
