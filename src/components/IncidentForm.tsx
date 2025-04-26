import React, { useState } from 'react';
import { Incident } from '../types/Incident';
import './IncidentForm.css';

interface IncidentFormProps {
    onAdd: (incident: Incident) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('Medium');

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Check if the form fields are not empty
        if (title && description) {
            const newIncident: Incident = {
                id: Date.now(),
                title,
                description,
                severity,
                reported_at: new Date().toISOString(),
                expanded: false
            };
            console.log('New Incident:', newIncident);  // Log the new incident for debugging
            onAdd(newIncident); // Call the parent function to add the incident to the list
            setTitle('');  // Clear the form fields after submission
            setDescription('');
            setSeverity('Medium');
        } else {
            alert('Please fill in all fields.');  // Alert if the fields are empty
        }
    };

    return (
        <div className="incident-form-container">
            <h2>Report New Incident</h2>
            <form onSubmit={handleSubmit} className="incident-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Severity:</label>
                    <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Add Incident</button>
            </form>
        </div>
    );
}

export default IncidentForm;
