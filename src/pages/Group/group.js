import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";
import {Link} from "react-router-dom";
import DeleteGroupModal from "../../components/Modals/DeleteGroupModal";
import AddUserToGroupModal from "../../components/Modals/AddUserToGroupModal";
import RemoveUserFromGroupModal from "../../components/Modals/ManageUsersFromGroupModal";
import EditGroupModal from "../../components/Modals/EditGroupModal";
import LeaveGroupModal from "../../components/Modals/LeaveGroupModal";
import SendMessageToGroup from "../../components/Group/SendMessageToGroup";
import DeleteMessage from "../../components/Modals/DeleteMessage";
import EditMessageModal from "../../components/Modals/EditMessageModal";

class Group extends React.Component {
    state = {
        group : []
    }

    componentDidMount = async () => {
        const groupId = this.props.location.state.group;

        fetch('https://apisymfonykelian.herokuapp.com/api/groups/' + groupId)
            .then(res => res.json())
            .then((data) => {
                this.setState({ group : data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>

                <div className="d-flex justify-content-around">
                    <h3>Users :</h3>
                    { this.state.group.users?.map((user) => {
                        return (
                            <div key={user.id}>
                                <p>{user.id} - {user.name}</p>
                            </div>
                        )
                    }) }
                    <h3>Admins :</h3>
                    { this.state.group?.groupAdmins?.map((admin) => {
                        return (
                            <div key={admin.id}>
                                <p>{admin.id} - {admin.name}</p>
                            </div>
                        )
                    }) }
                </div>

                <br/><br/>

                <p>Id : {this.state.group.id}</p>
                <p>name : {this.state.group.name}</p>

                <LeaveGroupModal group={this.state.group}></LeaveGroupModal>

                { this.state.group?.groupAdmins?.map((admin) => {
                    if(this.props.location.state.id === admin.id){
                        return (
                            <>
                                <EditGroupModal group={this.state.group} ></EditGroupModal>

                                <DeleteGroupModal group={this.state.group}></DeleteGroupModal>
                                <RemoveUserFromGroupModal group={this.state.group} id={this.props.location.state.id}></RemoveUserFromGroupModal>
                            </>
                        )
                    }
                }) }
                <AddUserToGroupModal group={this.state.group} id={this.props.location.state.id}></AddUserToGroupModal>

                <div>
                    <h2>Messages :</h2>
                    {this.state.group?.messages?.map((message) => {
                        return(
                            <div key={message.id}>
                                <div>
                                    <p>{message.id} - {message.content} - {message.author.name}</p>
                                    {this.props.location.state.id === message.author.id ?
                                        <div>
                                            <EditMessageModal message={message}></EditMessageModal>
                                            <DeleteMessage message={message} group={this.state.group}></DeleteMessage>
                                        </div> : null}
                                </div>

                            </div>
                        )
                    })}
                </div>

                <SendMessageToGroup group={this.state.group}></SendMessageToGroup>


            </div>

        );
    }
}

export default Group;