import { dashbaordService } from "../services/dashboardService";
import express from 'express';
import { dashboardPermmisionsService } from "../services/dashboardPermmisionsService";

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


router.post('/addPermissions', async (req, res) => {
    try {
        const dashboardPermissions = req.body.dashboardPermissions;
        await dashboardPermmisionsService.addDashboardPermission(dashboardPermissions);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const dashboards = await dashbaordService.getUserDashboard(username);
        res.status(200).send(dashboards);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;  