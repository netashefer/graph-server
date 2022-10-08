import { dashbaordService } from "../services/dashboardService";
import express from 'express';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const dashboardName = req.body.dashboard.dashboardName;
        const id = await dashbaordService.createNewDashbord(dashboardName);
        res.send(id);
    } catch (error) {
        res.status(400).send(error);
    }
});

// router.get('/self', auth, (req, res) => {
//     const { username, classification } = req.user;
//     res.send({ username, classification });
// });
export default router;  