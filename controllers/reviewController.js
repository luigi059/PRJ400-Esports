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

export default { createReview };
