import React from "react";

import LoginButton from "./login-button";
// import LogoutButton from "./logout-button";
import SignupButton from "./signup-button";
import Profile from "./profile";
import LogoutButton from "./logout-button";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <div><LogoutButton /><Profile/></div> : <div><SignupButton/><LoginButton /></div>;


};

export default AuthenticationButton;