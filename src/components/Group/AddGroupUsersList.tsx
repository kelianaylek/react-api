import React from 'react';
import Cookies from "js-cookie";
import {Button} from "react-bootstrap";

const AddGroupUsersList = ({groupUserList=[], group, id, refreshGroupAddUser}:any) => {

    const addMember = async (groupId: string, userId: string) =>{
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/addUser/' + groupId + "/" + userId, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        refreshGroupAddUser(groupId)
    }

    let users = groupUserList;
    let usersInGroup = group.users;
    let usersNotInGroup: any[] = [];
    let alreadyInGroup = false;

    users.forEach(function(user: any){
        alreadyInGroup = false
        usersInGroup.forEach(function(userInGroup: any){
            if(userInGroup.id === user.id){
                alreadyInGroup = true
            }
        });
        if(!alreadyInGroup){
            usersNotInGroup.push(user)
        }
    });

    return (
        <>
            { usersNotInGroup.map((user :any,index :any) => {
                return(
                    <div key={user.id}>
                        <div>
                            <h1>{user.name}</h1>

                            <Button onClick={() => addMember(group.id, user.id)} variant="primary" type="submit">
                                Add member
                            </Button>
                        </div>

                    </div>
                )
            }) }
        </>
    );
}

export default AddGroupUsersList