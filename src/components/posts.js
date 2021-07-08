import React from 'react'
import NavBar from "./navbar";

const Post = ({ posts }) => {
    return (
        <div>
            <NavBar></NavBar>

            <center><h1>Post List</h1></center>
            {posts.map((post) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{post.id}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{post.content}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{post.publishedAt}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{post.image}</h6>
                        <p>Comments : </p>
                        {post.comments.map((comment) => (
                            <p>{comment.id} - {comment.message} - {comment.author.name} - {comment.image}</p>
                        ))}
                    </div>
                </div>

            ))}
        </div>
    )
};

export default Post