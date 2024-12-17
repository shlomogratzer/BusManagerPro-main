import mongoose, { Document, Schema } from "mongoose";

export interface IMassage {
  userSended: string;
  content: string;
  timeStamps: string;
}

export interface IRoom extends Document {
  room: string;
  massages: IMassage[];
}
export const massageSchema: Schema<IMassage> = new Schema({
  userSended: {
    type: String,
  },
  content: {
    type: String,
  },
  timeStamps: {
    type: String,
  },
});
const roomSchema: Schema<IRoom> = new Schema(
  {
    room: {
      type: String,
      required: true,
      unique: true,
    },
    massages: {
      type: [massageSchema],
    },
  },
  {
    timestamps: true,
  }
);
roomSchema.index({ room: 1 });
export default mongoose.model<IRoom>("Room", roomSchema);
