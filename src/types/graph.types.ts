export type GraphType = string; // for now

export type Graph = {
    graphId: string;
    title: string;
    type: GraphType;
    dataSourceId: string;
};

export type GraphInDB = {
    graphId: string;
    graphName: string;
    graphConfig: any;
    graphTemplate: any;
    dataSourceId: string;
};
