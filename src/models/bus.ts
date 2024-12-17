import mongoose, { Document, Schema } from "mongoose";

// הממשק מגדיר את המבנה של האוטובוס
export interface IBus extends Document {
  licensePlate: string;
  busModel: string;
  capacity: number;
  status: "service" | "out of service" | "maintenance";
  driverID: string;
  routeID: string;
}
const busSchema: Schema = new Schema(
  {
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    busModel: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    status: {
      type: String,
      enum: ["service", "out of service", "maintenance"],
      required: true,
    },
    driverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Line",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IBus>("Bus", busSchema);
