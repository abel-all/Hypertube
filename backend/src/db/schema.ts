import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  profileImage: varchar('profile_image', { length: 255 }).notNull().default('https://demo.sirv.com/chair.jpg?scale.width=303'),
  preferredLanguage: varchar('preferred_language', { length: 255 }).notNull().default('EN'),
  provider: varchar('provider', { length: 50 }).notNull().default('local'),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdateFn(() => new Date()),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  director: varchar('director', { length: 255 }).notNull(),
  genre: varchar('genre', { length: 255 }).notNull(),
  releaseDate: timestamp('release_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const filters = pgTable('filters', {
  id: serial('id').primaryKey(),
  years: varchar('years', { length: 255 }).notNull(),
  genres: varchar('genres', { length: 255 }).notNull(),
  ratings: varchar('ratings', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});