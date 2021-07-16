import React from 'react'

const Event = ({ events }) => {
    return (

        <div>

            <center><h1>Event List</h1></center>
            {events.map((event) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{event.id}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Titre : {event.title}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Desc : {event.description}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Auteur : {event.owner.name}</h6>

                    </div>
                </div>

            ))}
        </div>
    )
};

export default Event