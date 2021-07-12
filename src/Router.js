import React from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";

import Posts from "./pages/posts";
import GroupList from "./pages/groups";
import EventList from "./pages/events";
import signUp from "./pages/signup"
import Login from "./pages/login";
import Post from "./pages/post";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path={"/posts"} component={Posts} exact/>
            <Route path={"/post/:postId"} component={Post}/>

            <Route path={"/groups"} component={GroupList}/>
            <Route path={"/events"} component={EventList}/>

            <Route path={"/signup"} component={signUp}/>
            <Route path={"/login"} component={Login}/>


        </Switch>
    </BrowserRouter>
)

export default Router;