import { Request, Response } from 'express';
import { db } from '../utils/db';
import { articles } from '../models/schema';
import { eq } from 'drizzle-orm';

export const getArticles = async (req: Request, res: Response): Promise<void> => {
  const { genre } = req.query;
  
  if (!genre) {
    res.status(400).json({ error: 'Genre parameter is required' });
    return;
  }

  try {
    const genreId = parseInt(genre as string);
    const articleList = await db
      .select()
      .from(articles)
      .where(eq(articles.genreId, genreId))
      .orderBy(articles.createdAt);
      res.json(articleList || [])
    if (articleList.length === 0) {
      res.status(404).json({ message: 'No articles found for this genre' });
      return;
    }

    const serpApiResponse = await fetch(`https://serpapi.com/search?q=${genre}&api_key=${process.env.SERPAPI_API_KEY}`);
    const serpData = await serpApiResponse.json();

     res.json({
      articles: articleList,
      serpData: serpData,  
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};
