import express from 'express';
import { userService } from '../../services/userService';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body;
        await userService.createNewUser(username, password);
        res.send(204);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;  