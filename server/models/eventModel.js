import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
	'Event',
	mongoose.Schema({
		eventOwner: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		start: {
			type: Date,
			required: true,
			min: new Date(),
		},
		end: {
			type: Date,
			required: true,
			//setting a min function to accept any date one hour ahead of startDate
			min: [
				function () {
					const date = new Date(this.start);
					const validDate = new Date(date.setHours(date.getHours() + 1));
					return validDate;
				},
				'Event End must be at least one hour a head of event starting time',
			],
			default: function () {
				const date = new Date(this.start);
				return date.setDate(date.getDate() + 1);
			},
		},
		description: { type: String },
	})
);
