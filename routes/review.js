import express from "express";
import reviewController from "../controllers/reviewController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, reviewController.createReview);
router.get("/get_reviews/:revieweeId", auth, reviewController.getReviews);
router.get("/my_reviews", auth, reviewController.getOwnReviews);

export default router;
