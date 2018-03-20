import * as React from "react";
import { AlertState } from "../../models/message";
import { connect } from "react-redux";

interface AlertProps {
    alert: AlertState;
}

const ShowSuccess = (props) => (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
        {props.alert.message.message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

const ShowDanger = (props) => (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {props.alert.message.message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

const Message = (props) => {
    if (props.alert.message) {
        if (props.alert.message.error) {
            return <ShowDanger alert={props.alert} />;
        }
        return <ShowSuccess alert={props.alert} />;
    }
    return <div />;
};

class Alert extends React.Component<AlertProps> {
    render() {
        return (
            <Message alert={this.props.alert} />
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        alert: state.alert
    };
};

export default connect(mapStateToProps)(Alert);