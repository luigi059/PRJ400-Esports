import express from 'express';
import postController from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.delete('/delete/:id', auth, postController.deletePost);

export default router;
