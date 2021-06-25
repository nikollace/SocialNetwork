import User from '../models/user.js';

export const getUsers = async (req, res) => {

    const users = await User.find();
        
    res.status(200).json(users);
}

export const follow = async (req, res) => {
    const { id } = req.params;
    const { nas_id } = req.body;

    var user = await User.findById(nas_id);

    if(user.following.includes(id)) {
        user.following = user.following.filter((u) =>  u !== id);
    } else {
        user.following.push(id);
    }

    const updatedUser = await User.findByIdAndUpdate(nas_id, user, { new: true });

    res.status(200).json(updatedUser);
}