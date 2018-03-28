import * as React from "react";
import { Dispatch, connect } from "react-redux";
import { signOut } from "../../services/user";
import { browserHistory } from "react-router";

interface SignOutProps {
    dispatch: Dispatch<{}>;
}

class SignOut extends React.Component<SignOutProps> {

    constructor(props, context) {
        super(props, context);
        this.props.dispatch(signOut()).then(() => {
            browserHistory.push("/");
        });
    }

    render() {
        return (<div />);
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

export default connect(mapStateToProps)(SignOut);