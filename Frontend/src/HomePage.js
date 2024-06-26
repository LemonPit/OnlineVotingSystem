import React, { useContext, useState } from 'react';
import { AuthContext } from './contexts/authcontext';
import { Link } from 'react-router-dom'
import myImage from './header_pic.webp';
import NavigationBar from './NavBar';
import HomeInfo from './HomeInfo';
import Election from './SelectedElection';
import ElectionDropdown from './ElectionsInfo';
const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [display, setDisplay] = useState('start');
    const [error, setError] = useState('');
    const [selectedElection, setSelectedElection] = useState(null);

    const handleSelectElection = (election) => {
        setSelectedElection(election); 
        console.log("YEAH I DID SELECT ONE and the name is "+election.name)
    };
    const handleDisplayChange = (section) => {
        setDisplay(section); // Update state based on button clicked
    };
 
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div style={{ flex: '1' }}>
                <NavigationBar displayChange={handleDisplayChange} />
            </div>
            <div style={{ flex: '4' }}>
                {display === 'start' && <HomeInfo />}
                {display === 'elections' && <ElectionDropdown handleSelectElection={handleSelectElection} displayChange={handleDisplayChange} />}
                {display === 'election' && <Election selectedElection={selectedElection} />}
                {display !== 'start' && display !== 'elections' && display !== 'election' && (
                    <div>
                        <h2>No content for "{display}"</h2>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Home;