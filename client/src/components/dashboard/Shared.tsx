import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { TaskGroupState } from "../../models/task-group";
import { getAllSharedTaskGroups } from "../../services/task-group";
import { browserHistory } from "react-router";

interface SharedProps {
    dispatch: Dispatch<{}>;
    groups: TaskGroupState;
}

class Shared extends React.Component<SharedProps> {

    constructor(props, context) {
        super(props, context);
        this.props.dispatch(getAllSharedTaskGroups());
    }

    handleView(e) {
        browserHistory.push(`/dashboard/shared/${e.target.id}`);
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
                </tr>
            );
        });

        return (
            <div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                        <th scope="col">Group ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created On</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskgroups}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        groups: state.group,
    };
};

export default connect(mapStateToProps)(Shared);