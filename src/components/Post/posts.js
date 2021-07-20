import React from 'react'
import {Link} from "react-router-dom";

const Post = ({ posts }) => {
    return (
        <div>
            <center><h1>Post List</h1></center>
            <div className="d-flex justify-content-around flex-wrap">
                {posts.map((post) => (
                    <div key={post.id} className="card w-30 mb-4">
                        <div className="card-body">
                            <h5 className="card-title" key={post.id}>Id : {post.id}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Content : {post.content}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Publié à : {post.publishedAt}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Image link : {post.image}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Likes : {post.likedBy.length}</h6>



                        </div>
                        <button>
                            <Link to={{
                                pathname: `/post/${post.id}`,
                                state : { post : post.id }
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
};

export default Post