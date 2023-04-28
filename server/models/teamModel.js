import mongoose from 'mongoose';

export default mongoose.model(
	'Team',
	mongoose.Schema({
		name: {
			type: String,
			required: true,
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
