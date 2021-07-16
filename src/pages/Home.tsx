import React, {useEffect, useState} from "react";

const Home = (props : {name : string}) => {

    return (
        <div>
           <p>{props.name ? 'Hi ' + props.name : 'You are not logged in'}</p>

        </div>
    )
}

export default Home;