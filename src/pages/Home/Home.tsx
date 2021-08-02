import React from "react";
import Cookies from "js-cookie";

class Home extends React.Component<any, any> {
    state = {
        name : this.props.name,
    }

    async componentDidMount() {
        const response = await fetch('https://apisymfonykelian.herokuapp.com/api/users/connected', {
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + Cookies.get('token')},
            credentials: 'include'
        })
        const content = await response.json()
        this.setState({name: content.name})

    }

    render(){

        return (
            <div>
                <p>{this.state.name ? 'Hi ' + this.state.name : 'You are not logged in'}</p>

            </div>
        )
    }

}

export default Home;