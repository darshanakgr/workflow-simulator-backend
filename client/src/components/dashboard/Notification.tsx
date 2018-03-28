import * as React from "react";
import { Dispatch, connect } from "react-redux";
import { NotificationState } from "../../models/notification";
import { getNotifications, replyNotification } from "../../services/notification";

interface SearchProps {
    dispatch: Dispatch<{}>;
    notification: NotificationState;
}

class Notification extends React.Component<SearchProps> {

    constructor(props, context) {
        super(props, context);
        this.props.dispatch(getNotifications());
    }

    handleAccept(e) {
        this.props.dispatch(replyNotification(e.target.id, true));
    }

    handleIgnore(e) {
        this.props.dispatch(replyNotification(e.target.id, false));
    }

    render () {
        const results = this.props.notification.notifications.length ? this.props.notification.notifications.map((n) => {
            const user = this.props.notification.users[this.props.notification.users.findIndex(u => u._id == n.userId)];
            return (
                <div className="col-md-10" key={n._id}>
                    <div className="card">
                        <div className="card-header">
                            Notification from {user ? user.email : ""}
                        </div>
                        <div className="card-body">
                            <p style={{textAlign: "left"}}>Please share the Task Group with id {n.groupId} with me.</p>
                            <button className="card-link btn btn-primary btn-sm" id={n._id} onClick={this.handleAccept.bind(this)} >Accept</button>
                            <button className="card-link btn btn-danger btn-sm" id={n._id} onClick={this.handleIgnore.bind(this)}>Ignore</button>
                        </div>
                    </div>
                </div>
            );
        }) : (
            <div>
                <h4 className="text-center mt-5">No New Notifications</h4>
            </div>
        );

        return (
            <div>
                {results}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        notification: state.notification
    };
};

export default connect(mapStateToProps)(Notification);