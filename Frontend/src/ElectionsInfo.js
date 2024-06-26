import React, { useState } from 'react';
import './electioninfo.css'
const ElectionDropdown = ({ handleSelectElection, displayChange}) => {
  const [elections, setElections] = useState([
    // Example elections data
    { id: 1, name: 'Student Council Elections 2024' },
    { id: 2, name: 'Science Club Elections 2024' }
  ]);
  

  return (
    <div style={{ border: '1px solid black', height: '100%'}}>
      {elections.length > 0 ? (
        <div>
          <h2>Select an Election</h2>
          <ul style={{ listStyleType: 'none', padding: 0}}>
            {elections.map(election => (
              <li key={election.id}
              onClick={() => {
                handleSelectElection(election);
                displayChange('election');
              }} className='election_li'>{election.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No Elections are currently ongoing.</p>
      )}
    </div>
  );
};

export default ElectionDropdown;