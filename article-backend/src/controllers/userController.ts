import { Request, Response } from 'express';
import { db } from '../utils/db';
import { users } from '../models/schema';

export const createUser = async (req: Request, res: Response) => {
  const { userId, email } = req.body;

  try {
    // Save the user to the database
    await db.insert(users).values({
      id: userId,
      email,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};