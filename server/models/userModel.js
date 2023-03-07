import mongoose from 'mongoose';

export default mongoose.model(
	'User',
	mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		dob: {
			type: String,
			required: true,
		},
		nationality: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},
		discoverable: {
			type: Boolean,
			required: true,
		},
	})
);
