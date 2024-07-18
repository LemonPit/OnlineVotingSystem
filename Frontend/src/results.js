import React, { useState, useEffect } from 'react';
import './results.css'
import { getResults } from './api'; 
import ResultsChart from './ResultsChart';
import FullResultsChart from './ResultsChart_2';

const ResultsInfo = ({ resetResults }) => {
  const [Results, setResults] = useState([]);
  const [ChosenResults, setChosenResults] = useState(null);
  const [BallotResults, setBallotResults] = useState(null);
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
    setChosenResults(null);
    setBallotResults(null);
  }, [resetResults]);

  const handleElectionClick = (election, index) => {
    setChosenResults(election.ballots);
    setBallotResults(null);
    

  };
  const handleBallotClick = (ballot) => {
    setBallotResults(ballot);

  }
  
  return (
    <div style={{ border: '1px solid black', height: '100%' }}>
    {Results ? (
      <>{ChosenResults ? (
        <>
         {BallotResults ? (
          <>
            <div>
            <FullResultsChart ballot={BallotResults} />
            </div>
          </>
        ):(
          <>
          <ul className='ballot_results_ul'>
              {ChosenResults.map((ballot, ballots_index) => (
                <li key={ballots_index} className='ballot_result_li' onClick={() => handleBallotClick(ballot)}>
                  <h3>{ballot.ballot_title} Results</h3>
                  <ResultsChart ballot={ballot} />
                
                </li>
              ))}
            </ul>
          </>
        )} 

          
        </>
      ) : (
        <>
          <ul className='election_results_ul'>
            {Results && Results.map((election, index) => (
              <li key={index} className='election_result_li' onClick={() => handleElectionClick(election)}>
                {election.election_title} Results
              </li>
            ))}
          </ul>
        </>
      )}
      </>
      ):(
      <><h2>No results so far...</h2></>
      )}
      
    </div>
  );
};


export default ResultsInfo;