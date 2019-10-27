import React from "react";
import { ProfilePic } from "./profile-pic";
import Bio from "./bioeditor";

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="profile">
                <h2>
                    {this.props.firstName} {this.props.lastName}
                </h2>
                <ProfilePic
                    firstName={this.props.firstName}
                    imageUrl={this.props.imageUrl}
                />
                <Bio />
            </div>
        );
    }
}
