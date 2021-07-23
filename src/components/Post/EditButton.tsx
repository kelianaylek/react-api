import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import EditPostModal from '../Modals/EditPostModal'

class EditButton extends React.Component<any, any> {
    state = {
        post : this.props.post,
        id : this.props.id,
    }


    render() {
        let editButton;
        if(this.state.post.author.id === this.state.id){
            editButton = <EditPostModal post={this.state.post}></EditPostModal>
        }
        return (
            <div>
                {editButton}

            </div>
        );
    }
}

export default EditButton;