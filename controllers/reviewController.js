import Review from "../models/reviewModel.js";

const createReview = async (req, res) => {
  console.log("Welcome to Create Review");
  try {
    const {
      reviewer,
      reviewee,
      content,
      leadership,
      drafting,
      knowledge,
      versatility,
      technical,
      farming,
    } = req.body;
    const newReview = new Review({
      reviewer,
      reviewee,
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
  console.log("Welcome to getReviews");
  try {
    const { revieweeId } = req.params;
    const reviews = await Review.find({ reviewee: revieweeId });
    if (!reviews) return res.status(400).json({ msg: "No Reviews Exist" });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOwnReviews = async (req, res) => {
  console.log("Welcome to get Own Reviews");
  try {
    const ownReviews = await Review.find({ reviewer: req.user.id });
    if (!ownReviews) return res.status(400).json({ msg: "No Reviews Exist" });

    res.json(ownReviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { createReview, getReviews, getOwnReviews };
