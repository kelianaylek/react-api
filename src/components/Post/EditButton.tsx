import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import EditPostModal from '../Modals/EditPostModal'

class EditButton extends React.Component<any, any> {
    state = {
        post : this.props.post,
        id : this.props.id,
    }

    constructor(props :any) {
        super(props);
        this.editPost = this.editPost.bind(this);
    }

    editPost(post :any){

        this.setState({ post : post })
        this.forceUpdate()
        this.props.editPosts()
    }


    render() {
        let editButton;
        if(this.props.post.author.id === this.props.id){
            editButton = <EditPostModal editPost={this.editPost} post={this.props.post}></EditPostModal>
        }
        return (
            <div>
                {editButton}

            </div>
        );
    }
}

export default EditButton;