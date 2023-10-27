import { model, Schema, Document } from "mongoose";
import "dotenv/config";

export interface ITweet extends Document {
  content: string;
  idUser: string;
  isReply: string | boolean | null;
  attachmentUrl: string;
  createdAt: Date;
  isDeleted: boolean;
  isEdited: boolean;
  mentions: string[];
  hashtags: string[];
  likeIds: string[];
}

const tweetSchema: Schema<ITweet> = new Schema<ITweet>({
  content: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
    ref: "User",
  },
  isReply: {
    type: Schema.Types.Mixed,
    default: null,
  },
  attachmentUrl: {
    type: String,
    default:''
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  mentions: {
    type: [String],
    default: [],
  },
  hashtags: {
    type: [String],
    default: [],
  },
  likeIds:{
    type: [String],
    default:[]
  }
});

const TweetModel = model<ITweet>("Tweet", tweetSchema);

export default TweetModel;
