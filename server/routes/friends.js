
import express from 'express';

import { getUsers, follow } from '../controllers/friends.js';

const router = express.Router();

router.get('/', getUsers);
router.patch('/:id', follow);

export default router;