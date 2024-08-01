import React from 'react';
import { Link } from 'react-router-dom';

const homeStyle = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '2em',
  marginTop: '50px',
};

const routingStyle = {
  marginTop: '20px',
};

const Home = () => {
  return (
    <div style={homeStyle}>
      HOME 
      <br />
      This is my home page.
      <div style={routingStyle}>
        <ol>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
