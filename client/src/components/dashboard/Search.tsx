import * as React from "react";
import { Dispatch, connect } from "react-redux";
import { TaskGroup } from "../../models/task-group";
import { findTaskGroup } from "../../services/task-group";
import { getSharedTaskGroups } from "../../services/permission";
import { PermissionState } from "../../models/permission";
import { sendNotification } from "../../services/notification";

interface SearchProps {
    dispatch: Dispatch<{}>;
    groups: TaskGroup[];
    permission: PermissionState;
}

class Search extends React.Component<SearchProps> {

    constructor(props, context) {
        super(props, context);
        this.props.dispatch(getSharedTaskGroups());
    }

    handleSearch() {
        const searchText = (this.refs.searchText as HTMLInputElement).value;
        this.props.dispatch(findTaskGroup(searchText));
    }

    handleRequestPermission(e) {
        const index = this.props.groups.findIndex((group) => group.groupId == e.target.id);
        if (index != -1) {
            const tg = this.props.groups[index];
            this.props.dispatch(sendNotification({
                to: tg.createdBy,
                groupId: tg.groupId
            }));
        }
    }

    render () {
        const results = this.props.groups.map((group) => (
            <div className="col-md-6" key={group.groupId}>
                <div className="card">
                    <div className="card-header">
                        {group.groupId}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{group.name}</h5>
                        <p style={{textAlign: "left"}}>{group.description}</p>
                        <p style={{textAlign: "left"}}>No of Child Tasks: {group.childTasks.length}</p>
                        {this.props.permission.groups.indexOf(group.groupId) == -1 ? (
                            <button className="btn btn-primary" id={group.groupId} onClick={this.handleRequestPermission.bind(this)}>Request Permission</button>
                        ) : (
                            <a href={"/dashboard/taskgroup/" + group.groupId} className="btn btn-primary">View</a>
                        )}
                    </div>
                </div>
            </div>
        ));

        return (
            <div>
                <div className="row">
                    <div className="card col-md-10 col-sm-10">
                        <div className="card-body">
                            <div className="form-row">
                                <div className="col-md-10">
                                    <input ref="searchText" type="text" className="form-control" placeholder="Enter group-id or name" />
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSearch.bind(this)}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="card col-md-10 col-sm-10">
                        <div className="card-body">
                            <h5 className="card-title">Search Results</h5>
                            {results}
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
        permission: state.permission
    };
};

export default connect(mapStateToProps)(Search);