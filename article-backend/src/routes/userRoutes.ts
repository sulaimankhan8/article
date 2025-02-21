import express from 'express';
import { createUser } from '../controllers/userController';

const router = express.Router();

// Create a new user
router.post('/', createUser);

export const userRoutes = router;