import { model, Schema, Document } from "mongoose";
import "dotenv/config";

export interface IFollower extends Document {
    idUser: string;
    idFollowing: string;
    createdAt: Date;
}

const followerSchema: Schema<IFollower> = new Schema<IFollower>({
    idUser: {
        type: String,
        required: true,
        ref: "User",
        unique: true, 
    },
    idFollowing: {
        type: String,
        required: true,
        ref: "User",
        unique: true, 
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});


followerSchema.index({ idUser: 1, idFollowing: 1 }, { unique: true });

const FollowerModel = model<IFollower>("Follower", followerSchema);

export default FollowerModel;
