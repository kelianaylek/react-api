import React from 'react';
import Cookies from "js-cookie";
import {Button} from "react-bootstrap";

const UserList = ({userList=[], event, id, refreshEventAddMember}:any) => {

    const addMember = async (userId: string, eventId: string) =>{
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/events/addMember/' + eventId + "/" + userId, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        refreshEventAddMember()
    }


    return (
        <>
            { userList.map((user :any,index :any) => {
                if (user.id !== id) {
                    return (
                        <div key={user.id}>
                            <h1>{user.name}</h1>

                            <Button onClick={() => addMember(user.id, event.id)} variant="primary" type="submit">
                                Add member
                            </Button>
                        </div>
                    )
                }
                return null
            }) }
        </>
    );
}

export default UserList