import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import Parse from 'parse/react-native';


const NavBar = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        // Since the async method Parse.User.currentAsync is needed to
        // retrieve the current user data, you need to declare an async
        // function here and call it afterwards
        async function getCurrentUser() {
            // This condition ensures that username is updated only if needed
            if (username === '') {
                const currentUser = await Parse.User.currentAsync();
                if (currentUser !== null) {
                    setUsername(currentUser.getUsername());
                }
            }
        }
        getCurrentUser();
    }, [username]);

    return (
        <div className="d-flex justify-content-between">
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