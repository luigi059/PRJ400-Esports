import express from "express";
import reviewController from "../controllers/reviewController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, reviewController.createReview);

export default router;
