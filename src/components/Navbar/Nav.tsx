import React from "react";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

class Nav extends React.Component<any, any> {
    state = {
        name : this.props.name
    }
    async componentDidMount() {
        const response = await fetch('https://apisymfonykelian.herokuapp.com/api/users/connected', {
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + Cookies.get('token')},
            credentials: 'include'
        })
        const content = await response.json()
        this.setState({name: content.name})
    }

    render() {
        let menu ;
        if(this.state.name === '' || this.state.name == null){
            menu =  (
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link to='/login' className="nav-link active" aria-current="page" href="#">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link active" aria-current="page" href="#">Register</Link>
                    </li>
                </ul>
            )
        }else{
            menu = (
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link to="/posts" className="nav-link active" aria-current="page">Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/events" className="nav-link active" aria-current="page">Events</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/groups" className="nav-link active" aria-current="page">Groups</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active">{this.state.name}</a>
                    </li>
                </ul>
            )
        }
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Home</Link>

                    <div >
                        {menu}

                    </div>
                </div>
            </nav>

        )
    }


}

export default Nav;