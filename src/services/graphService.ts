
import { v4 as uuid } from 'uuid';
import { DATABASE_NAME, Tables } from '../db/db.constants';
import { executeQuery } from '../db/queryExecuter';
import { Graph, GraphInDB } from '../types/graph.types';

class GraphService {
    tableName = Tables.graphs;

	async createGraph(graph: Graph) {
		const query = `
		INSERT INTO ${DATABASE_NAME}."${this.tableName}"(
			"graphId", "dataSourceId", "graphConfig", "graphTemplate", "graphName")
			VALUES ('${uuid()}', '${graph.dataSourceId}', '${JSON.stringify(graph.graphConfig)}', '${JSON.stringify(graph.template)}', '${graph.title}') 
			RETURNING "graphId";
		`;
		const row = await executeQuery<GraphInDB>(query);
		
		return row[0].graphId;
	}

	async editGraph(graph: Graph) {
		const query = `UPDATE ${DATABASE_NAME}."${this.tableName}"
		SET "dataSourceId"='${graph.dataSourceId}', "graphConfig"='${JSON.stringify(graph.graphConfig)}', "graphTemplate"='${JSON.stringify(graph.template)}', "graphName"='${graph.title}'
		WHERE "graphId"='${graph.graphId}';
		`;

		await executeQuery<GraphInDB>(query);
	}

    async deleteGraph(graphId: string) {
        const query = `
        DELETE FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "graphId" = '${graphId}'
        ;`;
        await executeQuery(query);
    }

    async getDashboardGraphs(dashboardId: string) {
        const query = `
        SELECT * FROM ${DATABASE_NAME}."${Tables.dataSources}" d
        INNER JOIN ${DATABASE_NAME}."${this.tableName}" g
        ON d."dataSourceId" = g."dataSourceId"
        WHERE d."dashboardId" = '${dashboardId}'
        ;`;
        const rows = await executeQuery<GraphInDB>(query);
        return rows.map(row => ({
            graphId: row.graphId,
            title: row.graphName,
            template: row.graphTemplate,
            dataSourceId: row.dataSourceId,
            graphConfig: row.graphConfig
        }));
    }
}

export const graphService = new GraphService();