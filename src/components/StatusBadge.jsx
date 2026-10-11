import React from 'react';

export default function StatusBadge({ status }) {
  const normalized = status ? status.toUpperCase() : 'BOOKED';

  let icon = '📅';
  if (normalized === 'CONFIRMED') icon = '✓';
  if (normalized === 'CANCELLED') icon = '✕';
  if (normalized === 'COMPLETED') icon = '★';

  return (
    <span className={`status-badge ${normalized}`}>
      <span>{icon}</span> {normalized}
    </span>
  );
}
