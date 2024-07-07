import React, { useState, useEffect } from 'react';
import './electioninfo.css'
import { getElectionData } from './api'; 
const ElectionDropdown = ({ handleSelectElection, displayChange}) => {
  const [elections, setElections] = useState([]);
  
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await getElectionData();
        if (response.status === 200) {
          const data = response.data
          setElections(data);
        }

      }
      catch {
        console.log("Error fetching elections data");
      }
      
    };

    fetchElections();
  }, []);
  
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
              }} className='election_li'>{election.title}
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