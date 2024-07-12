import React, { useState, useEffect } from 'react';
import './electioninfo.css'
import { getResults } from './api'; 

const ResultsInfo = ({ handleSelectElection, displayChange}) => {
  const [Results, setResults] = useState([]);
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getResults();
        console.log(response);
        if (response.status === 200) {
          const data = response.data
          setResults(data);
        }

      }
      catch {
        console.log("Error fetching elections data");
      }
      
    };

    fetchResults();
  }, []);
  
  return (
    <div style={{ border: '1px solid black', height: '100%'}}>
      
    </div>
  );
};

export default ResultsInfo;