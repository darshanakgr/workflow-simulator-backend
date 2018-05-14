import * as React from "react";
import { findDOMNode } from "react-dom";
import { Dispatch, connect } from "react-redux";
import { showMessage } from "../../actions/alert";

interface SettingsProps {
    dispatch: Dispatch<{}>;
}

class Settings extends React.Component<SettingsProps> {

    handleChangePassword(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const form = findDOMNode(this.refs.changePasswordForm) as HTMLFormElement;
        if (form.checkValidity) {
            // const currentPassword = (findDOMNode(this.refs.currentPasswordText) as HTMLInputElement).value;
            const newPassword = (findDOMNode(this.refs.newPasswordText) as HTMLInputElement).value;
            const confirmPassword = (findDOMNode(this.refs.confirmPasswordText) as HTMLInputElement).value;
            if (newPassword == confirmPassword) {
                alert("password matched");
            } else {
                this.props.dispatch(showMessage(true, "New Password and Confirm Password should be matched"));
            }
        }
    }

    render () {
        return (
            <div>
                <div className="row">
                    <div className="card col-md-10 col-sm-10">
                        <div className="card-body">
                            <h5 className="card-title">Change Your Password</h5>
                            <form ref="changePasswordForm" onSubmit={this.handleChangePassword.bind(this)}>
                                <div className="form-group col-md-5">
                                    <label>Current Password</label>
                                    <input type="password" ref="currentPasswordText" className="form-control" placeholder="********" required />
                                </div>
                                <div className="form-group col-md-5">
                                    <label>New Password</label>
                                    <input type="password" ref="newPasswordText" className="form-control" placeholder="********" required />
                                </div>
                                <div className="form-group col-md-5">
                                    <label>Confirm Password</label>
                                    <input type="password" ref="confirmPasswordText" className="form-control" placeholder="********" required />
                                </div>
                                <div className="col-md-5">
                                    <input type="submit" className="btn btn-primary" value="Change"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

export default connect(mapStateToProps)(Settings);