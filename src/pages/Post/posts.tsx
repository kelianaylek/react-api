import React, { Component } from 'react';
import Posts from "../../components/Post/posts";
import {routes} from "../../router/RouteConstants";

class PostList extends React.Component<any> {
    state = {
        posts : [],
    }
    constructor(props :any) {
        super(props);
        this.updatePosts = this.updatePosts.bind(this);
        this.deletePost = this.updatePosts.bind(this);
    }
    getPosts(){
        fetch('https://apisymfonykelian.herokuapp.com/api' + routes.GET_POSTS)
            .then(res => res.json())
            .then((data) => {
                this.setState({ posts : data })
            })
            .catch(console.log)
        this.forceUpdate()
    }
    deletePost(){
        this.getPosts()
    }
    updatePosts(){
        this.getPosts()
    }
    componentDidMount() {
        this.getPosts()
    }

    render() {
        return (
            <Posts deletePost={this.deletePost} updatePosts={this.updatePosts} posts={this.state.posts} id={this.props.id}/>
        );
    }
}

export default PostList;