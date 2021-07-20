import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";

class getComments extends React.Component<any, any> {
    state = {
        post : this.props.post
    }

    componentDidUpdate= async () => {
        this.state.post = this.props.post;
    }
    componentDidMount= async () => {
        this.state.post = this.props.post;

    }
    render() {
        return (
            <div>
                <h2>Comments :</h2>

                {this.state.post?.comments?.map((post:any) => (
                    <p key={post.id}>{post.id} - {post.message} - {post.author.name} - {post.image}</p>
                ))}
            </div>
        );
    }
}

export default getComments;