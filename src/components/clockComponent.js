import React, { useState, useEffect } from "react";

import './clockComponent.css'

import ClockControl from "./clockComponentControl";
import ClockPanel from "./clockComponentPanel";

const ClockComponent = (props) => {
    //start time for clock
    const [targetTime, setTargetTime] = useState(props.targetTime)
    const [clockName, setClockName] = useState(props.name)
    const [isOverrun, setIsOverrun] = useState(props.isOverrun)
    const [clockState, setClockState] = useState(props.clockState)
    const [clockType, setClockType] = useState(props.type)
    const [displayState, setDisplayState] = useState(props.isHidden)
    const clockKey = props.id
    const [red_overrun, setRedOverrun] = useState(props.red_overrun)

    //this should generally just be zero
     const secState = props.time

    // console.log("The time is " + props.time)
    // console.log(props)

    // Use to internally update clock
    //  useEffect(() => {
    //      let interval = null
    //      if (clockState) {
    //         interval = setInterval(() => {
    //             if (clockType !== "ToD") {
    //                 setSecState(secState => secState + 1)
    //             } else {
    //                 var d = new Date()
    //                 let now = (d.getHours()*60*60) + (d.getMinutes()*60) + d.getSeconds()
    //                 setSecState(secState => now)
    //             }
                
    //         }, 1000);
    //      } else if (!clockState && secState !== 0) {
    //          clearInterval(interval)
    //      }
    //      return () => clearInterval(interval)
    //     }, [clockState, secState])
         

    //let displayState = false

    useEffect( () => {
        console.log('DATA EFFECT: isHidden updated to ' + props.isHidden);
        console.log('DATA EFFECT: Validating display state '+ displayState)

        if (props.isHidden !== displayState) {
            console.log("DATA EFFECT: OFFSET IS CORRECT, UPDATE STATE")
        } else {
            console.log("DATA EFFECTL: CORRECT DATA WOOHOO")
        }
        // test code .. lets see if this propegates the update
        // it works! hooray!
        setDisplayState(props.isHidden)
    }, [props.isHidden])

    useEffect( () => {
        console.log('DATA EFFECT: clockState updated to ' + props.clockState);
        setDisplayState(props.isHidden)
    }, [props.isHidden])

    useEffect( () => {
        console.log('DATA EFFECT: targetTime updated to ' + props.targetTime);
        changeTargetTime(props.targetTime)
    }, [props.targetTime])

    useEffect( () => {
        console.log('DATA EFFECT: red_overrun updated to ' + props.red_overrun);
        setRedOverrun(props.red_overrun)
    }, [props.red_overrun])

    useEffect( () => {
        console.log('DATA EFFECT: Clock name updated to ' + props.name);
        setClockName(props.name)
    }, [props.name])


    const patchClockData = (data) => {
        const url = 'http://localhost:3010/clocks/' + clockKey
        console.log("****DATA: Patch clock " + url + " DATA IS " + data.red_overrun)
        fetch(url, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    const postResetClock = () => {
        const url = 'http://localhost:3010/clocks/' + clockKey + '/reset'
        console.log("****DATA: Reset clock " + url)
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            }
        })
    }

    const changeDisplayState = () => {
        const newstate = !displayState
        console.log("DATA:Change display state to " + getStateName(newstate) + " vs " + newstate)

        setDisplayState((prevState) => {
            console.log("DATA: display state changed to "+ getStateName(newstate)+ " vs " + newstate + " vs " + prevState )
            console.log("DATA: Now calling patch clocks with " + !prevState)
            return  newstate
            //return !prevState
        })
        patchClockData({
            isHidden: newstate
         })
        

    }

    const changeRedOverrun = (state) => {
        console.log("red overrun state changed to " + state)
        setRedOverrun(state)
        patchClockData({
            red_overrun: state
         })
        console.log("confirming red overrun state" + state)
    }

    const changeOverrunHandler = (state) => {
        const newstate = !isOverrun
        console.log("DATA: Change Overrun to " + newstate)
        setIsOverrun((prevState) => {
            return newstate
        })
        patchClockData()
    }

    const changeTargetTime = (new_value) => {
        console.log("setting time to " + new_value)
        setTargetTime(new_value)
        patchClockData({
            targetTime: new_value
         })
        console.log("confirming target time " + new_value)
    }

    const startClock = () => {
        console.log("start clock called")
        setClockState("running")
        patchClockData({
            clockState: "running"
         })
        console.log("confirming state" + clockState)
    }

    const pauseClock = () => {
        setClockState("stopped")
        patchClockData({
            clockState: "stopped"
         })
        console.log("pause clock called" + clockState)
    }

    const resetClock = () => {
        console.log("reset clock called")
        postResetClock()
    }

    const changeClockName = (new_name) => {
        console.log("DATA: REQ Clock name changed to" + new_name)
        setClockName(new_name)
        patchClockData({
            name: new_name
         })
        console.log("DATA: Clock name changed to" + clockName)
    }

    const getStateName = (state) => {
        if (state === false) {
            return "isHidden=false + Display Off"
        } else if (state === true) {
            return "isHidden=true + Display On"
        }
    }

    // while turning this on fixes the state propogating, it also breaks the button state
    // if (props.isHidden !== displayState){
    //     setDisplayState(props.isHidden)
    // }

    //SEE WHAT IS HAPPENING HERE
    //console.log(props)
    //console.log("Hide data for clock " + props.id + " is state:" + displayState + " vs prop:" + props.isHidden)

    return (
        <div className="clock-container" id={props.id}>
            <ClockControl
                onStartClock={startClock}
                onResetClock={resetClock}
                onPauseClock={pauseClock}
                onChangeTargetTime={changeTargetTime}
                targetTime={targetTime}
                clockState={clockState}
                isOverrun={props.isOverrun}
                changeRedOverrun={changeRedOverrun}
                red_overrun={red_overrun}
                clockName={clockName}
                onChangeClockName={changeClockName }
                clockType={clockType} />
            <ClockPanel
                onChangeDisplayState={changeDisplayState}
                id={props.id}
                time={secState}
                isHidden={displayState}
                isOverrun={props.isOverrun}
                targetTime={targetTime}
                red_overrun={red_overrun}
                clockType={clockType} />
      </div>
    )
}

export default ClockComponent