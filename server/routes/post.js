import express from 'express';
import postController from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, postController.createPost);

export default router;
