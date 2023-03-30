import Event from '../models/eventModel.js';

const getEvent = async (req, res) => {
	const id = req.params.id;
	try {
		const events = await Review.find({ eventOwner: id });
		res.json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createEvent = async (req, res) => {
	console.log('Welcome to CreateEvent');
	const { owner, title, start, end, description } = req.body;
	try {
		const newEvent = new Event({
			eventOwner: owner,
			title,
			start,
			end,
			description,
		});
		await newEvent.save();
		res.json({ msg: 'Event Successfuly Created!' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateEvent = async (req, res) => {
	const id = req.params.id;
	const { title, start, end, description } = req.body;
	await Event.findByIdAndUpdate(
		{ _id: id },
		{
			title,
			start,
			end,
			description,
		}
	);
	try {
		res.json({ msg: 'Event Successfuly Updated!' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteEvent = async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.id);
		res.json({ msg: 'Event Successfuly Deleted!' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { getEvent, createEvent, updateEvent, deleteEvent };
