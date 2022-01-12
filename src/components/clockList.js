import React from "react";

import ClockComponent from "./clockComponent";



const ClocksList = (props) => {
    // console.log("Props data")
    // console.log(props.clocks)

    //console.log("My name is " + JSON.stringify(props))
    
    return (
        <div className="clocks-container">
            { props.clocks.map((clock) => (
            <ClockComponent
                key={clock.id}
                id={clock.id}
                name={clock.name}
                targetTime={clock.targetTime}
                time={clock.time}
                red_overrun={clock.red_overrun}
                isOverrun={clock.overrun}
                type={clock.type}
                clockState={clock.clockState}
                isHidden={clock.isHidden}
                />
            ))}
        </div>
    )
}

export default ClocksList;