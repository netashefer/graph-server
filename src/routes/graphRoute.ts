import express from 'express';
import { graphService } from '../services/graphService';
import { Graph } from '../types/graph.types';

const router = express.Router();

router.get('/dashboard/:dashboardId', async (req, res) => {
    try {
        const { dashboardId } = req.params;
        const graphs = await graphService.getDashboardGraphs(dashboardId);
        res.status(200).send(graphs);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/create', async (req, res) => {
	try {
		const { graphId, title, dataSourceId, graphConfig, template } = req.body;
		const graph: Graph = {
			graphId,
			title, 
			dataSourceId,
			graphConfig,
			template
		};
		const createdGraphId = await graphService.createGraph(graph);
		res.status(200).send(createdGraphId);
	} catch (error) {
		res.status(400).send(error);
	}
}); 


router.put('/edit', async (req, res) => {
	try {
		const { graphId, title, dataSourceId, graphConfig, template } = req.body;
		const graph: Graph = {
			graphId,
			title, 
			dataSourceId,
			graphConfig,
			template
		};
		await graphService.editGraph(graph);
		res.status(200).send();
	} catch (error) {
		res.status(400).send(error);
	}
})

router.delete('/:graphId', async (req, res) => {
    try {
        const { graphId } = req.params;
        await graphService.deleteGraph(graphId);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;  