import mongoose from "mongoose";
mongoose.set("debug", true);

const Product = mongoose.Schema({
  seller: { type: String, required: true },
  title: String,
  description: String,
  imageSrc: String,
  price: Number,
});

export default mongoose.model("Products", Product);
