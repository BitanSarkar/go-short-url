import React, { useState } from 'react';
import ShortenService from '../services/ShortenService';
import Navbar from './Navbar';
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
      console.log(response)
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
      <div className='content'>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button onClick={handleShortenUrl}>Shorten</button>
      </div>
      {error && <p style={{ color: 'red', marginLeft: '20%' }}>{error}</p>}
      {shortUrl && (
        <div style={{ marginLeft: '20%' }}>
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <span
            onClick={handleCopyClick}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </span>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Shortener;
