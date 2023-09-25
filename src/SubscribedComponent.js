import React from 'react';
import { useLocation } from 'react-router-dom';


import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './FireStoreDataDisplay.css';

const firebaseConfig = {
  apiKey: "AIzaSyCEJlazhRcbvonRy_BBA2hgqo5pcOemsRE",
  authDomain: "skanda-project-fd476.firebaseapp.com",
  projectId: "skanda-project-fd476",
  storageBucket: "skanda-project-fd476.appspot.com",
  messagingSenderId: "810284200286",
  appId: "1:810284200286:web:bff867b840c67537935fcf",
  measurementId: "G-9TXBJ8YRNV"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const productsCollection = db.collection("products");
function SubscribedComponent() {
    const location = useLocation();
  const isAuthenticated = location.state?.isAuthenticated;
  // Check if isAuthenticated is true
  const [uniqueId, setUniqueId] = useState('');
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('products'); // Default to 'products'

  const collections = ['charlie', 'alpha',  'beta', 'gamma'];

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  const getDataByUniqueId = () => {
    setLoading(true);
    setError(null);

    const uniqueIdNumber =uniqueId;

    if (!isNaN(uniqueIdNumber)) {
      // Use the selected collection in the query
      const collectionRef = db.collection(selectedCollection);

      collectionRef
        .where('uniqueid', '==', uniqueIdNumber)
        .get()
        .then((querySnapshot) => {
          const products = [];
          querySnapshot.forEach((doc) => {
            const productData = doc.data();
            const productName = productData.name;
            const productPlace = productData.place;
            const productUniqueId = productData.uniqueid;

            products.push(`Name: ${productName}, Place: ${productPlace}, Unique ID: ${productUniqueId}`);
          });

          if (querySnapshot.empty) {
            setError('No data found for the entered Unique ID.');
            setProductList([]);
          } else {
            setProductList(products);
          }
        })
        .catch((error) => {
          setError(`Error getting documents: ${error.message}`);
          setProductList([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('Invalid input. Please enter a valid number.');
      setProductList([]);
      setLoading(false);
    }
  };
  if (isAuthenticated) {
    return (
      <div className="container" style={{textAlign:"center"}}>
        <div className="card">
        
          <div className="input-container">
          
            <input
              type="text"
              id="uniqueId"
              placeholder="Enter Unique ID"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
            />
            
          </div>
  
          <div className="collection-dropdown">
            <label htmlFor="collection">Select Collection:</label>
            <select
              id="collection"
              value={selectedCollection}
              onChange={handleCollectionChange}
            >
              {collections.map((collectionName) => (
                <option key={collectionName} value={collectionName}>
                  {collectionName}
                </option>
              ))}
            </select>
          </div>
          <button
              onClick={getDataByUniqueId}
              disabled={!uniqueId || isNaN(parseFloat(uniqueId)) || loading}
              style={{backgroundColor:"#f99436"}}
            >
              Submit
            </button>
          {error && <p className="error">{error}</p>}
  
          {productList.length > 0 && (
            <div className="result-card">
              <h1 style={{color:'white'}}>Product List</h1>
              <ul>
                {productList.map((product, index) => (
                  <li key={index} style={{color:'white'}}>{product}</li>
                ))}
              </ul>
            </div>
          
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {/* Content for non-authenticated users */}
        <p>Please log in to access this page.</p>
      </div>
    );
  }
}

export default SubscribedComponent;
