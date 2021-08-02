import React from 'react';
import EditCommentModal from "../Modals/EditCommentModal";
import DeleteCommentModal from "../Modals/DeleteComment";

class getComments extends React.Component<any, any> {
    state = {
        post : this.props.post
    }
    constructor(props :any) {
        super(props);
        this.refreshPost = this.refreshPost.bind(this)
    }
    componentDidUpdate= async () => {
        this.state.post = this.props.post;
    }
    componentDidMount= async () => {
        this.state.post = this.props.post;

    }

    refreshPost(postId :any){
        this.props.refreshPost(postId)
    }

    render() {

        return (
            <div>
                <h2>Comments :</h2>

                {this.props.post?.comments?.map((comment:any) => {

                    return(
                        <div key={comment.id}>
                            <div>
                                <p>{comment.id} - {comment.message} - {comment.author.name} - {comment.image}</p>
                            </div>
                            <div>
                                {this.props.id === comment.author.id ?
                                    <div>
                                        <EditCommentModal post={this.props.post} refreshPost={this.props.refreshPost} comment={comment} id={this.props.id}></EditCommentModal>
                                        <DeleteCommentModal post={this.props.post} refreshPost={this.props.refreshPost} comment={comment} id={this.props.id}></DeleteCommentModal>
                                    </div> : ''}
                            </div>
                        </div>
                    )

                })}
            </div>
        );
    }
}

export default getComments;