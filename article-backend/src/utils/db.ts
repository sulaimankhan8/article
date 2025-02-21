import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../models/schema';

const pool = new Pool({
  host: 'ep-bold-bush-a16l3v96-pooler.ap-southeast-1.aws.neon.tech',
  user: 'neondb_owner',
  password: 'npg_bDAwS7dhUBE2',
  database: 'neondb',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export const db = drizzle(pool, { schema });