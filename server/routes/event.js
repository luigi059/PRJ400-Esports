import express from 'express';
import eventController from '../controllers/eventController';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, eventController.createEvent);
router.get('/get_events/:id', auth, eventController.getEvent);
router.put('/update/:id', auth, eventController.updateEvent);
router.delete('/delete/:id', auth, eventController.deleteEvent);

export default router;
