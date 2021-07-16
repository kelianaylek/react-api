import React from 'react'
import {Link} from "react-router-dom";

const Post = ({ posts }) => {
    return (
        <div>

            <center><h1>Post List</h1></center>
            {posts.map((post) => (
                <div key={post.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title" key={post.id}>{post.id}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{post.content}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{post.publishedAt}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{post.image}</h6>
                        <p>Comments : </p>
                        {post.comments.map((comment) => (
                            <p key={comment.id}>{comment.id} - {comment.message} - {comment.author.name} - {comment.image}</p>
                        ))}
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
    )
};

export default Post