import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Review",
  mongoose.Schema({
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    leadership: {
      type: Number,
      required: true,
    },
    drafting: {
      type: Number,
      required: true,
    },
    knowledge: {
      type: Number,
      required: true,
    },
    versatility: {
      type: Number,
      required: true,
    },
    technical: {
      type: Number,
      required: true,
    },
    farming: {
      type: Number,
      required: true,
    },
  })
);
