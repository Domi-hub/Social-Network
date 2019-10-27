import React from "react";

export default class Bio extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>This is my bio</h3>
                <p>Edit</p>
                <textarea
                    name="textarea"
                    rows="10"
                    cols="50"
                    placeholder="Add BIO..."
                />
                <button>SAVE</button>
            </div>
        );
    }
}
