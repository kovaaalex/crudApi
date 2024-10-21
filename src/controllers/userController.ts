// userController.ts
import { Router, Request, Response } from "express";
import { getUsers, getUserById, createUser, deleteUser, updateUser } from "../services/userService";
import { validate as vv, v4 as uv4 } from 'uuid';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const users = getUsers();
    res.status(200).json(users);
});
router.delete('/:userId', (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;

    if (!vv(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const userDeleted = deleteUser(userId);
    if (!userDeleted) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.sendStatus(204);
});
router.get('/:userId', (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;

    if (!vv(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const user = getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
});

router.post('/', (req: Request, res: Response) => {
    const { username, age, hobbies } = req.body;
    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        return res.status(400).json({ message: 'Invalid request body' });
    }

    const newUser = { id: uv4(), username, age, hobbies };
    createUser(newUser);
    res.status(201).json(newUser);
});

router.put('/:userId', (req:Request, res:Response) => {
    const { userId } = req.params;
    const { username, age, hobbies } = req.body
    if (!vv(userId)) {
        return res.status(400).json({ message: 'Invalid request body' })
    }
    const user = getUserById(userId)
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        return res.status(400).json({ message: 'Invalid request body' });
    }
    const updatedUser =  {...user, username, age, hobbies}
    updateUser(userId, updatedUser)
    return res.status(200).json(updatedUser)
})
export default router;
