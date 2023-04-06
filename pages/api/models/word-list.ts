import mongoose, { Document, Model, Schema } from "mongoose";

export interface IWord extends Document {
  owner: string;
  word: string;
  meaning: string;
  phrase: string;
  choices?: string[];
}

const wordSchema = new Schema(
  {
    owner: { type: String, required: true },
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    phrase: { type: String, required: true },
    choices: {type: [String], required: false}
  },
  { versionKey: false }
);

const Word: Model<IWord> =
  mongoose.models.Word || mongoose.model<IWord>("Word", wordSchema);

export default Word;
