import React from 'react';
import DeleteGroupModal from "../../components/Modals/DeleteGroupModal";
import AddUserToGroupModal from "../../components/Modals/AddUserToGroupModal";
import RemoveUserFromGroupModal from "../../components/Modals/ManageUsersFromGroupModal";
import EditGroupModal from "../../components/Modals/EditGroupModal";
import LeaveGroupModal from "../../components/Modals/LeaveGroupModal";
import SendMessageToGroup from "../../components/Group/SendMessageToGroup";
import DeleteMessage from "../../components/Modals/DeleteMessage";
import EditMessageModal from "../../components/Modals/EditMessageModal";
import {Link} from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";

class Group extends React.Component {
    state = {
        group : []
    }
    constructor(props) {
        super(props);
        this.refreshGroup = this.refreshGroup.bind(this)
    }
    refreshGroup(groupId){
        window.scrollTo(0,document.body.scrollHeight - 100);

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
            <>
               <div className="fixed-top bg-light pb-4">
                   <div className="d-flex justify-content-between mt-4 ml-4 mr-4">
                       <button className="btn btn-primary d-flex align-items-center">
                           <HiOutlineChevronLeft></HiOutlineChevronLeft>
                           <Link className="text-white" to="/groups">Retour</Link>
                       </button>
                       <LeaveGroupModal group={this.state.group}></LeaveGroupModal>
                   </div>

                   <div className="d-flex justify-content-center mb-2">
                       <h4 className="mr-2 ">Name : {this.state.group.name}</h4>
                       { this.state.group?.groupAdmins?.map((admin) => {
                           if(this.props.location.state.id === admin.id){
                               return (
                                   <>
                                       <EditGroupModal refreshGroup={this.refreshGroup} group={this.state.group} ></EditGroupModal>
                                   </>
                               )
                           }
                       }) }
                   </div>


                   { this.state.group?.groupAdmins?.map((admin) => {
                       if(this.props.location.state.id === admin.id){
                           return (
                               <>
                                   <DeleteGroupModal group={this.state.group}></DeleteGroupModal>
                                   <RemoveUserFromGroupModal refreshGroup={this.refreshGroup} group={this.state.group} id={this.props.location.state.id}></RemoveUserFromGroupModal>
                               </>
                           )
                       }
                   }) }
                   <AddUserToGroupModal refreshGroup={this.refreshGroup} group={this.state.group} id={this.props.location.state.id}></AddUserToGroupModal>

               </div>

                <div style={{minHeight : 650}} className="bg-light d-flex justify-content-center">
                    <div style={{paddingBottom : 50, paddingTop : 180}}>
                    {this.state.group?.messages?.map((message) => {
                        return(
                            <div className="d-flex justify-content-start m-2 align-items-baseline" key={message.id}>
                                    <p className="mr-2 text-left">{message.author.name} : {message.content}</p>
                                    {this.props.location.state.id === message.author.id ?
                                        <>
                                            <EditMessageModal group={this.state.group} refreshGroup={this.refreshGroup} message={message}></EditMessageModal>
                                            <DeleteMessage group={this.state.group} refreshGroup={this.refreshGroup} message={message}></DeleteMessage>
                                        </> : null}
                            </div>
                        )
                    })}
                    </div>

                </div>

                <div className="fixed-bottom mt-5">
                    <SendMessageToGroup refreshGroup={this.refreshGroup} group={this.state.group}></SendMessageToGroup>
                </div>

            </>
        );
    }
}



export default Group;