import express from 'express';
import teamController from '../controllers/teamController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.patch('/leave/:id', teamController.leaveTeam);
router.get('/:id', auth, teamController.getTeamMembers);

export default router;
