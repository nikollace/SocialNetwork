import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    // posto ce request biti /posts/123 izvlacimo taj id
    const { id: _id } = req.params;
    const post = req.body;
    
    // new: true ce nam vratiti taj post
    // ovde ce biti greska samo ako prosledimo post jer necemo imati id u tom objektu a treba
    // nam na frontu za currId
    // moramo da uradimo { ...post, _id}
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    
    await PostMessage.findByIdAndDelete(_id);

    res.json({message: 'Post deleted successfully'});
};