import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './FireStoreDataDisplay.css';
import { Link } from 'react-router-dom';

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

function FirestoreDataDisplay() {
  const [uniqueId, setUniqueId] = useState('');
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('products'); 

  const collections = ['alpha', 'beta','gamma','charlie'];

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  const getDataByUniqueId = () => {
    setLoading(true);
    setError(null);

    const uniqueIdNumber = uniqueId;

    if (!isNaN(uniqueIdNumber)) {
      const collectionRef = db.collection(selectedCollection);

      collectionRef
        .where('uniqueid', '==', uniqueIdNumber)
        .get()
        .then((querySnapshot) => {
          const products = [];
          querySnapshot.forEach((doc) => {
            const productData = doc.data();
            const productPlace = productData.place;
            const productUniqueId = productData.uniqueid;
            const productName = productData.name;
            const productLink = productData.imageUrl;

            products.push({ place: productPlace, uniqueId: productUniqueId ,name:productName,imageUrl:productLink});
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

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="card">
        <h2 style={{ color: 'white', textAlign: "center" }}>READ DATA</h2>
        <div className="input-container">
          <input
            type="text"
            id="uniqueId"
            placeholder="Enter Unique ID"
            style={{color:"black"}}
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
          />&nbsp;
        </div>

        <div className="collection-dropdown">
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
          style={{ backgroundColor: "#f99436" }}
          disabled={!uniqueId || isNaN(parseFloat(uniqueId)) || loading}
        >
          Submit
        </button>
        {error && <p className="error">{error}</p>}

        {productList.length > 0 && (
          <div className="result-card">
            <h1 style={{ color: 'white' }}>Product List</h1>
            <ul>
              {productList.map((product, index) => (
                <li key={index} style={{ color: 'white' }}>
                   <img src={product.imageUrl} alt="Description of the image" style={{maxWidth:'200px',maxHeight:'200px'}}/>
                   <br></br>
                  Unique ID: {product.uniqueId}, Place: {product.name}, Input 3: {product.input3}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <Link to="/write" style={{ display: "inline-block", backgroundColor: "#04040400", borderColor: "#e7eff0", color: "#f99436" }}>
          <u>Write</u>
        </Link>{" "}
        <Link to="/login" style={{ display: "inline-block", backgroundColor: "#33333300", color: " #f99436" }}>
          <u>Login</u>
        </Link>{" "}
        <Link to="/payment" style={{ display: "inline-block", backgroundColor: "#33333300", color: " #f99436" }}>
          <u>signup</u>
        </Link>
      </div>
    </div>
  );
}

export default FirestoreDataDisplay;