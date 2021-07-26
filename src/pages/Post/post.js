import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";
import {Link} from "react-router-dom";
import Poll from "../../components/Poll/poll"
import EventInPost from "../../components/Event/EventInPost";
import GetComments from "../../components/Comment/getComments"
import PostComment from '../../components/Comment/PostComment'
import CreatePollModal from "../../components/Modals/CreatePollModal";
import DeletePollModal from "../../components/Modals/DeletePollModal";

class Post extends React.Component {
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

                <GetComments post={this.state.activePost} id={this.props.location.state.id}></GetComments>

                <PostComment post={this.state.activePost}></PostComment>

                <br/><br/>
                <CreatePollModal post={this.state.activePost} id={this.props.location.state.id}></CreatePollModal>
                <br/>
                <DeletePollModal post={this.state.activePost} id={this.props.location.state.id}></DeletePollModal>

                {this.state.activePost.poll != null &&
                    <Poll post={this.state.activePost} id={this.props.location.state.id}></Poll>
                }

                <br/><br/>

                {this.state.activePost.event != null &&
                    <EventInPost event={this.state.activePost.event}></EventInPost>
                }
            </div>

        );
    }
}

export default Post;