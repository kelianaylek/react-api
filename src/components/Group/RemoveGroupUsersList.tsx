import React, {SyntheticEvent} from 'react';
import Cookies from "js-cookie";
import {Button} from "react-bootstrap";

const RemoveGroupUsersList = ({groupUserList=[], group, id}:any) => {

    const addMember = async (groupId: string, userId: string) =>{
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/removeUser/' + groupId + "/" + userId, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        window.location.reload();

    }

    let users = groupUserList;
    let usersInGroup = group.users;

    return (
        <>
            { usersInGroup.map((user :any,index :any) => {
                if(user.id !== id){
                    return(
                        <div key={user.id}>
                            <div>
                                <h1>{user.name}</h1>

                                <Button onClick={() => addMember(group.id, user.id)} variant="primary" type="submit">
                                    Remove member
                                </Button>
                            </div>

                        </div>
                    )
                }
            }) }
        </>
    );
}

export default RemoveGroupUsersList