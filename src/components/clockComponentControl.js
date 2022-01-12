import React from "react";
import './clockComponentControl.css'
import { convertToHMS } from "../util/convertTime";

const ClockControl = (props) => {
    const startClockHandler = (event) => {
            console.log("GUI: Start pressed")
            props.onStartClock()
    }

    const pauseClockHandler = (event) => {
        console.log("GUI: Pause pressed")
        props.onPauseClock()
}

    const resetClockHandler = (event) => {
        console.log("GUI: Reset pressed")
        props.onResetClock()
    }

    const iTime = convertToHMS(props.targetTime, true)
    const iH = iTime[0]
    const iM = iTime[1]
    const iS = iTime[2]

    const targetSecChangeHandler = (event) => {
        const newtime = parseInt(60*60*iH) + parseInt((iM*60) + parseInt(event.target.value))
        console.log("computed value is " + newtime + " seconds")
        props.onChangeTargetTime(newtime)
    }

    const targetMinChangeHandler = (event) => {
        const newtime = parseInt(60*60*iH) + parseInt((event.target.value*60) + parseInt(iS))
        console.log("computed value is " + newtime + " seconds")
        props.onChangeTargetTime(newtime)
    }

    const targetHourChangeHandler = (event) => {
        const newtime = (60*60*event.target.value) + parseInt((iM*60) + parseInt(iS))
        console.log("computed value is " + newtime + " seconds")
        props.onChangeTargetTime(newtime)
    }

    const changeRedOverrunHandler = (event) => {
        console.log(JSON.stringify("GUI: RED OVERUN CHANGED TO  " + event.target.checked))
        props.changeRedOverrun(event.target.checked)
    }

    const changeClockNameHandler = (event) => {
        console.log("GUI: Clock name value is " + event.target.value)
        props.onChangeClockName(event.target.value)
    }
    //console.log("CTRL: Clock Type " + props.clockType)







    if (props.clockType === "AMPCtrlClock") {
        return (
            <form className="clock-control">
                <div>Video Clock</div>
            </form>
        )
    } else return (
        <form className="clock-control">
            { props.clockType === "AMPCtrlClock" ? console.log("VIDEOHHHH") : ""}
                <input type="text" className="clock-control__name" onChange={changeClockNameHandler} value={props.clockName} />
                <div className="clock-control__time">
                    <input type="number" max="24" min="0" onChange={targetHourChangeHandler} value={iH} /> :
                    <input type="number" max="60" min="0" onChange={targetMinChangeHandler} value={iM} /> :
                    <input type="number" max="60" min="0" onChange={targetSecChangeHandler} value={iS} />
                </div>
                <input className="clock-control__check" type="checkbox" onChange={changeRedOverrunHandler} value={props.red_overrun} />
                <label>Count over in red</label>
                <div className="clock-control__buttons">
                    {props.clockState === "stopped" ? 
                    (<button type="button" onClick={startClockHandler}>Start</button>) :
                    (<button type="button" onClick={pauseClockHandler}>Pause</button>)
                    } 
                    <button type="button" onClick={resetClockHandler}>Reset</button>
                </div>
                
        </form>
    )
}

export default ClockControl