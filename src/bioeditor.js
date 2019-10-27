import React from "react";
import axios from "./axios";

export default class Bio extends React.Component {
    constructor() {
        super();
        this.state = {
            bio: "",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.save = this.save.bind(this);
    }

    toggleModal() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    save() {
        axios
            .post("/bio", {
                bio: this.state.bio
            })
            .then(res => {
                this.props.setBio(res.data.bio);
                this.toggleModal();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h3>{this.props.bio}</h3>
                <button onClick={this.toggleModal}>Edit</button>
                {this.state.uploaderIsVisible && (
                    <div>
                        <textarea
                            rows="10"
                            cols="50"
                            placeholder="Add Bio..."
                            onChange={e => {
                                this.setState({ bio: e.target.value });
                            }}
                        />
                        <button onClick={this.save}>SAVE</button>
                    </div>
                )}
            </div>
        );
    }
}
