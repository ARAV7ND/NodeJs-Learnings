import { Router } from "express";
import { addUser, deleteUser, getById, getUsers, updateUser } from '../controllers/users'
const router = Router();

router.get('/user', getUsers);
router.post('/user', addUser);
router.get('/user/:id', getById);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);

export default router;
