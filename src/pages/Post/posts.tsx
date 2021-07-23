import React, { Component } from 'react';
import Posts from "../../components/Post/posts";
import {routes} from "../../router/RouteConstants";

class PostList extends React.Component<any> {

    state = {
        posts : [],
    }
    componentDidMount() {

        fetch('https://apisymfonykelian.herokuapp.com/api' + routes.GET_POSTS)
            .then(res => res.json())
            .then((data) => {
                this.setState({ posts : data })
            })
            .catch(console.log)
    }
    render() {
        return (
            <Posts posts={this.state.posts} id={this.props.id}/>
        );
    }
}

export default PostList;