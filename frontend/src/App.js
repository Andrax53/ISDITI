import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState('');
  const [encodedImageId, setEncodedImageId] = useState(null);
  const [decodedData, setDecodedData] = useState('');
  const [fileName, setFileName] = useState('');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || '');
  };

  const handleDataChange = (e) => {
    setData(e.target.value);
  };

  const handleEncode = async () => {
    if (!file || !data) {
      alert('Please provide both an image and data to encode.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', data);

    try {
      const response = await axios.post('http://localhost:8000/encode/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEncodedImageId(response.data.id);
      alert(`Image encoded successfully. Image ID: ${response.data.id}`);
    } catch (error) {
      console.error('Error encoding image:', error);
      alert('Failed to encode image.');
    }
  };

  const handleDecode = async () => {
    if (!encodedImageId) {
      alert('Please encode an image first.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/decode/${encodedImageId}`);
      setDecodedData(response.data.data);
    } catch (error) {
      console.error('Error decoding image:', error);
      alert('Failed to decode image.');
    }
  };

  return (
    <div className="app-container">
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="header">
        <h1>Steganography Tool</h1>
        <p className="subtitle">Hide your secret messages in images securely</p>
      </div>

      <div className="main-content">
        <div className="encode-section card">
          <h2>Encode Data into Image</h2>
          <div className="file-input-container">
            <label className="file-input-label">
              <span className="file-input-text">{fileName || 'Choose an image'}</span>
              <input 
                type="file" 
                accept=".png,.bmp" 
                onChange={handleFileChange}
                className="file-input" 
              />
              <span className="file-input-button">Browse</span>
            </label>
          </div>
          <div className="textarea-container">
            <textarea
              placeholder="Enter your secret message here..."
              value={data}
              onChange={handleDataChange}
              rows={4}
              className="data-input"
            />
          </div>
          <button onClick={handleEncode} className="action-button">
            Encode Message
          </button>
        </div>

        <div className="decode-section card">
          <h2>Decode Hidden Message</h2>
          <button onClick={handleDecode} className="action-button">
            Decode Message
          </button>
          
          {encodedImageId && (
            <div className="result-box">
              <h3>Image ID</h3>
              <p className="image-id">{encodedImageId}</p>
            </div>
          )}
          
          {decodedData && (
            <div className="result-box">
              <h3>Decoded Message</h3>
              <p className="decoded-text">{decodedData}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
