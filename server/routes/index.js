import express from 'express';
import reviewRoutes from './review.js';
import searchRoutes from './search.js';
import userRoutes from './users.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/search', searchRoutes);
router.use('/review', reviewRoutes);

export default router;
