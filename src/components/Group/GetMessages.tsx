import React from 'react';

class GetMessages extends React.Component<any, any> {
    state = {
        group : this.props.group
    }

    render() {
        {}
        return (
            <div>
                <h2>Messages :</h2>
                {this.state.group?.messages?.map((message:any) => {

                    return(
                        <div key={message.id}>
                            <div>
                                <p>{message.id} - {message.content} - {message.author.name}</p>
                            </div>
                            <div>
                                {this.props.id === message.author.id ?
                                    <div>
                                        Edit
                                    </div> : null}
                            </div>
                        </div>
                    )

                })}
            </div>
        );
    }
}

export default GetMessages;