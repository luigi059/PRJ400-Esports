import express from 'express';
import eventRoutes from './event.js';
import reviewRoutes from './review.js';
import searchRoutes from './search.js';
import userRoutes from './users.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/search', searchRoutes);
router.use('/review', reviewRoutes);
router.use('/event', eventRoutes);

export default router;
