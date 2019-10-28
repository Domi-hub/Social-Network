import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import Bio from "./bioeditor";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("I am mounting"); //sanity check
        console.log("thi.props.match", this.props.match.params.id); //found an id we want to render

        //make an axios request to the server asking for info about this.props.match.params.
        //if there is no user with that id... redirect them back to /.
        // and the user is trying to visit their own page redirect them back to /.
        if (this.props.match.params.id == 6) {
            //imagine i am logged in as user ž.
            this.props.history.push("/");
        }
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
                <Bio bio={this.props.bio} setBio={this.props.setBio} />
            </div>
        );
    }
}
