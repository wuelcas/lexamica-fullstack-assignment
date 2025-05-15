import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  position: { type: Number, required: true },
});

CategorySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Category", CategorySchema);
