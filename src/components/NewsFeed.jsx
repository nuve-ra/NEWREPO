import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const NewsFeed = ({ view }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setNews(data.articles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, []);

  const removeArticle = (index) => {
    setNews(news.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <h2 className="font-semibold mb-2">Error Loading News</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to News</span>
            </button>
          </div>
          
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">{selectedArticle.source?.name}</span>
              {selectedArticle.author && (
                <>
                  <span>•</span>
                  <span className="font-medium">{selectedArticle.author}</span>
                </>
              )}
              <span>•</span>
              <span>{new Date(selectedArticle.publishedAt).toLocaleDateString()}</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 leading-tight mb-2">{selectedArticle.title}</h1>
            
            {selectedArticle.urlToImage && (
              <div className="relative w-full">
                <img
                  src={selectedArticle.urlToImage}
                  alt={selectedArticle.title}
                  className="w-full h-[500px] object-cover rounded-lg shadow-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg"></div>
              </div>
            )}
            
            <div className="prose max-w-none mt-6">
              <p className="text-gray-700 leading-relaxed text-base">{selectedArticle.description}</p>
              <p className="text-gray-700 leading-relaxed text-base mt-4">{selectedArticle.content}</p>
              
              <div className="mt-8 flex justify-end">
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  Read full article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = news.slice(startIndex, endIndex);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  return (
    <div>
      <div className={view === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-6'}>
        {currentNews.map((article, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-lg shadow-sm relative cursor-pointer transition-transform hover:scale-[1.02] ${
              view === 'list' ? 'flex gap-6 items-start' : ''
            }`}
            onClick={() => setSelectedArticle(article)}
          >
            <img
              src={article.urlToImage || 'https://via.placeholder.com/300x200'}
              alt={article.title}
              className={`${
                view === 'list'
                  ? 'w-48 h-32 object-cover rounded-lg'
                  : 'w-full h-48 object-cover rounded-lg mb-3'
              }`}
            />
            <div className={view === 'list' ? 'flex-1' : ''}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{article.title}</p>
              {view === 'list' && (
                <p className="text-sm text-gray-500 mt-2">{article.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === index + 1
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
