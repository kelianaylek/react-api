import React from 'react'
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div class="d-flex justify-content-between">
            <div>
                <Link to={{ pathname: `posts`}}>Home</Link>
                <Link to={{ pathname: `groups`}}>Groups</Link>
                <Link to={{ pathname: `events`}}>Events</Link>
            </div>
            <div>
                <Link to={{ pathname: `login`}}>Login</Link>

                <Link to={{ pathname: `signup`}}>Sign Up</Link>

            </div>
        </div>

    )
};

export default NavBar