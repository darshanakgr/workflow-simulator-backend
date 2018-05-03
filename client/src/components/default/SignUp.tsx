import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dispatch, connect } from "react-redux";
import { signUp } from "../../services/user";
import { withRouter } from "react-router";

interface SignUpProps {
    dispatch: Dispatch<{}>;
}

class SignUp extends React.Component<SignUpProps> {
    handleSignUpI () {
        const email: string = (ReactDOM.findDOMNode(this.refs.email) as HTMLInputElement).value;
        const password: string = (ReactDOM.findDOMNode(this.refs.password) as HTMLInputElement).value;
        this.props.dispatch(signUp(email, password));
    }
    handleSignUp (e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const loginForm = ReactDOM.findDOMNode(this.refs.loginForm) as HTMLFormElement;
        if (loginForm.checkValidity()) {
            const email: string = (ReactDOM.findDOMNode(this.refs.email) as HTMLInputElement).value;
            const password: string = (ReactDOM.findDOMNode(this.refs.password) as HTMLInputElement).value;
            this.props.dispatch(signUp(email, password));
        }
    }

    render() {
        return (
            <div>
                <div className="main login-container">
                    <div className="login">
                        <h2 style={{color: "#ecf0f1"}}>Sign Up</h2>
                        <form ref="loginForm" onSubmit={this.handleSignUp.bind(this)}>
                            <div className="form-group">
                                {/* <label htmlFor="groupId">Email</label> */}
                                <input ref="email" type="email" className="login-input" placeholder="someones@example.com" required/>
                            </div>
                            <div className="form-group">
                                {/* <label htmlFor="name">Password</label> */}
                                <input ref="password" type="password" className="login-input" placeholder="password" required/>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Sign Up" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {};
};

export default withRouter(connect(mapStateToProps)(SignUp));
