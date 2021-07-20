import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";

class Poll extends React.Component<any, any> {
   state = {
       poll : this.props.poll
   }
    componentDidMount = async () => {

        fetch('https://apisymfonykelian.herokuapp.com/api/polls/' + this.state.poll.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ poll : data })
            })
            .catch(console.log)
    }
    render() {
        return (
            <div>
                <h2>Poll :</h2>
                <p>Poll id : {this.state.poll.id}
                </p>
                <p>Choices : </p>
                {this.state.poll?.pollChoices?.map((pollChoice:any) => (
                    <p key={pollChoice.id}>{pollChoice.id} - {pollChoice.title} -
                        {pollChoice?.users?.map((pollChoiceUsers:any) => (
                            <span key={pollChoiceUsers.id}> User : {pollChoiceUsers.id} - </span>
                        ))}
                        Votes : {pollChoice?.users?.length}
                    </p>

                ))}

            </div>
        );
    }
}

export default Poll;