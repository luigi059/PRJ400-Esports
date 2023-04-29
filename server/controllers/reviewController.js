import Review from '../models/reviewModel.js';

const createReview = async (req, res) => {
	try {
		const {
			reviewee,
			reviewer,
			content,
			leadership,
			drafting,
			knowledge,
			versatility,
			technical,
			farming,
		} = req.body;
		const newReview = new Review({
			reviewerId: req.user.id,
			reviewee,
			reviewer,
			content,
			leadership,
			drafting,
			knowledge,
			versatility,
			technical,
			farming,
		});
		await newReview.save();

		res.json({ newReview });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getReviews = async (req, res) => {
	try {
		const { revieweeId } = req.params;
		const reviews = await Review.find({ reviewee: revieweeId });
		if (!reviews) return res.status(400).json({ msg: 'No Reviews Exist' });

		res.json(reviews);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getOwnReviews = async (req, res) => {
	try {
		const ownReviews = await Review.find({ reviewerId: req.user.id });
		if (!ownReviews) return res.status(400).json({ msg: 'No Reviews Exist' });

		res.json(ownReviews);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteReview = async (req, res) => {
	const { revieweeId } = req.params;

	try {
		const review = await Review.deleteOne({
			reviewer: req.user.id,
			reviewee: revieweeId,
		});
		if (!review) return res.status(400).json({ msg: 'No Reviews Exist' });

		res.json('Successfully Deleted');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { createReview, getReviews, getOwnReviews, deleteReview };
