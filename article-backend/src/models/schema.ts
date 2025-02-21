import { pgTable, serial, varchar, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(), // Clerk user ID
  email: varchar('email', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const genres = pgTable('genres', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).unique().notNull(),
});

export const userGenres = pgTable('user_genres', {
  userId: varchar('user_id', { length: 255 })
    .references(() => users.id, { onDelete: 'cascade' }), // Clerk user ID
  genreId: integer('genre_id')
    .references(() => genres.id, { onDelete: 'cascade' }),
});

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  genreId: integer('genre_id')
    .notNull()
    .references(() => genres.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  url: text('url').notNull().unique(),
  snippet: text('snippet'),
  serperData: jsonb('serper_data'),
  createdAt: timestamp('created_at').defaultNow(),
});