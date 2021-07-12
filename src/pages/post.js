import React, { Component } from 'react';
import {routes} from "../router/RouteConstants";

class Post extends Component {
    state = {
        activePost : []
    }
    componentDidMount = async () => {
        const postId = this.props.location.state.post;

        fetch('https://apisymfonykelian.herokuapp.com/api/posts/' + postId)
            .then(res => res.json())
            .then((data) => {
                this.setState({ activePost : data })
            })
            .catch(console.log)
    }
    render() {

        return (
            <div>
                <p>{this.state.activePost.id}</p>
                <p>{this.state.activePost.content}</p>
                <p>{this.state.activePost.publishedAt}</p>
                <p>{this.state.activePost.image}</p>

                {this.state.activePost?.comments?.map((comment) => (
                    <p key={comment.id}>{comment.id} - {comment.message} - {comment.author.name} - {comment.image}</p>
                ))}

            </div>

        );
    }
}

export default Post;