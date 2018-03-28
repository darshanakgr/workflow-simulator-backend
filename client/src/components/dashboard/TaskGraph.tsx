import * as React from "react";
import Graph from "react-graph-vis";
import { Task } from "../../models/task";

interface TaskGraphProps {
    tasks: Task[];
}

class TaskGraph extends React.Component<TaskGraphProps> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const nodes = this.props.tasks.map((task, index) => {
            return {id: index + 1, label: task.taskId, title: task.name};
        });

        const edges: Array<object> = [];

        this.props.tasks.map((task, index) => {
            return task.successors.map((successor) => {
                return {from: index + 1, to: 1 + nodes.findIndex((node) => {
                    return node.label == successor;
                })};
            });
        }).forEach((edgeSet) => {
            edgeSet.forEach((edge) => {
                edges.push(edge);
            });
        });

        const g = {nodes, edges};

        const options = {
            height: "100%",
            width: "100%",
            layout: {
                hierarchical: {
                    enabled: false,
                    levelSeparation: 150,
                    nodeSpacing: 100,
                    treeSpacing: 200,
                    blockShifting: true,
                    edgeMinimization: true,
                    parentCentralization: true,
                    direction: "RL"
                }
            },
            edges: {
                color: "#000000"
            },
            interaction: {
                tooltipDelay: 100
            }
        };

        return (
            <div style={{height: "500px"}}>
                <Graph graph={g} options={options} />
            </div>
        );
    }
}

export default TaskGraph;