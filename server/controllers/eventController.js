import Event from '../models/eventModel.js';
import User from '../models/userModel.js';

const getEvent = async (req, res) => {
	const id = req.params.id;
	try {
		const events = await Event.find({ eventOwner: id });
		res.json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createEvent = async (req, res) => {
	const { title, start, end, description, teamId } = req.body;
	try {
		const newEvent = new Event({
			eventOwner: teamId,
			title,
			start,
			end,
			description,
		});
		await newEvent.save();
		const events = await Event.find({ eventOwner: teamId });
		res.json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateEvent = async (req, res) => {
	try {
		const id = req.params.id;
		const { title, start, end, description, teamId } = req.body;
		await Event.findByIdAndUpdate(
			{ _id: id },
			{
				eventOwner: teamId,
				title,
				start,
				end,
				description,
			}
		);
		const events = await Event.find({ eventOwner: teamId });
		res.json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteEvent = async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.id);
		const user = await User.findById(req.user.id);
		const events = await Event.find({ eventOwner: user.teamId });
		res.json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { getEvent, createEvent, updateEvent, deleteEvent };
