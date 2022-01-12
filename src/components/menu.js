
import React from "react";
import './menu.css'

const Menu = (props) => {

const addUpClockHandler = (event) => {
  console.log("GUI: Add up clock")
  props.onAddClock("Up")
}

const addDownClockHandler = (event) => {
  console.log("GUI: Add down clock")
  props.onAddClock("Down")
}

const addToDClockHandler = (event) => {
  console.log("GUI: Add TOD clock")
  props.onAddClock("ToD")
}

    return (
        <div className="menu-container">
          <div>Create:</div>
          <button className="flat" onClick={addUpClockHandler}>Up</button>
          <button className="flat" onClick={addDownClockHandler}>Down</button>
          <button className="flat" onClick={addToDClockHandler}>Time</button>
      </div>
    )
}

export default Menu