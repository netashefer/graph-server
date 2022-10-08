
import { v4 as uuid } from 'uuid';
import { DATABASE_NAME, Tables } from '../db/db.constants';
import { executeQuery } from '../db/queryExecuter';
import { Dashboard } from '../types/dashboard.types';

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

    async getUserDashboard(username: string) {
        const query = `
        SELECT d."dashboardId", d."dashboardName" FROM ${DATABASE_NAME}."${Tables.dashboardsPermissions}" p
        INNER JOIN ${DATABASE_NAME}."${this.tableName}" d
        ON d."dashboardId" = p."dashboardId"
        WHERE p."username" = '${username}'
        ;`;
        return await executeQuery<Dashboard>(query);
    }
}

export const dashbaordService = new DashboardService();