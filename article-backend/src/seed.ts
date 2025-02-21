import { db } from './utils/db';
import { genres } from './models/schema';
import 'dotenv/config';  // Add this at the top

console.log('Database URL:', process.env.DATABASE_URL);

async function seed() {
  try {
    // Insert initial genres
    await db.insert(genres).values([
      { name: 'Technology' },
      { name: 'Science' },
      { name: 'Health' },
      { name: 'Education' },
      { name: 'Business' },
    ]);
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();