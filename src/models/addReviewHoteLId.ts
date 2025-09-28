// models/Review.ts
import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
 hotelId: {                // <- reference to hotel
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddHotel",
    required: true
  },
  _id:{type:String,required:true},
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
export const Review = mongoose.model("Review", reviewSchema);