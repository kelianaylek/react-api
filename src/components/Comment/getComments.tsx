import React from 'react';
import EditCommentModal from "../Modals/EditCommentModal";
import DeleteCommentModal from "../Modals/DeleteComment";
import {Card} from "react-bootstrap";
import moment from "moment";
import CreatePollModal from "../Modals/CreatePollModal";
import DeletePollModal from "../Modals/DeletePollModal";
import AddEventToPostModal from "../Modals/AddEventToPostModal";
import RemoveEventFromPostModal from "../Modals/RemoveEventFromPostModal";

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
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Comments</Card.Subtitle>
                    <div className="">
                        {this.props.post?.comments?.map((comment:any) => {
                            return(
                                <div key={comment.id} className="d-flex justify-content-between align-items-baseline" style={{ maxHeight: '20rem' }}>
                                    <div className="text-center w-50 justify-content-start">
                                        <p className="mb-0" style={{ textAlign: 'left' }}>{comment.author.name} :</p>
                                        <p style={{ textAlign: 'left' }}>{comment.message}</p>
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
                </Card.Body>
            </Card>


        );
    }
}

export default getComments;