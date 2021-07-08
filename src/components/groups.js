import React from 'react'
import NavBar from "./navbar";

const Group = ({ groups }) => {
    return (
        <div>
            <NavBar></NavBar>

            <center><h1>Group List</h1></center>
            {groups.map((group) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{group.id}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{group.name}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{group.name}</h6>
                        <p>Group members : </p>
                        {group.users.map((user) => (
                                <p>{user.id} - {user.name}</p>
                        ))}
                        <p>Group admins : </p>
                        {group.groupAdmins.map((groupAdmin) => (
                            <p>{groupAdmin.id} - {groupAdmin.name}</p>
                        ))}
                    </div>
                </div>

            ))}
        </div>
    )
};

export default Group