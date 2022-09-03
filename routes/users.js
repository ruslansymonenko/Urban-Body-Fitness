import { Router } from "express";
import {getUsers} from '../controllers/usersContr.js'

const router = Router();

router.get('/api/users', getUsers)

export default router