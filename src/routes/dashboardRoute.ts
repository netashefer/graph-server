import express from 'express';
import { verifyJwt } from '../auth/auth';
import { dashboardPermmisionsService } from "../services/dashboardPermmisionsService";
import { dashbaordService } from "../services/dashboardService";

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
        const dashboards = await dashbaordService.getUserDashboards(username);
        res.status(200).send(dashboards);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:dashboardId', async (req, res) => {
    try {
        const { dashboardId } = req.params;
        await dashbaordService.deleteDashboard(dashboardId);
        await dashboardPermmisionsService.deleteDashboardPermissions(dashboardId);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/countOfUsers/:dashboardId', async (req, res) => {
    try {
        const { dashboardId } = req.params;
        const count = await dashboardPermmisionsService.getCountOfUsers(dashboardId);
        res.status(200).send(count);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/dashboard/:dashboardId', async (req, res) => {
    try {
        const { dashboardId } = req.params;
        const dashboard = await dashbaordService.getDashboard(dashboardId);
        res.status(200).send(dashboard);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/watchedPermission', async (req, res) => {
    try {
        const dashboardPermissions = req.body.dashboardPermissions;
        await dashboardPermmisionsService.addWatchedDashboard(dashboardPermissions.dashboardId, dashboardPermissions.username);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;  