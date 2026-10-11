import React from 'react';
import LoginForm from '../components/LoginForm';

export default function PatientLoginPage({
  onLogin,
  onNavigate
}) {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={() => onNavigate('register')}
      />
    </div>
  );
}
