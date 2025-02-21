import express from 'express';
import { getArticles } from '../controllers/articleController';
import { requireAuth } from '../middleware/clerk';

const router = express.Router();

router.get('/', requireAuth, getArticles);

export const articleRoutes = router;