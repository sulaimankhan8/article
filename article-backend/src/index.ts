import express from 'express';
import cron from 'node-cron';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './utils/db';
import { fetchArticles } from './services/articleService';
import {  articleRoutes } from './routes/articleRoutes';
import {  genreRoutes  } from './routes/genreRoutes';
import { userRoutes } from './routes/userRoutes';
import { requireAuth } from './middleware/clerk';
import { articles, genres } from './models/schema'; // Import genres

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const app = express();
app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    })
  );
app.use(express.json());

// Schedule hourly article updates
cron.schedule('0 * * * *', async () => {
  console.log('Fetching new articles...');
  try {
    const allGenres = await db.select().from(genres);
    for (const genre of allGenres) {
      const results = await fetchArticles(genre.name);
      await db.insert(articles).values(
        results.map((article: any) => ({
          genreId: genre.id,
          title: article.title,
          url: article.link,
          snippet: article.snippet,
          serperData: article,
        }))
      );
    }
    console.log('Articles updated successfully.');
  } catch (error) {
    console.error('Error updating articles:', error);
  }
});

// Routes
app.get("/", (req, res) => {
    res.send("Server is running!");
  });
app.use('/api/users', userRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/articles', requireAuth, articleRoutes); // Protect article routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});