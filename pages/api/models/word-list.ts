import mongoose, { Document, Model, Schema } from "mongoose";

export interface IWord extends Document {
  word: string;
  meaning: string;
}

const wordSchema = new Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
},{ versionKey: false });

const Word: Model<IWord> = mongoose.models.Word || mongoose.model<IWord>("Word", wordSchema);

export default Word;