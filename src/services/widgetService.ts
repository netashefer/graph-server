import { v4 as uuid } from 'uuid';
import { DATABASE_NAME, Tables } from '../db/db.constants';
import { executeQuery } from '../db/queryExecuter';
import { Widget, WidgetWithoutId } from '../types/widget.types';

class WidgetService {
    tableName = Tables.widgets;

    async createNewWidget(widget: WidgetWithoutId) {
        const id = uuid();
        const query = `
        INSERT INTO ${DATABASE_NAME}."${this.tableName}"
        ("widgetId", "dashboardId", "graphId", "widgetProps")
        VALUES ('${id}', '${widget.dashboardId}', '${widget.graphId}', '${JSON.stringify(widget.widgetProps)}')
        ;`;
        await executeQuery(query);
        return id;
    }

    async getDashboardWidgts(dashboardId: string) {
        const query = `
        SELECT * FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "dashboardId" = '${dashboardId}'
        ;`;
        return await executeQuery<Widget>(query);
    }

    async deleteWidget(widgetId: string) {
        const query = `
        DELETE FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "widgetId" = '${widgetId}'
        ;`;
        await executeQuery(query);
    }

    async updateWidgetsLayout(widgets: Widget[]) {
        let query = '';
        widgets.forEach(w => {
            const widgetSetQuery = `
            UPDATE ${DATABASE_NAME}."${this.tableName}"
            SET "widgetProps" = '${JSON.stringify(w.widgetProps)}'
            WHERE "widgetId" = '${w.widgetId}'
            ;`;
            query = query.concat(widgetSetQuery);
        });

        await executeQuery(query);
    }
}

export const widgetService = new WidgetService();