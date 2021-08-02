import React from 'react';
import Event from '../../components/Event/Event'

class EventList extends React.Component<any> {

    state = {
        events : [],
    }
    constructor(props :any) {
        super(props);
        this.refreshEvents = this.refreshEvents.bind(this)
    }
    refreshEvents(){
        fetch('https://apisymfonykelian.herokuapp.com/api/events')
            .then(res => res.json())
            .then((data) => {
                this.setState({ events : data })
            })
            .catch(console.log)
    }
    componentDidMount() {
        this.refreshEvents()
    }
    render() {
        return (
            <Event refreshEvents={this.refreshEvents} events={this.state.events} id={this.props.id}/>
        );
    }
}

export default EventList;