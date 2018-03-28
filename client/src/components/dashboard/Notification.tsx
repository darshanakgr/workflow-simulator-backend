import * as React from "react";
import { Dispatch, connect } from "react-redux";
import { NotificationState } from "../../models/notification";
import { getNotifications } from "../../services/notification";

interface SearchProps {
    dispatch: Dispatch<{}>;
    notification: NotificationState;
}

class Notification extends React.Component<SearchProps> {

    constructor(props, context) {
        super(props, context);
        this.props.dispatch(getNotifications());
    }

    render () {
        const results = this.props.notification.notifications.map((n) => (
            <div className="col-md-10" key={n.id}>
                <div className="card">
                    <div className="card-header">
                        Notification from {n.userId}
                    </div>
                    <div className="card-body">
                        <p style={{textAlign: "left"}}>{n.groupId}</p>
                    </div>
                </div>
            </div>
        ));

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