import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";
import CreatePollChoiceModal from "../Modals/CreatePollChoiceModal";
import DeletePollChoiceModal from "../Modals/DeletePollChoiceModal";

class Poll extends React.Component<any, any> {
   state = {
       poll : this.props.post.poll
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
                    <div className="d-flex justify-content-around" key={pollChoice.id}>

                        <DeletePollChoiceModal poll={this.state.poll} pollChoice={pollChoice}></DeletePollChoiceModal>

                        <p>Id : {pollChoice.id}</p>
                        <p>Title : {pollChoice.title}</p>

                        {pollChoice?.users?.map((pollChoiceUsers:any) => (
                            <div key={pollChoiceUsers.id}>
                                <p>User : {pollChoiceUsers.id}</p>
                            </div>
                        ))}

                        <p>Votes : {pollChoice?.users?.length}</p>

                        <button>Voter</button>
                    </div>

                ))}

                <CreatePollChoiceModal post={this.props.post}></CreatePollChoiceModal>

            </div>
        );
    }
}

export default Poll;