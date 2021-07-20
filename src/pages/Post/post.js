import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";
import {Link} from "react-router-dom";
import Poll from "../../components/Poll/poll"
import Event from "../../components/Event/Event";
import GetComments from "../../components/Comment/getComments"
import PostComment from '../../components/Comment/PostComment'

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
                <p>Id : {this.state.activePost.id}</p>
                <p>Content : {this.state.activePost.content}</p>
                <p>Date : {this.state.activePost.publishedAt}</p>
                <p>Image Link : {this.state.activePost.image}</p>

                <GetComments post={this.state.activePost}></GetComments>

                <PostComment post={this.state.activePost}></PostComment>

                <br/><br/>
                {this.state.activePost.poll != null &&
                    <Poll poll={this.state.activePost.poll}></Poll>
                }
                <br/><br/>

                {this.state.activePost.event != null &&
                    <Event event={this.state.activePost.event}></Event>
                }
            </div>

        );
    }
}

export default Post;