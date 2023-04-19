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
			picturePath: String,
			pictureId: String,
			likes: {
				type: Map,
				of: Boolean,
			},
			comments: {
				type: Array,
				default: [],
			},
		},
		{ timestamps: true }
	)
);
