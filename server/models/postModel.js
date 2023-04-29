import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
	'Post',
	mongoose.Schema(
		{
			userId: {
				type: String,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			username: {
				type: String,
				required: true,
			},
			location: String,
			description: String,
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
		},
		{ timestamps: true }
	)
);
