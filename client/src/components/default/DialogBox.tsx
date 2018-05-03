import * as React from "react";
import * as Modal from "react-modal";
import { AlertState } from "../../models/message";
import { connect, Dispatch } from "react-redux";
import { closeMessage } from "../../actions/alert";

const customStyles = {
    content: {
        position: "absolute",
        top: "25%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width: "500px",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#7f8c8d",
        border: "none",
        zIndex: 2
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
    },
};

Modal.setAppElement("#root");

interface DialogBoxProps {
    dialog: AlertState;
    dispatch: Dispatch<{}>;
}

class DialogBox extends React.Component<DialogBoxProps> {

    constructor(props, context) {
        super(props, context);

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.dispatch(closeMessage());
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.dialog.message.show}
                    onRequestClose={this.closeModal}
                    style={customStyles}>

                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <i className="material-icons">info</i>
                        </div>
                        <div className="col-sm-8">
                            <div className="dialog-header">
                                <h5 className="dialog-title">{this.props.dialog.message.error ? "Error" : "Info"}</h5>
                            </div>
                            <div className="dialog-body">
                                <p>{this.props.dialog.message.message}</p>
                            </div>
                            <div className="dialog-footer">
                                <button type="button" className="btn btn-light" onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        dialog: state.alert
    };
};

export default connect(mapStateToProps)(DialogBox);