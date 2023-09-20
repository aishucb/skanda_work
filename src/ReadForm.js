import React, { useState } from 'react';
import './readform.css'; // Import your CSS styles for ReadData component

function ReadData() {
  // State to track the selected database (alpha, beta, charlie, delta)
  const [selectedDatabase, setSelectedDatabase] = useState('alpha');
  
  // State to store the unique identifier
  const [uniqueIdentifier, setUniqueIdentifier] = useState('');

  // State to store retrieved data
  const [retrievedData, setRetrievedData] = useState(null);

  const handleDatabaseChange = (e) => {
    setSelectedDatabase(e.target.value);
  };

  const handleIdentifierChange = (e) => {
    setUniqueIdentifier(e.target.value);
  };

  const handleSearch = () => {
    // Implement the logic to search and retrieve data from the selected database
    // You can use Firebase Firestore or your preferred database here

    // Example: Fetch data based on the selected database and uniqueIdentifier
    // Replace this with your actual data retrieval logic
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      // Add more fields as needed
    };

    setRetrievedData(data);
  };

  return (
    <div className="read-data-container">
      <h2>Read Data</h2>

      {/* Select database */}
      <div className="select-database">
        <label>Select Database:</label>
        <select value={selectedDatabase} onChange={handleDatabaseChange}>
          <option value="alpha">Alpha Database</option>
          <option value="beta">Beta Database</option>
          <option value="charlie">Charlie Database</option>
          <option value="delta">Delta Database</option>
        </select>
      </div>

      {/* Unique Identifier input */}
      <div className="unique-identifier">
        <label>Enter Unique Identifier:</label>
        <input
          type="text"
          value={uniqueIdentifier}
          onChange={handleIdentifierChange}
        />
      </div>

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>

      {/* Display retrieved data */}
      {retrievedData && (
        <div className="retrieved-data">
          <h3>Retrieved Data</h3>
          <pre>{JSON.stringify(retrievedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ReadData;
