import React, { useState, useEffect } from 'react';

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
        const response = await fetch('https://newsapi.org/v2/everything?q=tesla&apiKey=4cadd57a58c14ea4b4c2dc0b00bc5ae8');
        
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
          <div className="flex justify-end">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <i className="fas fa-times text-sm"></i>
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
                  className="text-blue-600 hover:underline text-sm inline-flex items-center font-medium"
                >
                  Read full article <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className={view === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
        {currentItems.map((article, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              view === 'list' ? 'flex gap-4' : ''
            }`}
          >
            {article.urlToImage && (
              <div className={view === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}>
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 
                className="font-medium text-lg mb-2 cursor-pointer hover:text-emerald-600"
                onClick={() => setSelectedArticle(article)}
              >
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{article.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => removeArticle(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: Math.ceil(news.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              currentPage === i + 1
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
