import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
	'Invite',
	mongoose.Schema(
		{
			inviteeId: {
				type: String,
				required: true,
			},
			teamId: {
				type: Schema.Types.ObjectId,
				ref: 'Team',
				required: true,
			},
			teamName: {
				type: String,
				required: true,
			},
			teamPicture: {
				type: String,
				required: true,
			},
			inviterName: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
		},
		{ timestamps: true }
	)
);
