import React, { useState } from 'react';
import './electioninfo.css'
const Election = () => {
  const [elections, setElections] = useState([
    // Example elections data
    { id: 1, name: 'Student Council Elections 2024' },
    { id: 2, name: 'Science Club Elections 2024' }
  ]);
  const [selectedElection, setSelectedElection] = useState(null);

  const handleSelectElection = (election) => {
    setSelectedElection(election);
  };

  return (
    <div style={{ border: '1px solid black', height: '100%'}}>
      yupppppppppppppp
    </div>
  );
};

export default Election;