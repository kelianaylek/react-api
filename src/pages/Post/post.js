import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";
import {Link} from "react-router-dom";
import Poll from "../../components/Poll/poll"
import EventInPost from "../../components/Event/EventInPost";
import GetComments from "../../components/Comment/getComments"
import PostComment from '../../components/Comment/PostComment'
import CreatePollModal from "../../components/Modals/CreatePollModal";
import DeletePollModal from "../../components/Modals/DeletePollModal";
import AddEventToPostModal from "../../components/Modals/AddEventToPostModal";
import RemoveEventFromPostModal from "../../components/Modals/RemoveEventFromPostModal";

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
            <div>
                <p>Id : {this.state.activePost.id}</p>
                <p>Content : {this.state.activePost.content}</p>
                <p>Date : {this.state.activePost.publishedAt}</p>
                <p>Image Link : {this.state.activePost.image}</p>

                <GetComments post={this.state.activePost} id={this.props.location.state.id}></GetComments>

                <PostComment post={this.state.activePost} getPost={this.getPost}></PostComment>

                <br/><br/>
                <CreatePollModal refreshPost={this.refreshPost} post={this.state.activePost} id={this.props.location.state.id}></CreatePollModal>
                <br/>
                <DeletePollModal refreshPost={this.refreshPost} post={this.state.activePost} id={this.props.location.state.id}></DeletePollModal>

                {this.state.activePost.poll != null &&
                    <Poll post={this.state.activePost} id={this.props.location.state.id}></Poll>
                }

                <br/><br/>
                {this.state.activePost.event === null &&
                <AddEventToPostModal post={this.state.activePost} event={this.state.activePost.event} id={this.props.location.state.id}></AddEventToPostModal>
                }

                {this.state.activePost.event !== null &&
                <RemoveEventFromPostModal post={this.state.activePost} id={this.props.location.state.id}></RemoveEventFromPostModal>
                }

                {this.state.activePost.event != null &&
                    <EventInPost event={this.state.activePost.event} id={this.props.location.state.id}></EventInPost>
                }
            </div>

        );
    }
}

export default Post;