import React from 'react';

const HomeInfo = () => {
  return (
    <div style={{
      width: '100%', 
      display: 'flex',  // Change to flex to better manage child layout
      flexDirection: 'column',  // Stacks children vertically
      fontFamily: 'Arial, sans-serif', 
      height: '100vh'  // Ensures it takes up the full viewport height
    }}>
      <header style={{ 
        backgroundColor: '#4A90E2', 
        color: 'white', 
        padding: '20px', 
        textAlign: 'center' 
      }}>
        <h1>Online Voting System for Student Elections</h1>
        <p>Secure, Efficient, and Transparent</p>
      </header>

      <section style={{ 
        flexGrow: 1,  // Allows this section to expand and fill available space
        margin: '20px', 
        textAlign: 'center' 
      }}>
        <h2>Welcome to the Future of Student Elections</h2>
        <p>Experience the convenience of casting your vote securely and swiftly from anywhere. Our Online Voting System ensures every student's voice is heard through a secure, accessible online platform.</p>
      </section>

      <section style={{ 
        backgroundColor: '#F7F7F7', 
        padding: '20px', 
        display: 'flex', 
        justifyContent: 'space-around' 
      }}>
        <div>
          <h3>Security</h3>
          <p>Ensuring the integrity and confidentiality of your vote with state-of-the-art security measures.</p>
        </div>
        <div>
          <h3>Efficiency</h3>
          <p>Streamlined voting process from registration to result declaration, making your voting experience smooth and hassle-free.</p>
        </div>
        <div>
          <h3>Transparency</h3>
          <p>Complete transparency in election processes with real-time updates and clear, accessible results.</p>
        </div>
      </section>

      <section style={{ 
        flexGrow: 1,  // Similarly allows this section to expand
        margin: '20px', 
        textAlign: 'center' 
      }}>
        <h2>Features</h2>
        <ul>
          <li>Secure Online Voting: Cast your vote securely from any device, knowing your data is protected.</li>
          <li>Real-Time Results: Access election results as they happen, with detailed insights and participation rates.</li>
          <li>Accessible Anywhere: Participate in student elections no matter where you are, all you need is internet access.</li>
        </ul>
      </section>

      <footer style={{ 
        backgroundColor: '#4A90E2', 
        color: 'white', 
        padding: '10px', 
        textAlign: 'center' 
      }}>
        <p>Join us in empowering the student body through innovative digital solutions!</p>
      </footer>
    </div>
  );
};

export default HomeInfo;
