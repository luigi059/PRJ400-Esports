import mongoose, { Schema } from 'mongoose';

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
		teamId: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
			required: null,
			default: null,
		},
		picturePath: {
			type: String,
			required: false,
			default: null,
		},
		pictureId: {
			type: String,
			required: false,
			default: null,
		},
	})
);
