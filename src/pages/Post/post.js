import React from 'react';
import Poll from "../../components/Poll/poll"
import EventInPost from "../../components/Event/EventInPost";
import GetComments from "../../components/Comment/getComments"
import PostComment from '../../components/Comment/PostComment'
import CreatePollModal from "../../components/Modals/CreatePollModal";
import DeletePollModal from "../../components/Modals/DeletePollModal";
import AddEventToPostModal from "../../components/Modals/AddEventToPostModal";
import RemoveEventFromPostModal from "../../components/Modals/RemoveEventFromPostModal";
import moment from "moment";
import {Link} from "react-router-dom";
import {HiOutlineChevronLeft} from "react-icons/hi";
import LeaveGroupModal from "../../components/Modals/LeaveGroupModal";
import LikeButton from "../../components/Post/likeButton";
import {Card} from "react-bootstrap";

class Post extends React.Component {
    state = {
        activePost : [],
    }
    constructor() {
        super();
        this.getPost = this.getPost.bind(this)
        this.refreshPost = this.refreshPost.bind(this)
    }
    getPost(post){
        this.setState({ activePost : post })
        console.warn(this.state.activePost)
        this.forceUpdate()
    }
    refreshPost(postId){
        fetch('https://apisymfonykelian.herokuapp.com/api/posts/' + postId)
            .then(res => res.json())
            .then((data) => {
                this.setState({ activePost : data })
            })
            .catch(console.log)

    }

    componentDidMount = async () => {
        const postId = this.props.location.state.post;
        this.refreshPost(postId)
    }

    render() {
        return (
            <>
                <div className="d-flex justify-content-between mt-4 ml-4 mr-4">
                    <button className="btn btn-primary d-flex align-items-center">
                        <HiOutlineChevronLeft></HiOutlineChevronLeft>
                        <Link className="text-white" to="/posts">Retour</Link>
                    </button>
                </div>


                <div className="d-flex justify-content-around pt-3">
                    <div className="post">
                        <Card style={{ width: '30rem', marginBottom : 10 }}>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{this.state.activePost.content}</Card.Subtitle>
                                <Card.Text>
                                    {moment(this.state.activePost.publishedAt).format('DD/MM/YYYY')}
                                </Card.Text>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <CreatePollModal refreshPost={this.refreshPost} post={this.state.activePost} id={this.props.location.state.id}></CreatePollModal>
                                        <DeletePollModal refreshPost={this.refreshPost} post={this.state.activePost} id={this.props.location.state.id}></DeletePollModal>
                                    </div>
                                    <div>
                                        {this.state.activePost.event === null &&
                                        <AddEventToPostModal refreshPost={this.refreshPost} post={this.state.activePost} event={this.state.activePost.event} id={this.props.location.state.id}></AddEventToPostModal>
                                        }
                                        {this.state.activePost.event !== null &&
                                        <RemoveEventFromPostModal refreshPost={this.refreshPost} post={this.state.activePost} id={this.props.location.state.id}></RemoveEventFromPostModal>
                                        }
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        {this.state.activePost.poll != null &&
                            <Card style={{ width: '30rem', marginBottom : 10 }}>
                                <Card.Body>
                                    <Poll post={this.state.activePost} id={this.props.location.state.id}></Poll>
                                </Card.Body>
                            </Card>
                        }

                        {this.state.activePost.event != null &&
                        <Card style={{ width: '30rem', marginBottom : 10 }}>
                            <Card.Body>
                                <EventInPost event={this.state.activePost.event} id={this.props.location.state.id}></EventInPost>
                            </Card.Body>
                        </Card>
                        }
                    </div>

                    <div className="comment">
                        <GetComments refreshPost={this.refreshPost} post={this.state.activePost} id={this.props.location.state.id}></GetComments>
                        <PostComment post={this.state.activePost} getPost={this.getPost}></PostComment>
                    </div>



                </div>
            </>
        );
    }
}

export default Post;