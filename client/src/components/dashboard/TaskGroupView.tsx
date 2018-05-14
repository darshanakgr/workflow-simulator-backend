import * as React from "react";
import { TaskGroup } from "../../models/task-group";
import { connect, Dispatch } from "react-redux";
import { findTaskGroup, deleteTaskGroup, editTaskGroup } from "../../services/task-group";
import { findDOMNode } from "react-dom";
import { withRouter } from "react-router";
import { createTask, findTasks, deleteTask } from "../../services/task";
import { Task } from "../../models/task";
import TaskGraph from "./TaskGraph";
import { getPermission, shareTaskGroup } from "../../services/permission";
import { PermissionState } from "../../models/permission";

interface TaskGroupViewProps {
    groups: TaskGroup[];
    tasks: Task[];
    dispatch: Dispatch<{}>;
    permission: PermissionState;
}

interface TaskGroupState {
    groupId: string;
    name: string;
    description: string;
    createdOn?: Date;
}

class TaskGroupView extends React.Component<TaskGroupViewProps, TaskGroupState> {
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

    handleSave(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const form = findDOMNode(this.refs.newTaskForm) as HTMLFormElement;
        if (form.checkValidity()) {
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
    }

    handleEdit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const form = findDOMNode(this.refs.editTaskGroupForm) as HTMLFormElement;
        if (form.checkValidity()) {
            this.props.dispatch(editTaskGroup(this.state)).then((taskGroup) => {
                if (taskGroup) {
                    this.setState({
                        groupId: taskGroup.groupId,
                        name: taskGroup.name,
                        description: taskGroup.description,
                        createdOn: taskGroup.createdOn
                    });
                }
                (findDOMNode(this.refs.editCloseBtn) as HTMLButtonElement).click();
            });
        }
    }

    handleTaskDelete(e) {
        this.props.dispatch(deleteTask(this.groupId, e.target.id));
    }

    handleShare(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const form = findDOMNode(this.refs.shareTaskGroupForm) as HTMLFormElement;
        if (form.checkValidity()) {
            const email: string = (findDOMNode(this.refs.email) as HTMLInputElement).value;
            this.props.dispatch(shareTaskGroup(email, this.groupId));
            (findDOMNode(this.refs.closeShareBtn) as HTMLButtonElement).click();
        }
    }

    handleDelete() {
        this.props.dispatch(deleteTaskGroup(this.groupId));
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
                            <button type="button" className="list-group-item list-group-item-action list-group-item-danger text-center" onClick={this.handleDelete.bind(this)} >Delete Task Group</button>
                            <button type="button" className="list-group-item list-group-item-action list-group-item-success text-center" data-toggle="modal" data-target="#edit-task-group">Edit Task Group</button>
                            <button type="button" className="list-group-item list-group-item-action list-group-item-warning text-center" data-toggle="modal" data-target="#share-task-group">Share</button>
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
                                <form ref="newTaskForm" onSubmit={this.handleSave.bind(this)}>
                                    <div className="form-group">
                                        <input ref="groupId"type="text" className="form-control" value={this.groupId} disabled />
                                    </div>
                                    <div className="form-group">
                                        <input ref="taskId"type="text" className="form-control" placeholder="Task ID" required />
                                    </div>
                                    <div className="form-group">
                                        <input ref="name"type="text" className="form-control" placeholder="Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input ref="description"type="text" className="form-control" placeholder="Description" />
                                    </div>
                                    <div className="form-group">
                                        <input ref="progress" type="number" className="form-control" placeholder="Progress" min="0" max="100" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="parent">Parent</label>
                                        <select ref="parent" className="form-control">
                                            <option value="">None</option>
                                            {parents}
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" ref="closeBtn" data-dismiss="modal">Close</button>
                                        <input type="submit" className="btn btn-primary" value="Save"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* share task model */}
                <div className="modal fade" id="share-task-group" role="dialog" aria-labelledby="share-task-group-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="share-task-group-label">Share Task Group</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form ref="shareTaskGroupForm" onSubmit={this.handleShare.bind(this)}>
                                    <div className="form-group">
                                        <label htmlFor="email">Enter the email address of the user</label>
                                        <input ref="email"type="text" className="form-control" placeholder="someone@example.com" required />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" ref="closeShareBtn" data-dismiss="modal">Close</button>
                                        <input type="submit" className="btn btn-primary" value="Share" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* edit task group model */}
                <div className="modal fade" id="edit-task-group" role="dialog" aria-labelledby="edit-task-group-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="edit-task-group-label">Edit Task Group</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form ref="editTaskGroupForm" onSubmit={this.handleEdit.bind(this)}>
                                    <div className="form-group">
                                        <label htmlFor="groupId">Task Group ID</label>
                                        <input
                                            ref="editGroupId"
                                            type="text"
                                            className="form-control"
                                            disabled
                                            value={this.state.groupId}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            ref="editName"
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={this.state.name}
                                            onChange={ e => this.setState({
                                                groupId: this.state.groupId,
                                                name: e.target.value,
                                                description: this.state.description,
                                                createdOn: this.state.createdOn
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            ref="editDescription"
                                            type="text"
                                            className="form-control"
                                            placeholder="Description"
                                            value={this.state.description}
                                            onChange={ e => this.setState({
                                                groupId: this.state.groupId,
                                                description: e.target.value,
                                                name: this.state.name,
                                                createdOn: this.state.createdOn
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" ref="editCloseBtn" data-dismiss="modal">Close</button>
                                        <input type="submit" className="btn btn-primary" value="Save Changes"/>
                                    </div>
                                </form>
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

export default withRouter(connect(mapStateToProps)(TaskGroupView));