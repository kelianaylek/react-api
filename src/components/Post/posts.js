import React from 'react'
import {Link} from "react-router-dom";
import LikeButton from "./likeButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import CreatePostModal from "../Modals/CreatePostModal";
import moment from "moment";

class Post extends React.Component {
    state = {
        posts : this.props.posts,
        id : this.props.id
    }
    constructor(props) {
        super(props);
        this.editPosts = this.editPosts.bind(this);
        this.deletePost = this.deletePost.bind(this);

    }
    editPosts(){
        this.setState({posts : this.props.posts})
        this.forceUpdate()
        this.props.updatePosts()
    }
    deletePost(){
        this.setState({posts : this.props.posts})
        this.forceUpdate()
        this.props.deletePost()
    }
    createPost(){
        this.setState({posts : this.props.posts})
        this.forceUpdate()
        this.props.createPost()
    }


    render(){
        return (
            <div>
                <div className="pr-4 pl-4 d-flex justify-content-between">
                    <h1>Post List</h1>
                    <div>
                        <CreatePostModal createPost={this.props.createPost}></CreatePostModal>
                    </div>
                </div>

                <div className="d-flex justify-content-around flex-wrap">
                    {this.props.posts.map((post) => (
                        <div key={post.id} className="card w-25 m-3">
                            <div className="d-flex justify-content-between">
                                <EditButton editPosts={this.editPosts} post={post} id={this.props.id}></EditButton>
                                <DeleteButton deletePost={this.deletePost} post={post} id={this.props.id}></DeleteButton>
                            </div>

                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">Content : {post.content}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">Publié le : {moment(post.publishedAt).format('DD/MM/YYYY')}</h6>

                                <LikeButton post={post} id={this.props.id}></LikeButton>

                            </div>
                            <button>
                                <Link to={{
                                    pathname: `/post/${post.id}`,
                                    state : {
                                        post : post.id,
                                        id : this.props.id
                                    }
                                }}
                                >
                                    View Post
                                </Link>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

};

export default Post