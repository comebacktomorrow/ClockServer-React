import React, { useState, useEffect } from 'react';
import './App.css';

import Menu from './components/menu';
import ClockList from './components/clockList';

// const CLOCKS_DATA = [
//   // {
//   //   id: 1,
//   //   name: "First clock",
//   //   target_time: 3000,
//   //   actual_time: 100,
//   //   red_overrun: true,
//   //   type: "Up",
//   //   clockState: true,
//   //   isHidden: true
//   // },
//   // {
//   //   id: 2,
//   //   name: "Second clock",
//   //   target_time: 2000,
//   //   actual_time: 200,
//   //   red_overrun: true,
//   //   type: "Down",
//   //   clockState: true,
//   //   isHidden: false
//   // },
//   // {
//   //   id: 3,
//   //   name: "Third clock",
//   //   target_time: 0,
//   //   actual_time: 0,
//   //   red_overrun: true,
//   //   type: "ToD",
//   //   clockState: true,
//   //   isHidden: true
//   // }
// ]

const EMPTY_CLOCK = {
  id: 5,
  name: "Count Up Clock",
  target_time: 0,
  actual_time: 0,
  red_overrun: true,
  type: "Up",
  clockState: false,
  isHidden: false
}

const EMPTY_TOD_CLOCK = {
  id: 5,
  name: "Timer Clock",
  target_time: 0,
  actual_time: 0,
  red_overrun: true,
  type: "ToD",
  clockState: true,
  isHidden: false
}

const EMPTY_DOWN_CLOCK = {
  id: 5,
  name: "Count Down Clock",
  target_time: 0,
  actual_time: 0,
  red_overrun: true,
  type: "Down",
  clockState: false,
  isHidden: false
}

function App() {
  const [clocksData, setClocks] = useState([''])

  //basic code to get API data
  // fetchClocks().then((d) => {
  //   console.log(d)
  //   //setClocks(d)
  // })

  //basic timer loop
  useEffect(() => {
    let interval = null
    if (true) {
       interval = setInterval(() => {
        fetchClocks().then((d) => {
          //recieved data
          //console.log(d)
          console.log(d[0].isHidden)
          setClocks(d)
        })
       }, 1000);
    } else {
        //clearInterval(interval)
    }
    return () => clearInterval(interval)
   },)

   async function fetchClocks(){
    const response = await fetch('http://localhost:3010/clocks')
    var data = await response.json()
    return data
  }

  // this could be cleaned up a lot .. we could set the type via the type and ditch multiple arrays
  // we also should probably set ID based on the max value, rather than just length
  const generateNewClock = (type) => {
    if (type === "TOD") {
      console.log("######Generating new TOD clock")
      console.log("There are " + clocksData.length + " clocks")
      return { ...EMPTY_TOD_CLOCK, id: clocksData.length+1}
    } else if (type === "Down") {
      console.log("######Generating new Down clock")
      return { ...EMPTY_DOWN_CLOCK, id: clocksData.length+1}
    } else {
      console.log("######Generating new Up clock")
      return { ...EMPTY_CLOCK, id: clocksData.length+1}
    }
  }

  const addClockHandler = (clockType) => {
    setClocks(prevClocks => {
      return [generateNewClock(clockType), ...prevClocks]
    })

    const url = 'http://localhost:3010/clocks/'
        console.log("****APP: ADD clock ")
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: clockType
           })
        })
  }

  return (
    <>
      <Menu onAddClock={addClockHandler}/>
      <ClockList clocks={clocksData} />
    </>
  );
}

export default App;