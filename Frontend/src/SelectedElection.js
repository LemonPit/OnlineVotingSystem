import React, { useState, useEffect } from 'react';
import './electioninfo.css'
import defaultImg from './default_img.png'

const fetchBallots = (electionId) => {
  return Promise.resolve([
    { id: 1, title: 'Presidential Candidates' },
    { id: 2, title: 'Vice Presidential Candidates' },
    { id: 3, title: 'Treasurer Candidates' }
  ]);
};

const fetchChoices = (ballotId) => {
  return Promise.resolve([
    { id: 1, choice_text: 'John Doe', candidate: { name: 'John Doe' } },
    { id: 2, choice_text: 'Jane Smith', candidate: { name: 'Jane Smith' } },
    { id: 3, choice_text: 'Alex Brown', candidate: { name: 'Alex Brown' } },
    { id: 4, choice_text: 'Chris Green', candidate: { name: 'Chris Green' } },
    { id: 5, choice_text: 'Pat Taylor', candidate: { name: 'Pat Taylor' } },
    { id: 6, choice_text: 'Morgan Lee', candidate: { name: 'Morgan Lee' } }

  ]);
};

const Election = ({ selectedElection }) => {
  const [ballots, setBallots] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selectedBallot, setSelectedBallot] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  useEffect(() => {
    if (selectedElection) {
      fetchBallots(selectedElection.id).then(setBallots);
    }
  }, [selectedElection]);
  const handleBallotClick = (ballot) => {
    setSelectedBallot(ballot);
    fetchChoices(ballot.id).then(setChoices);
  };
  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
  }

  return (
    <div style={{ border: '1px solid black', height: '100%' }}>
      {selectedElection ? (
        <>
          <h2>{selectedElection.name}</h2>
          {selectedBallot ? (
            <>
              {selectedChoice ? (
              <>
                <h1>THANKS FOR VOTING!!!</h1>
              </>
              ): (
              <>
                <h3>{selectedBallot.title}</h3>
                <ul className="choices_ul">
                  {choices.map(choice => (
                    <li key={choice.id} className='choices_li'><img src={defaultImg} onClick={() => handleChoiceClick(choice)} alt="candidate" id='header-img'/>{choice.choice_text}</li>
                  ))}
                </ul>
                <button onClick={() => setSelectedBallot(null)}>Back to Ballots</button>
              </>
              )}
              
            </>
          ) : (
            <>
              <h3>Ballots</h3>
              <ul className='ballot_ul'>
                {ballots.map(ballot => (
                  <li key={ballot.id} onClick={() => handleBallotClick(ballot)} className='ballot_li'>
                    {ballot.title}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <p>No Election Selected</p>
      )}
    </div>
  );
};


export default Election;