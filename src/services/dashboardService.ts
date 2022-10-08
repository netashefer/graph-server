
import { DATABASE_NAME, Tables } from '../db/db.constants';
import { v4 as uuid } from 'uuid';
import { executeQuery } from '../db/queryExecuter';
import { client } from '../db/db';

class DashboardService {
    tableName = Tables.dashboards;

    async createNewDashbord(dashboardName: string) {
        const id = uuid();
        const query = `
        INSERT INTO ${DATABASE_NAME}."${this.tableName}"
        ("dashboardId", "dashboardName")
        VALUES ('${id}', '${dashboardName}')
        ;`;
        await executeQuery(query);
        return id;
    }

    // async getDashboards(dataSoucreId: string) {
    //     const query = `
    //     SELECT FROM ${DATABASE_NAME}."${this.tableName} "dataTable""
    //     WHERE dataSourceId = ${dataSoucreId}
    //     ;`;
    //     const rows = await executeQuery(client, query);
    //     return JSON.parse(pako.inflate(rows, { to: 'string' }));;
    // }
}

export const dashbaordService = new DashboardService();