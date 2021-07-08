import React from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import Posts from "./pages/posts";
import Users from "./pages/users";
const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path={"/"} component={Users} exact/>
            <Route path={"/posts"} component={Posts}/>
        </Switch>
    </BrowserRouter>
)

export default Router;