require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));


//const NEWS_API_URL = 'https://newsapi.org/v2/everything?q=tesla';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Log API key for debugging (only show first 4 characters for security)
console.log(`Loaded API Key: ${process.env.NEWS_API_KEY?.slice(0, 4)}********`);



app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      headers: {
        'User-Agent': 'YourAppName/1.0', // Helps avoid 426 errors
      },
      params: {
        q: 'tesla',
        apiKey: process.env.NEWS_API_KEY,  
        pageSize: 100,
        language: 'en',
        sortBy: 'publishedAt'
      }
    });


    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Failed to fetch news');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
