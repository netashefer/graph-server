
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
}

export const dashboardPermmisionsService = new DashboardPermissionsService();