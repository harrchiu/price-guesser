import mongoose from "mongoose";

const Product = mongoose.Schema({
  seller: { type: String, required: true },
  title: String,
  description: String,
  imageSrc: String,
  price: Number,
});

export default mongoose.model("Products", Product);
