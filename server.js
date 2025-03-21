const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());

const NEWS_API_KEY = '4cadd57a58c14ea4b4c2dc0b00bc5ae8';
const NEWS_API_URL = 'https://newsapi.org/v2/everything?q=tesla&apiKey=4cadd57a58c14ea4b4c2dc0b00bc5ae8';

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: 'tesla',
        apiKey: NEWS_API_KEY,
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
