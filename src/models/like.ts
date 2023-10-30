import { model, Schema, Document } from "mongoose";
import "dotenv/config";

export interface ILike extends Document {
  idUser : string;
  idTweet : string;
  createdAt: Date;
}

const likeSchema: Schema<ILike> = new Schema<ILike>({
  idUser: {
    type: String,
    required: true,
    ref: "User",
  },
  idTweet: {
    type: String,
    required: true,
    ref: "Tweet",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const LikeModel = model<ILike>("Like", likeSchema);

export default LikeModel;
