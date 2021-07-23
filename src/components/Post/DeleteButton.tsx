import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import LikeButton from "./likeButton";
import DeletePostModal from "../Modals/DeletePostModal";

class DeleteButton extends React.Component<any, any> {
    state = {
        post : this.props.post,
        id : this.props.id,
    }

    render() {
        let deleteButton;

        if(this.state.post.author.id === this.state.id){
            deleteButton = <DeletePostModal post={this.state.post}></DeletePostModal>
        }
        return (
            <div>
                {deleteButton}

            </div>
        );
    }
}
{}
export default DeleteButton;