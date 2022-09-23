import { Router } from "express";
import {getUsers} from '../controllers/usersContr.js';
import {addUser} from '../controllers/usersContr.js';
import {addCards} from '../controllers/usersContr.js'

const router = Router();

router.get('/api/users', getUsers);
router.get('/api/cards', addCards);
router.post('/api/server', addUser);


export default router