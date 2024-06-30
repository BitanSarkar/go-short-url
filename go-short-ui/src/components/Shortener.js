// src/components/Shortener.js
import React, { useState } from 'react';
import ShortenService from '../services/ShortenService';
import Navbar from './Navbar';
import { Tooltip } from 'react-tooltip'
import Footer from './Footer';

const Shortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000); // Reset the copied state after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleShortenUrl = async () => {
    try {
      const response = await ShortenService.shortenUrl(originalUrl);
      if (response.status === 200) {
        setShortUrl(response.data.shortURL);
        setOriginalUrl('');
        setError('');
      } else {
        setError(response.data.message || 'Failed to shorten URL');
        setShortUrl('');
      }
    } catch (error) {
      if(error.response.status === 400 && error.response.data.message === "Invalid URL"){
        setError(error.response.data.message || 'Failed to shorten URL');
        setShortUrl('');
      }
      else {
        console.error('Error:', error);
        setError('Failed to connect to the server');
        setShortUrl('');
      }
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <p>Go Short is a free and easy-to-use URL shortener service. Simply enter your long URL and click "Shorten" to create a shorter version.</p>

        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button onClick={handleShortenUrl}>Shorten</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {shortUrl && (
        <div className="short-url">
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" id="shortUrl" data-tooltip-id="my-tooltip" data-tooltip-content="Click to re-direct to the shortened URL">
            {shortUrl}
          </a>
          <Tooltip id="my-tooltip" />
          <span onClick={handleCopyClick} className="copy-button">
            {isCopied ? 'Copied!' : 'Copy'}
          </span>
        </div>
      )}
      <div className="additional-info">
        <h3>How to Use Go Short</h3>
        <ol>
          <li>Enter the long URL in the input box above.</li>
          <li>Click the "Shorten" button.</li>
          <li>Copy the shortened URL to share it easily.</li>
        </ol>

        <h3>Benefits of Using Go Short</h3>
        <ul>
          <li>Easy to share URLs</li>
          <li>Shorter URLs</li>
          <li>Prevent URL Manipulation</li>
          <li>Improve Aesthetics</li>
          <li>Management of Links</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Shortener;
