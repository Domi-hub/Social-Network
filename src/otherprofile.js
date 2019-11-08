import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import Bio from "./bioeditor";
import FriendButton from "./friend-button";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        const userId = this.props.match.params.id;
        axios
            .get("/api/user/" + userId)
            .then(({ data, status }) => {
                if (status == 204) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        imageUrl: data.image_url,
                        bio: data.bio
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="other-profile">
                <div className="other-profile-name">
                    <h1>
                        {this.state.firstName} {this.state.lastName}
                    </h1>
                    <ProfilePic
                        firstName={this.state.firstName}
                        imageUrl={this.state.imageUrl}
                        className="profilePic"
                    />
                    <FriendButton userId={this.props.match.params.id} />
                </div>
                <div className="other-profile-bio">
                    <Bio bio={this.state.bio} />
                </div>
            </div>
        );
    }
}
