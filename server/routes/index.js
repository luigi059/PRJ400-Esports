import express from 'express';
import eventRoutes from './event.js';
import inivteRoutes from './invite.js';
import postRoutes from './post.js';
import reviewRoutes from './review.js';
import searchRoutes from './search.js';
import teamRoutes from './team.js';
import userRoutes from './users.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/search', searchRoutes);
router.use('/review', reviewRoutes);
router.use('/event', eventRoutes);
router.use('/post', postRoutes);
router.use('/team', teamRoutes);
router.use('/invite', inivteRoutes);

export default router;
