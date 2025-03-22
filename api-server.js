const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());

const VITE_NEWS_API_KEY = '4cadd57a58c14ea4b4c2dc0b00bc5ae8';

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything?q=tesla&apiKey=4cadd57a58c14ea4b4c2dc0b00bc5ae8', {
      params: {
        q: 'tesla',
        apiKey: VITE_NEWS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
