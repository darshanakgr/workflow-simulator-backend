import * as React from "react";
import { TaskGroup } from "../../models/task-group";
import { connect, Dispatch } from "react-redux";
import { findTaskGroup } from "../../services/task-group";
import { findDOMNode } from "react-dom";
import { withRouter } from "react-router";
import { createTask, findTasks } from "../../services/task";
import { Task } from "../../models/task";
import TaskGraph from "./TaskGraph";

interface TaskGroupViewProps {
    groups: TaskGroup[];
    tasks: Task[];
    dispatch: Dispatch<{}>;
}

class TaskGroupView extends React.Component<TaskGroupViewProps> {
    private groupId: string;

    constructor(props, context) {
        super(props, context);
        this.groupId = props.params.groupId;
    }

    componentDidMount() {
        this.props.dispatch(findTaskGroup(this.groupId));
        this.props.dispatch(findTasks(this.groupId));
    }

    handleSave() {
        const predecessors: string = (findDOMNode(this.refs.parent) as HTMLInputElement).value;
        this.props.dispatch(createTask({
            groupId: (findDOMNode(this.refs.groupId) as HTMLInputElement).value,
            taskId: (findDOMNode(this.refs.taskId) as HTMLInputElement).value,
            name: (findDOMNode(this.refs.name) as HTMLInputElement).value,
            description: (findDOMNode(this.refs.description) as HTMLInputElement).value,
            progress: parseInt((findDOMNode(this.refs.progress) as HTMLInputElement).value),
            predecessors: predecessors == "" ? [] : [predecessors],
            successors: []
        })).then(() => {
            this.props.dispatch(findTasks(this.groupId));
        });
    }

    render () {
        const groupDetail = this.props.groups.map((group) => (
            <ul className="list-group" key={group.groupId}>
                <li className="list-group-item">{group.groupId}</li>
                <li className="list-group-item">{group.name}</li>
                <li className="list-group-item">{group.description}</li>
                <li className="list-group-item">{new Date(group.createdOn).toDateString()}</li>
            </ul>
        ));

        const parents = this.props.groups.length ? this.props.groups[0].childTasks.map((task) => (<option value={task} key={task}>{task}</option>)) : (<option value="-">-</option>);

        const tasks = this.props.tasks.map((t) => {
            return (
                <tr key={t.taskId}>
                    <th scope="row">{t.taskId}</th>
                    <td>{t.name}</td>
                    <td>{t.description}</td>
                    <td>{t.progress}</td>
                    <td>{t.successors.toString()}</td>
                    <td><button className="btn btn-sm btn-danger">Delete</button></td>
                </tr>
            );
        });
        return (
            <div>
                <div className="row">
                    <div className="card col-md-5">
                        <div className="card-body">
                            <h5 className="card-title">Task Group Details</h5>
                            {groupDetail}
                        </div>
                    </div>

                    <div className="card col-md-5">
                        <div className="card-body">
                            <h5 className="card-title">Actions</h5>
                            <button type="button" className="list-group-item list-group-item-action list-group-item-primary text-center" data-toggle="modal" data-target="#new-task-group">New Task</button>
                            <button type="button" className="list-group-item list-group-item-action list-group-item-danger text-center">Delete Task Group</button>
                            <button type="button" className="list-group-item list-group-item-action list-group-item-success text-center">Edit Task Group</button>
                            <button type="button" className="list-group-item list-group-item-action list-group-item-warning text-center">Share</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card col-md-11">
                        <div className="card-body">
                            <h5 className="card-title">Child Tasks (Chained Tasks)</h5>
                            <table className="table mt-5">
                                <thead>
                                    <tr>
                                    <th scope="col">Task ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Progress</th>
                                    <th scope="col">Successors</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card col-md-11">
                        <div className="card-body">
                            <h5 className="card-title">Child Tasks (Chained Tasks)</h5>
                            <TaskGraph tasks={this.props.tasks} />
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="new-task-group" role="dialog" aria-labelledby="new-task-group-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="new-task-group-label">New Task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input ref="groupId"type="text" className="form-control" value={this.groupId} disabled />
                                </div>
                                <div className="form-group">
                                    <input ref="taskId"type="text" className="form-control" placeholder="Task ID" />
                                </div>
                                <div className="form-group">
                                    <input ref="name"type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input ref="description"type="text" className="form-control" placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <input ref="progress" type="number" className="form-control" placeholder="Progress" min="0" max="100"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="parent">Parent</label>
                                    <select ref="parent" className="form-control">
                                        <option value="">None</option>
                                        {parents}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref="closeBtn" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        groups: state.group.groups,
        tasks: state.task.tasks
    };
};

export default withRouter(connect(mapStateToProps)(TaskGroupView));