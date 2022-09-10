import { Router } from "express";
import {getUsers} from '../controllers/usersContr.js'
import {addUser} from '../controllers/usersContr.js'

const router = Router();

router.get('/api/users', getUsers);
router.post('/api/server', addUser);

export default router