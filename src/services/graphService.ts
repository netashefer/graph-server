
import { DATABASE_NAME, Tables } from '../db/db.constants';
import { executeQuery } from '../db/queryExecuter';
import { Graph, GraphInDB } from '../types/graph.types';

class GraphService {
    tableName = Tables.graphs;

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
            dataSourceId: row.dataSourceId
        }));
    }
}

export const graphService = new GraphService();