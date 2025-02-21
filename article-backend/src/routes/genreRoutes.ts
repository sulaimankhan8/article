import express from 'express';
import { getGenres, selectGenres } from '../controllers/genreController';

const router = express.Router();

router.get('/', getGenres);
router.post('/select', selectGenres);

export const genreRoutes = router;