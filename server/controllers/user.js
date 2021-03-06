import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Following from '../models/following.js';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exists!" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials. " });

        //Ako smo pronasli user-a izvlacimo token za njega i vracamo ga na front
        //Stavljamo test kao secret, inace bi trebalo to da se izvuce u .env fajl
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. " });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, googleId, token } = req.body;

    const existingUser = await User.findOne({ email });

    try {
        if (googleId !== '') {
            if (existingUser) return res.status(200).json({ result: existingUser, token });

            // salt drugi parametar odnosno dificulty, obicno se stavlja 12
            const hashedPassword = await bcrypt.hash(googleId, 12);

            const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, admin: false, following: [] });

            const existingFollow = await Following.findOne({ user: googleId });

            if (!existingFollow)
                await Following.create({ user: result._id, following: [] });

            res.status(200).json({ result, token });
        }
        else {
            if (existingUser) return res.status(400).json({ message: "User already exists!" });

            if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

            // salt drugi parametar odnosno dificulty, obicno se stavlja 12
            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, admin: false, following: [] });

            const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

            const existingFollow = await Following.findOne({ user: result._id });

            if (!existingFollow)
                await Following.create({ user: result._id, following: [] });

            res.status(200).json({ result, token });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. " });
    }
}