import React from 'react';
import RegisterForm from '../components/RegisterForm';

export default function PatientRegisterPage({
  onRegister,
  onNavigate
}) {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={() => onNavigate('login')}
      />
    </div>
  );
}
