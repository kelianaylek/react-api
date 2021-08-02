import React from 'react';
import Cookies from "js-cookie";
import {Button} from "react-bootstrap";

const GroupUsersList = ({groupUserList=[], group, id, refreshGroupManageUsers, handleShow}:any) => {

    const removeUser = async (groupId: string, userId: string) =>{
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/removeUser/' + groupId + "/" + userId, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        refreshGroupManageUsers(groupId)
        handleShow()
    }
    const addAdmin = async (groupId: string, userId: string) =>{
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/addAdmin/' + groupId + "/" + userId, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        refreshGroupManageUsers(groupId)
        handleShow()
    }
    const demoteAdmin = async (groupId: string, userId: string) =>{
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/removeAdmin/' + groupId + "/" + userId, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        refreshGroupManageUsers(groupId)
        handleShow()
    }

    let usersInGroup = group.users;
    let groupAdmins = group.groupAdmins;

    let members: any[] = [];
    let isAdmin = false;

    usersInGroup.forEach(function(user: any){
        isAdmin = false
        groupAdmins.forEach(function(groupAdmin: any){
            if(groupAdmin.id === user.id){
                isAdmin = true
            }
        });
        if(!isAdmin){
            members.push(user)
        }
    });
    return (
        <>
            { groupAdmins.map((user :any,index :any) => {
                if(user.id !== id){
                    return(
                        <div key={user.id}>
                            <div>
                                <h1>{user.name}</h1>
                                <Button onClick={() => demoteAdmin(group.id, user.id)} variant="primary" type="submit">
                                    Demote admin
                                </Button>

                            </div>

                        </div>
                    )
                }
            }) }

            { members.map((user :any,index :any) => {
                if(user.id !== id){
                    return(
                        <div key={user.id}>
                            <div>
                                <h1>{user.name}</h1>
                                <Button onClick={() => removeUser(group.id, user.id)} variant="primary" type="submit">
                                    Remove member
                                </Button>
                                <Button onClick={() => addAdmin(group.id, user.id)} variant="primary" type="submit">
                                    Promote admin
                                </Button>
                            </div>

                        </div>
                    )
                }
            }) }
        </>
    );
}

export default GroupUsersList