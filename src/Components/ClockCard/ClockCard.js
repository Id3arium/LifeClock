import React from "react";
import "./ClockCard.css"

export default function ClockCard({units, timePassed}){
    return (
        <div className="clock-card">
            <p >How many {units}? {timePassed} </p>
        </div>
    )
}