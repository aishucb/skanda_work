import React from 'react';

function DisplayData({ userData, setPage }) {
  return (
    <div>
      <h2>User Data</h2>
      {/* Display user data here */}
      <button onClick={() => setPage('main')}>Back to Main</button>
    </div>
  );
}

export default DisplayData;
