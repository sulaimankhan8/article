import { db } from '../utils/db';
import { genres, userGenres } from '../models/schema';

export const getAllGenres = async () => {
  return await db.select().from(genres);
};

export const selectGenresForUser = async (userId: number, genreIds: number[]) => {
  await db.delete(userGenres).where(eq(userGenres.userId, userId));
  await db.insert(userGenres).values(
    genreIds.map((genreId) => ({
      userId,
      genreId,
    }))
  );
};