import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './FireStoreDataDisplay.css';
import axios from 'axios';

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

function RazorpayPayment() {
  const [uniqueId, setUniqueId] = useState('');
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('products');

  const collections = ['select','alpha', 'beta', 'gamma', 'charlie'];

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  const user_name = 'rzp_test_kI0EKfmFGUcey3';
  const pswd = 'gP3rAmtgApSOfvZbYHDcQABT';
  const [orderid, setOrderid] = useState('');

  const requestBody = {
    amount: 50000,
    currency: 'INR',
  };

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await axios.post('v1/orders', requestBody, {
          auth: {
            username: user_name,
            password: pswd,
          },
          headers: {
            'access-control-allow-origin': '*',
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        setOrderid(response.data.id);
        
      } catch (error) {
        console.error(error);
      }
      var success1=paymentokay();
        if (success1 == true)
        {
         getDataByUniqueIdAll();
        }
    };
    document.getElementById("nameit").onclick = function (e) {
        handleSubmit();
        
        e.preventDefault();
      };
   
  });

  const paymentokay = async () => {
    
    var success= false;
    var options = {
      key: user_name,
      amount: '50000',
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: orderid,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        success= true;
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    
    return success;
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
            products.push(productData);
          });

          if (querySnapshot.empty) {
            setError('No data found for the entered Unique ID.');
            setProductList([]);
          } else {
            const button = document.getElementById('nameit');
            button.style.display = 'block';
        
            // Center the button horizontally
            button.style.marginLeft = 'auto';
            button.style.marginRight = 'auto';
            const filteredProducts = products.map((product) => ({
              uniqueId:product.uniqueid,
              name: product.name,
              place: product.place,
              imageUrl:product.imageUrl
              // Add other fields you want to include
            }));
            setProductList(filteredProducts);
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

  const getDataByUniqueIdAll = () => {
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
            products.push(productData);
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
      <div className="card" style={{textAlign:"center"}}>
        <h2 style={{ color: 'white', textAlign: "center" }}>READ DATA</h2>
        <div className="input-container">
          <input
            type="text"
            id="uniqueId"
            placeholder="Enter Unique ID"
            style={{ color: "black" }}
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
                  <strong>Product {index + 1}:</strong><br />
                  
                  <img src={product["imageUrl"]} alt="Description of the image" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                  <br></br>
                  {Object.keys(product).map((key) => (
                    <span key={key}>
                      {key === "imageUrl" ? (
                        <div>

                        </div>
                      ) : (
                        <span>
                          {key}: {product[key]}<br />
                        </span>
                      )}
                    </span>
                  ))}
                  <br />
                </li>
              ))}
            </ul>
            
          </div>
          
        )}
        <div>
          <input type="text" value={"10"} style={{ display: "none" }} />
        </div>
        <button
         
          style={{ backgroundColor: "#f99436",display:"none" }}
          disabled={loading}
          id='nameit'

        >
          Show All Data
        </button>
      </div>
    </div>
  );
}

export default RazorpayPayment;
