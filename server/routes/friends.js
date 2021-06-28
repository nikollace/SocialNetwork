
import express from 'express';

import { getUsers, follow, getFollowers } from '../controllers/friends.js';

const router = express.Router();

router.get('/', getUsers);
router.patch('/:id', follow);
router.get('/:id', getFollowers);

export default router;