export type GraphType = string; // for now

export type Graph = {
    graphId: string;
    title: string;
    template: { type: GraphType; };
    dataSourceId: string;
	graphConfig: any;
}

export type GraphInDB = {
    graphId: string;
    graphName: string;
    graphConfig: any;
    graphTemplate: any;
    dataSourceId: string;
};