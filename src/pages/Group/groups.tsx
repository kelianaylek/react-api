import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";
import Groups from "../../components/Group/groups";

class GroupList extends React.Component<any> {

    state = {
        groups : [],
    }
    constructor(props :any) {
        super(props);
        this.refreshGroups = this.refreshGroups.bind(this)
    }
    refreshGroups(){
        fetch('https://apisymfonykelian.herokuapp.com/api/groups')
            .then(res => res.json())
            .then((data) => {
                this.setState({ groups : data })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.refreshGroups()
    }
    render() {
        return (
            <Groups refreshGroups={this.refreshGroups} groups={this.state.groups} id={this.props.id}/>
        );
    }
}

export default GroupList;