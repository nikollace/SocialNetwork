import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    const { page } = req.query;
    //page se sa fronta salje kao int al se u toku slanja konvertuje u string
    //zato moramo da je vratimo nazad u number
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; //dobijamo start index svake stranice

        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        //mora i pod " " ne ' ' !!!!!!!!!!!!!
        const title = new RegExp(searchQuery, "i"); // "i" znaci ignore case (da ne bude case sensitive)
        
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',')}} ]});
        
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

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

    res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    //zahvaljujuci middleware-u imamo ovaj userId
    //Ako ne postoji userId znaci da nije autentifikovan
    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    const post = await PostMessage.findById(id);

    //Ideja sada je da pronadjemo index tog korisnika koji je lajkovao ili nije lajkovao post
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        //like a post
        post.likes.push(req.userId);
    } else {
        //dislike a post
        post.likes = post.likes.filter((id) => id !== req.userId);
    }

    //post koji smo sada prosledili sadrzi lajkove, to nam i treba
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(value);
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}