import React, { useState, useEffect, useContext } from 'react';
import './electioninfo.css'
import defaultImg from './default_img.png'
import { getBallotsData, getCandidates, getChoices, createVote } from './api'; 
import { AuthContext } from './contexts/authcontext';




const fetchChoices = async (ballotId) => {
  try {
    const response = await getChoices(ballotId);
    console.log('Candidate Data', response);
    return response.data;  
  }
  catch (err) {
    console.error('Error fetching candidates:', err);
  }
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
  const [error, setError] = useState("");
  const [selectedBallot, setSelectedBallot] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const { userID } = useContext(AuthContext);


  const  fetchBallots = async (electionId) => {
    try {
      const response = await getBallotsData(electionId);
      console.log('Ballot Data', response);
      return response.data;  
    }
    catch (err) {
      console.error('Error fetching ballots:', err);
    }
      return Promise.resolve([
      { id: 1, title: '...' },
      { id: 2, title: '...' },
      { id: 3, title: '...' }
    ]);
  };

  useEffect(() => {
    if (selectedElection) {
      fetchBallots(selectedElection.id).then(setBallots);
    }
  }, [selectedElection]);
  const handleBallotClick = (ballot) => {
    setChoices([]);
    fetchChoices(ballot.id).then(setChoices);
    setSelectedBallot(ballot);
  };
  const handleChoiceClick = async (choice) => {
    setSelectedChoice(choice);
    try {
      const response = await createVote(userID, choice.id);
      if (response.data) {
        console.log('Vote created successfully!');
      }
    }
    catch (error) {
      console.log("Error Creating Vote");
      if (error.response) {
        console.log("Error Creating Vote:", error.response.data.message);
        setError(error.response.data.message)
        console.log("Status code:", error.response.status);
        console.log("Headers:", error.response.headers);

      }
    }
  }

  return (
    <div style={{ border: '1px solid black', height: '100%' }}>
      {selectedElection ? (
        <>
          <h2>{selectedElection.name}</h2>
          {selectedBallot ? (
            <>
              {selectedChoice && !error ? (
                <>
                  <h1>THANKS FOR VOTING!!!</h1>
                </>
              ) : (
                <>
                  {error && <h3>{error}</h3>}
                  <h3>{selectedBallot.title}</h3>
                  <ul className="choices_ul">
                    {choices.map(choice => (
                      <li key={choice.id} className='choices_li'>
                        <img src={defaultImg} onClick={() => handleChoiceClick(choice)} alt="candidate" id='header-img'/>
                        {choice.choice_text}
                      </li>
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