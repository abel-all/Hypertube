import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  director: varchar('director', { length: 255 }).notNull(),
  genre: varchar('genre', { length: 255 }).notNull(),
  releaseDate: timestamp('release_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});