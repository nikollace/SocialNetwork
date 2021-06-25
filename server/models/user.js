import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean },
    following: { type: [String] },
    id: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;