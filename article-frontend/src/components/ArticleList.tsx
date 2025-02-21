import { useState, useEffect } from 'react';
import api from '@/utils/api';

// components/ArticleList.tsx
export default function ArticleList({ genreId }: { genreId: number }) {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get(`/api/articles?genre=${genreId}`);
        // Ensure response data is an array
        setArticles(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]); // Reset to empty array on error
      }
    };
    fetchArticles();
  }, [genreId]);

  return (
    <div className="space-y-4">
      {articles.length === 0 ? (
        <p className="text-gray-500">No articles found for this genre.</p>
      ) : (
        articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            className="block p-4 border rounded hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-gray-600">{article.snippet}</p>
          </a>
        ))
      )}
    </div>
  );
}