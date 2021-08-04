import React from 'react';
import CreatePollChoiceModal from "../Modals/CreatePollChoiceModal";
import DeletePollChoiceModal from "../Modals/DeletePollChoiceModal";
import VoteToPollChoiceButton from './VoteToPollChoiceButton'

class Poll extends React.Component<any, any> {
   state = {
       poll : this.props.post.poll,
       id : this.props.id
   }
    constructor(props :any) {
        super(props);
        this.refreshPoll = this.refreshPoll.bind(this)
    }

   refreshPoll(pollId :any){
       fetch('https://apisymfonykelian.herokuapp.com/api/polls/' + pollId)
           .then(res => res.json())
           .then((data) => {
               this.setState({ poll : data })
           })
           .catch(console.log)
   }
    componentDidMount = async () => {
       this.refreshPoll(this.state.poll.id)
    }


    render() {
        return (
            <div>
                <h5>Poll :</h5>

                {this.state.poll?.pollChoices?.length === 0 ?
                    <p>You have no poll choices yet</p>
                    :
                    <p>Choices : </p>
                }

                {this.state.poll?.pollChoices?.map((pollChoice:any) => (
                    <>
                        <div className="d-flex justify-content-around align-items-baseline" key={pollChoice.id}>
                            {this.state.id === this.props.post.author.id ?
                                <div>
                                    <DeletePollChoiceModal refreshPoll={this.refreshPoll} poll={this.state.poll} pollChoice={pollChoice}></DeletePollChoiceModal>
                                </div>
                                : ""
                            }
                            <p>{pollChoice.title}</p>
                            <div>
                                <VoteToPollChoiceButton poll={this.state.poll} refreshPoll={this.refreshPoll} pollChoice={pollChoice}></VoteToPollChoiceButton>
                            </div>
                        </div>
                        <div>
                            <p>{pollChoice?.users?.length}</p>
                        </div>
                    </>

                ))}
                {this.state.id === this.props.post.author.id ?
                    <div className="mt-4">
                        <CreatePollChoiceModal refreshPoll={this.refreshPoll} post={this.props.post}></CreatePollChoiceModal>
                    </div>
                    : ""
                }
            </div>
        );
    }
}

export default Poll;