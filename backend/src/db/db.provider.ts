import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DB = Symbol('DB');

export const dbProvider: Provider = {
  provide: DB,
  useFactory: () => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    return drizzle(pool, { schema });
  },
};