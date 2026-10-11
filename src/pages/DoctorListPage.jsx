import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DoctorList from '../components/DoctorList';
import { specializationsList } from '../services/mockData';

export default function DoctorListPage({
  doctors = [],
  selectedSpecFilter,
  onSelectSpecFilter,
  onSelectDoctor,
  onNavigate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    // Specialization filter
    if (selectedSpecFilter && selectedSpecFilter !== 'All Specializations') {
      if (doc.specialization.toLowerCase() !== selectedSpecFilter.toLowerCase()) {
        return false;
      }
    }

    // Availability filter
    if (onlyAvailable && doc.status !== 'AVAILABLE') {
      return false;
    }

    // Search query filter (name, specialization, or qualification)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSpec = doc.specialization.toLowerCase().includes(q);
      const matchQual = doc.qualification && doc.qualification.toLowerCase().includes(q);
      return matchName || matchSpec || matchQual;
    }

    return true;
  });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f172a' }}>
          Our Certified Medical Specialists
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>
          Search doctor details, check consultation fees, and schedule clinic appointments
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSpec={selectedSpecFilter}
        onSpecChange={onSelectSpecFilter}
      />

      {/* Filter Chips & Availability Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', maxWidth: '100%' }}>
          {specializationsList.map((spec) => (
            <button
              key={spec}
              className={`demo-btn ${selectedSpecFilter === spec ? 'active' : ''}`}
              style={{
                background: selectedSpecFilter === spec ? '#0d9488' : 'white',
                color: selectedSpecFilter === spec ? 'white' : '#475569',
                borderColor: selectedSpecFilter === spec ? '#0d9488' : '#cbd5e1',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.85rem'
              }}
              onClick={() => onSelectSpecFilter(spec)}
            >
              {spec}
            </button>
          ))}
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: '#0d9488' }}
          />
          Show only Available Doctors
        </label>
      </div>

      {/* Doctor Cards Grid */}
      <DoctorList
        doctors={filteredDoctors}
        onViewDetails={(doc) => {
          onSelectDoctor(doc);
          onNavigate('doctor-details');
        }}
        onBookAppointment={(doc) => {
          onSelectDoctor(doc);
          onNavigate('book');
        }}
      />
    </div>
  );
}
