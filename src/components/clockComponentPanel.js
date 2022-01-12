import React, { useState, useEffect } from "react";
import './clockComponentPanel.css'
import '../util/convertTime'
import { convertToHMS } from "../util/convertTime";

const ClockPanel = (props) => {

    //let [isHidden, setIsHidden] = useState(props.isHidden)
    let isOverrunState = false
    

    const changeDisplayState = (event) => {
        props.onChangeDisplayState()
    }

    //console.log(props)

    if (props.isOverrun) {
        //console.log("in overrun state")
        if (props.red_overrun) {
            console.log("set clock to red")
            isOverrunState = true
        }
    }

    let iTime = convertToHMS(props.time)

    if (props.clockType === "Down" ) {
        //console.log("we're a count down clock")
        iTime = convertToHMS(props.targetTime - props.time)
    } else if (props.clockType === "ToD" && props.targetTime !== 86400) {
        //we don't need to worry about this, it's computed server side
        iTime = convertToHMS(props.time)
    } else if (props.clockType === "ToD" && props.targetTime === 86400) {
        if (props.time === 0 ) {
        //    console.log("GUI: No time set. Assume time of day")
        } 
    }


    const iH = iTime[0]
    const iM = iTime[1]
    const iS = iTime[2]

    //console.log("Hide data for clock " + props.time + " is " + props.isHidden)
    if (!props.isHidden)  {
       // console.log("GUI: change display button state to off ")
    } else {
        //console.log("GUI: change button display state to on ")
    }

    return (
        <div className="clock-panel">
            <div>
                <div className="clock-panel__type">Time</div>
                {iH === "" ? 
                (<div id="timedvis" className="clock-panel__time" style={{color: isOverrunState ? 'red' : '' }}>{iM}:{iS}</div>) :
                (<div id="timedvis" className="clock-panel__time"style={{color: isOverrunState ? 'red' : '' }}>{iH}:{iM}:{iS}</div>)
                }
                {props.isHidden === false ? 
                (<button type="submit" className="clock-panel__state" onClick={changeDisplayState}>Display Off</button>) :
                (<button type="submit" className="clock-panel__state" onClick={changeDisplayState}>Display On</button>)
                }
                <div></div>
            </div>
        </div>
    )
}

export default ClockPanel