import React, { useState } from 'react';
import { Incident } from './types/Incident';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';
import './App.css';

const App: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>([
        { id: 1, title: "Biased Recommendation Algorithm", description: "Algorithm consistently favored certain demographics...", severity: "Medium", reported_at: "2025-03-15T10:00:00Z", expanded: false },
        { id: 2, title: "LLM Hallucination in Critical Info", description: "LLM provided incorrect safety procedure information...", severity: "High", reported_at: "2025-04-01T14:30:00Z", expanded: false },
        { id: 3, title: "Minor Data Leak via Chatbot", description: "Chatbot inadvertently exposed non-sensitive user metadata...", severity: "Low", reported_at: "2025-03-20T09:15:00Z", expanded: false },
    ]);

    const [filterSeverity, setFilterSeverity] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<string>('newest');

    const toggleDescription = (id: number) => {
        setIncidents(prev => 
            prev.map(incident => 
                incident.id === id ? { ...incident, expanded: !incident.expanded } : incident
            )
        );
    };

    const addIncident = (incident: Incident) => {
        setIncidents(prev => [incident, ...prev]);
    };

    const filteredIncidents = incidents
        .filter(i => filterSeverity === 'All' || i.severity === filterSeverity)
        .sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
            } else {
                return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
            }
        });

    return (
        <div className="App">
            <header>
                <h1>AI Safety Incident Dashboard</h1>
            </header>

            <div className="controls">
                <select onChange={(e) => setFilterSeverity(e.target.value)} value={filterSeverity}>
                    <option value="All">All Severities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            <IncidentList incidents={filteredIncidents} onToggle={toggleDescription} />
            <IncidentForm onAdd={addIncident} />
        </div>
    );
}

export default App;
