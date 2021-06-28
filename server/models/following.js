import mongoose from 'mongoose';

const followingSchema = mongoose.Schema({
    user: { type: String, required: true },
    following: { type: [String] },
});

const Following = mongoose.model('Following', followingSchema);

export default Following;