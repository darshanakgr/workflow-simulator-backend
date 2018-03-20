import * as React from "react";

class Search extends React.Component {
    private groupId: string;

    constructor(props, context) {
        super(props, context);
        this.groupId = props.params.groupId;
    }

    render () {
        return (
            <div>
                <h2>search</h2>
                <h4>{this.groupId}</h4>
                <div className="card col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">Task Group Details</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;