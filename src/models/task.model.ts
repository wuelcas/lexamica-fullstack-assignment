import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
  name: { type: String, required: true },
});

TaskSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Task", TaskSchema);
