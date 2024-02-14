import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Products from './components/products';
import { get } from 'http';

// TODO improve URL formatting stuff
const API_URL = 'http://localhost:3000/api/v1/products';

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data);
}

function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    let mounted = true;
    getAPIData().then(items => {
      if (mounted) {
        setProducts(items);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <Products products={products} />
    </div>
  );
}

export default App;
