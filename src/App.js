import React from 'react';
import "./App.css"
import Login from './pages/Auth/Login'
import Nav from './components/Navbar/Nav'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home"
import Register from "./pages/Auth/Register";
import Cookies from "js-cookie";
import PostList from "./pages/Post/posts";
import Post from "./pages/Post/post";
import Event from './pages/Event/Event'
import GroupList from "./pages/Group/groups";
import Group from './pages/Group/group'

class App extends React.Component{
    state = {
        name : '',
        id : ''
    }

    async componentDidMount() {
        const response = await fetch('https://apisymfonykelian.herokuapp.com/api/users/connected', {
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + Cookies.get('token')},
            credentials: 'include'
        })
        const content = await response.json()
        this.setState({name: content.name})
        this.setState({id: content.id})
        this.forceUpdate()
    }

render(){
    return (
        <div className="App">
            <BrowserRouter>
                <div>

                    <main>
                        <Switch>
                            <Route path="/" component={() => <> <Nav name={this.state.name}></Nav> <Home name={this.state.name} /> </>} exact/>
                            <Route path="/login" component={() => <> <Nav name={this.state.name}></Nav> <Login/> </>} />
                            <Route path="/register" component={() => <> <Nav name={this.state.name}></Nav> <Register/> </>}/>
                            <Route path="/posts" component={() => <> <Nav name={this.state.name}></Nav> <PostList id={this.state.id} /> </>}/>
                            <Route path={"/post/:postId"} component={Post}/>

                            <Route path="/events" component={() => <> <Nav name={this.state.name}></Nav> <Event id={this.state.id}/> </>}/>
                            <Route path="/groups" component={() => <> <Nav name={this.state.name}></Nav> <GroupList id={this.state.id}/> </>}/>
                            <Route path={"/group/:groupId"} component={Group}/>


                        </Switch>
                    </main>
                </div>
            </BrowserRouter>

        </div>
    )

}

}

export default App;