import express from "express";
import userRoutes from "./users.js";
import reviewRoutes from "./review.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/review", reviewRoutes);

export default router;
