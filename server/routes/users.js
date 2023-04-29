import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', userController.login);
router.get('/logout', userController.logout);
//router.get('/info', auth, userController.getUser);
router.get('/info/:userID', auth, userController.getUser);
router.get('/refresh_token', userController.refreshToken);

export default router;
