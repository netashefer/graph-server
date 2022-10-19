export interface Widget {
    widgetId: string;
    dashboardId: string;
    graphId: string;
    widgetProps: any;
}

export type WidgetWithoutId = Omit<Widget, "widgetId">;
