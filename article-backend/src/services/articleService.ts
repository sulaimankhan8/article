import axios from 'axios';

export const fetchArticles = async (genre: string) => {
  const response = await axios.get('https://serpapi.com/search', {
    params: {
      q: `latest ${genre} articles`,
      api_key: process.env.SERPAPI_API_KEY,
      num: 10,
    },
  });
  return response.data.organic_results;
};