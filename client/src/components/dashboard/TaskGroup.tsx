import * as React from "react";
import { findDOMNode } from "react-dom";
import { connect, Dispatch } from "react-redux";
import { createNewTaskGroup, getAllTaskGroups, deleteTaskGroup } from "../../services/task-group";
import { TaskGroupState } from "../../models/task-group";
import { browserHistory } from "react-router";
import { User } from "../../models/user";
import { withRouter } from "react-router";
// import { currentUser } from "../../services/user";
// import { PermissionState } from "../../models/permission";
// import { getPermission } from "../../services/permission";
// import Auth from "../../services/auth";


interface TaskGroupProps {
    dispatch: Dispatch<{}>;
    groups: TaskGroupState;
    user: User;
}

class TaskGroup extends React.Component<TaskGroupProps> {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.props.dispatch(getAllTaskGroups());
    }

    handleSave() {
        const groupId: string = (findDOMNode(this.refs.groupId) as HTMLInputElement).value;
        const name: string = (findDOMNode(this.refs.name) as HTMLInputElement).value;
        const description: string = (findDOMNode(this.refs.description) as HTMLInputElement).value;
        this.props.dispatch(createNewTaskGroup({groupId, name, description}));
        this.handleClose();
    }

    handleClose() {
        (findDOMNode(this.refs.groupId) as HTMLInputElement).value = "";
        (findDOMNode(this.refs.name) as HTMLInputElement).value = "";
        (findDOMNode(this.refs.description) as HTMLInputElement).value = "";
        (findDOMNode(this.refs.closeBtn) as HTMLButtonElement).click();
    }

    handleView(e) {
        browserHistory.push(`/dashboard/taskgroup/${e.target.id}`);
    }

    handleDelete(e) {
        if (confirm("Are your sure ?")) {
            this.props.dispatch(deleteTaskGroup(e.target.id));
        }
    }

    render () {
        const taskgroups = this.props.groups.groups.map((g) => {
            return (
                <tr key={g.groupId}>
                    <th scope="row">{g.groupId}</th>
                    <td>{g.name}</td>
                    <td>{g.description}</td>
                    <td>{new Date(g.createdOn).toLocaleDateString()}</td>
                    <td><button className="btn btn-sm btn-success" onClick={this.handleView.bind(this)} id={g.groupId}>View</button></td>
                    <td><button className="btn btn-sm btn-danger" onClick={this.handleDelete.bind(this)} id={g.groupId}>Delete</button></td>
                </tr>
            );
        });
        return (
            <div>
                <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#new-task-group">
                    New Task Group
                </button>

                <table className="table mt-5">
                    <thead>
                        <tr>
                        <th scope="col">Group ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created On</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskgroups}
                    </tbody>
                </table>

                <div className="modal fade" id="new-task-group" role="dialog" aria-labelledby="new-task-group-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="new-task-group-label">New Task Group</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="groupId">Task Group ID</label>
                                    <input ref="groupId"type="text" className="form-control" placeholder="Task Group Id" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input ref="name"type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input ref="description"type="text" className="form-control" placeholder="Description" />
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
        groups: state.group,
        user: state.user
    };
};

export default withRouter(connect(mapStateToProps)(TaskGroup));