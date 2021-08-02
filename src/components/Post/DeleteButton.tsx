import React from "react";
import DeletePostModal from "../Modals/DeletePostModal";

class DeleteButton extends React.Component<any, any> {
    state = {
        post : this.props.post,
        id : this.props.id,
    }
    constructor(props :any) {
        super(props);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost(post :any){
        this.setState({ post : post })
        this.forceUpdate()
        this.props.deletePost()
    }

    render() {
        let deleteButton;

        if(this.props.post.author.id === this.props.id){
            deleteButton = <DeletePostModal deletePost={this.deletePost} post={this.props.post}></DeletePostModal>
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