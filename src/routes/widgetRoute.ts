import express from 'express';
import { widgetService } from '../services/widgetService';

const router = express.Router();

router.get('/dashboard/:dashboardId', async (req, res) => {
    try {
        const { dashboardId } = req.params;
        const widgets = await widgetService.getDashboardWidgts(dashboardId);

        res.status(200).send(widgets);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/add', async (req, res) => {
    try {
        const widget = req.body.widget;
        const id = await widgetService.createNewWidget(widget);
        res.send(id);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:widgetId', async (req, res) => {
    try {
        const { widgetId } = req.params;
        await widgetService.deleteWidget(widgetId);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/updateLayout', async (req, res) => {
    try {
        const { widgets } = req.body;
        await widgetService.updateWidgetsLayout(widgets);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;  