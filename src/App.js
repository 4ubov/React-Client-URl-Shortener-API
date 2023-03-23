import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/create-short', {
        longUrl,
      });
      setErrorMessage('');
      setShortUrl('http://localhost:8080/api/'+response.data.shortUrl);
      setCopied(false); // Reset copied state when a new short URL is generated
    } catch (error) {
      setShortUrl('');
      setErrorMessage(error.response.data.message);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="App">
      <span className="title">Enter URL:</span>
      <form onSubmit={handleSubmit}>
        <input type="text" value={longUrl} onChange={(event) => setLongUrl(event.target.value)} placeholder="Example.com" />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Generate</button>
      </form>
      {shortUrl && (
        <div className="short-url">
          <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
          <button className="copy-btn" onClick={handleCopyClick}>
            {copied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
