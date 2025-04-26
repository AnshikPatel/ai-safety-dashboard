import React, { useState } from 'react';
import { Incident } from '../types/Incident';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="incident-item">
      <h3>{incident.title}</h3>
      <p>Severity: <span className={`severity-${incident.severity.toLowerCase()}`}>{incident.severity}</span></p>
      <p>Reported At: {new Date(incident.reported_at).toLocaleString()}</p>
      <button onClick={toggleDescription}>View Details</button>
      {isExpanded && <p>{incident.description}</p>}
    </div>
  );
};

export default IncidentItem;
