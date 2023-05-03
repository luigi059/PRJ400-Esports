import express from 'express';
import inviteController from '../controllers/inviteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, inviteController.sendInvite);
router.get('/', auth, inviteController.getInvites);
router.patch('/accept/:id', inviteController.acceptInvite);
router.delete('/reject/:id', auth, inviteController.rejectInvite);

export default router;
