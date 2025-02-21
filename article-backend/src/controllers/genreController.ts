import { Request, Response } from 'express';
import { db } from '../utils/db';
import { genres, userGenres } from '../models/schema';
import { eq } from 'drizzle-orm';

// Get all genres
export const getGenres = async (req: Request, res: Response) => {
  try {
    const allGenres = await db.select().from(genres);
    res.json(allGenres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
};

export const selectGenres = async (req: Request, res: Response) => {
  const { userId, genreIds } = req.body;
  console.log('Selecting genres:', { userId, genreIds });

  try {
    await db.delete(userGenres).where(eq(userGenres.userId, userId));
    await db.insert(userGenres).values(
      genreIds.map((genreId: number) => ({ userId, genreId }))
    );
    console.log('Genres saved successfully');
    res.json({ message: 'Genres selected successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to select genres' });
  }
};