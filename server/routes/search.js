import express from 'express';
import searchController from '../controllers/searchController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/minisearch', searchController.miniSearch);

export default router;
