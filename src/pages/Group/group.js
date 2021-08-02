import React from 'react';
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
    constructor(props) {
        super(props);
        this.refreshGroup = this.refreshGroup.bind(this)
    }
    refreshGroup(groupId){
        fetch('https://apisymfonykelian.herokuapp.com/api/groups/' + groupId)
            .then(res => res.json())
            .then((data) => {
                this.setState({ group : data })
            })
            .catch(console.log)
    }
    componentDidMount = async () => {
        const groupId = this.props.location.state.group;
        this.refreshGroup(groupId)
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
                                <EditGroupModal refreshGroup={this.refreshGroup} group={this.state.group} ></EditGroupModal>

                                <DeleteGroupModal group={this.state.group}></DeleteGroupModal>
                                <RemoveUserFromGroupModal refreshGroup={this.refreshGroup} group={this.state.group} id={this.props.location.state.id}></RemoveUserFromGroupModal>
                            </>
                        )
                    }
                }) }
                <AddUserToGroupModal refreshGroup={this.refreshGroup} group={this.state.group} id={this.props.location.state.id}></AddUserToGroupModal>

                <div>
                    <h2>Messages :</h2>
                    {this.state.group?.messages?.map((message) => {
                        return(
                            <div key={message.id}>
                                <div>
                                    <p>{message.id} - {message.content} - {message.author.name}</p>
                                    {this.props.location.state.id === message.author.id ?
                                        <div>
                                            <EditMessageModal group={this.state.group} refreshGroup={this.refreshGroup} message={message}></EditMessageModal>
                                            <DeleteMessage group={this.state.group} refreshGroup={this.refreshGroup} message={message}></DeleteMessage>
                                        </div> : null}
                                </div>

                            </div>
                        )
                    })}
                </div>

                <SendMessageToGroup refreshGroup={this.refreshGroup} group={this.state.group}></SendMessageToGroup>


            </div>

        );
    }
}

export default Group;