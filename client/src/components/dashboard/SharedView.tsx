import * as React from "react";
import { TaskGroup } from "../../models/task-group";
import { connect, Dispatch } from "react-redux";
import { findTaskGroup } from "../../services/task-group";
import { findDOMNode } from "react-dom";
import { withRouter } from "react-router";
import { createTask, findTasks, deleteTask } from "../../services/task";
import { Task } from "../../models/task";
import TaskGraph from "./TaskGraph";
import { getPermission } from "../../services/permission";
import { PermissionState } from "../../models/permission";

interface SharedViewProps {
    groups: TaskGroup[];
    tasks: Task[];
    dispatch: Dispatch<{}>;
    permission: PermissionState;
}

interface SharedViewState {
    groupId: string;
    name: string;
    description: string;
    createdOn?: Date;
}

class SharedView extends React.Component<SharedViewProps, SharedViewState> {
    private groupId: string;

    constructor(props, context) {
        super(props, context);
        this.groupId = props.params.groupId;
        this.state = {
            groupId: "",
            name: "",
            description: ""
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(findTaskGroup(this.groupId)).then((taskGroup) => {
            if (taskGroup) {
                this.setState({
                    groupId: taskGroup.groupId,
                    name: taskGroup.name,
                    description: taskGroup.description,
                    createdOn: taskGroup.createdOn
                });
            }

            this.props.dispatch(findTasks(this.groupId));
            this.props.dispatch(getPermission(this.groupId));
        });
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
        }));
        this.handleClose();
    }

    handleTaskDelete(e) {
        this.props.dispatch(deleteTask(this.groupId, e.target.id));
    }

    handleClose() {
        (findDOMNode(this.refs.groupId) as HTMLInputElement).value = "";
        (findDOMNode(this.refs.taskId) as HTMLInputElement).value = "";
        (findDOMNode(this.refs.name) as HTMLInputElement).value = "";
        (findDOMNode(this.refs.description) as HTMLInputElement).value = "";
        (findDOMNode(this.refs.progress) as HTMLInputElement).value = "";
        (findDOMNode(this.refs.closeBtn) as HTMLButtonElement).click();
    }

    render () {
        const groupDetail = this.props.groups.map((group) => (
            <ul className="list-group" key={group.groupId}>
                <li className="list-group-item">{this.state.groupId}</li>
                <li className="list-group-item">{this.state.name}</li>
                <li className="list-group-item">{this.state.description}</li>
                <li className="list-group-item">{this.state.createdOn ? new Date(this.state.createdOn).toDateString() : undefined}</li>
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
                    <td><button id={t.taskId} className="btn btn-sm btn-danger" onClick={this.handleTaskDelete.bind(this)}>Delete</button></td>
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
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="card col-md-11">
                        <div className="card-body">
                            <h5 className="card-title">Secret Key</h5>
                            <div className="text-center">
                                <code style={{fontSize: "20px"}}>{this.props.permission.secretKey}</code>
                            </div>
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

                {/* new task model */}
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
        tasks: state.task.tasks,
        permission: state.permission
    };
};

export default withRouter(connect(mapStateToProps)(SharedView));