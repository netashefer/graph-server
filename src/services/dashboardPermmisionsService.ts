
import { DATABASE_NAME, Tables } from '../db/db.constants';
import { executeQuery } from '../db/queryExecuter';
import { DashboardPermissions } from '../types/dashboard.types';

class DashboardPermissionsService {
    tableName = Tables.dashboardsPermissions;

    async addDashboardPermission(dashboardPermissions: DashboardPermissions) {
        const query = `
        INSERT INTO ${DATABASE_NAME}."${this.tableName}"
        ("dashboardId", "username")
        VALUES ('${dashboardPermissions.dashboardId}', '${dashboardPermissions.username}')
        ;`;
        await executeQuery(query);
    }

    async deleteDashboardPermissions(dashboardId: string) {
        const query = `
        DELETE FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "dashboardId" = '${dashboardId}'
        ;`;
        await executeQuery(query);
    }

    async getCountOfUsers(dashboardId: string) {
        const query = `
        SELECT COUNT(DISTINCT "username") FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "dashboardId" = '${dashboardId}'
        ;`;
        const rows = await executeQuery<{ count: number; }>(query);
        return rows?.length ? rows[0]?.count : 0;
    }

    async addWatchedDashboard(dashboardId: string, username: string) {
        const query = `
        SELECT * FROM ${DATABASE_NAME}."${this.tableName}" 
        WHERE "dashboardId" = '${dashboardId}' AND "username" = '${username}'
        ;`;
        const rows = await executeQuery(query);

        if (!rows || !rows?.length) {
            const query2 = `
            INSERT INTO ${DATABASE_NAME}."${this.tableName}" ("dashboardId", "username")
            VALUES ('${dashboardId}', '${username}')`;

            await executeQuery(query2);
        }
    }
}

export const dashboardPermmisionsService = new DashboardPermissionsService();