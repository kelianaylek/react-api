import React from 'react'
import {Link} from "react-router-dom";

const Users = ({ users }) => {
    return (
        <div>
            <center><h1>Users List</h1></center>
            {users.map((user) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{user.id}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{user.name}</h6>
                    </div>
                </div>

            ))}
            <Link to={{ pathname: `posts`}}>Go posts</Link>
        </div>
    )
};

export default Users