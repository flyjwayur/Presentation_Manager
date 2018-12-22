import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Link to="/presentations">
        <h1>We are at home/ check presentations</h1>
      </Link>
    </div>
  )
}

export default HomePage
