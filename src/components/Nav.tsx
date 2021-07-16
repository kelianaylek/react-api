import React from "react";
import {Link} from "react-router-dom";

const Nav = (props : {name :string}) => {

    let menu ;
    if(props.name === ''){
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
                    <Link to="#" className="nav-link active" aria-current="page" href="#">{props.name}</Link>
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

export default Nav;