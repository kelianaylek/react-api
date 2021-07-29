import React, {useState} from 'react'
import {Link} from "react-router-dom";
import LikeButton from "./likeButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import CreatePostModal from "../Modals/CreatePostModal";

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

    render(){
        return (
            <div>
                <center><h1>Post List</h1></center>

                <CreatePostModal></CreatePostModal>

                <div className="d-flex justify-content-around flex-wrap">
                    {this.props.posts.map((post) => (
                        <div key={post.id} className="card w-30 mb-4">

                            <EditButton editPosts={this.editPosts} post={post} id={this.props.id}></EditButton>
                            <DeleteButton deletePost={this.deletePost} post={post} id={this.props.id}></DeleteButton>
                            <div className="card-body">
                                <h5 className="card-title" key={post.id}>Id : {post.id}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Content : {post.content}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">Publié à : {post.publishedAt}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">Image link : {post.image}</h6>


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