import User from '../models/user.js';
import Following from '../models/following.js';

export const getUsers = async (req, res) => {

    const users = await User.find();

    res.status(200).json(users);
}

export const follow = async (req, res) => {
    const { id } = req.params;
    const { nas_id } = req.body;

    var follow = await Following.findOne({ user: nas_id });

    if (follow.following.includes(id)) {
        follow.following = follow.following.filter((u) => u !== id);
    } else {
        follow.following.push(id);
    }

    const updatedFollowing = await Following.findOneAndUpdate({ user: nas_id }, follow, { new: true });

    res.status(200).json(updatedFollowing);
}

export const getFollowers = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await Following.findOne({ user: id });

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}