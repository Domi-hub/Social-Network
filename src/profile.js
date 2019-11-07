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
                <div className="profile-first">
                    <h1>
                        {this.props.firstName} {this.props.lastName}
                    </h1>
                    <ProfilePic
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        className="profilePic"
                        imageUrl={this.props.imageUrl}
                    />
                </div>
                <div className="bio-bio">
                    <Bio bio={this.props.bio} setBio={this.props.setBio} />
                </div>
            </div>
        );
    }
}
