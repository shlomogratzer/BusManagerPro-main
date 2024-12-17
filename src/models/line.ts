import mongoose, { Document, Schema } from "mongoose";

// הממשק מגדיר את המבנה של הקו
export interface ILine extends Document {
  lineNumber: string;
  name: string;
  stations: string[];
  schedule: { departureTime: string; arrivalTime: string; station: string }[];
}

const routeSchema: Schema = new Schema(
  {
    lineNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    stations: {
      type: [String],
      required: true,
    },
    schedule: {
      type: [
        {
          departureTime: { type: String, required: true },
          arrivalTime: { type: String, required: true },
          station: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILine>("Line", routeSchema);
