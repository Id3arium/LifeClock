import React from "react";
import "./ClockCard.css"

export default function ClockCard({units, timePassed}){
    return (
        <div className="clock-card">
            <h1 > {timePassed} </h1>
            <p > {units} </p>
        </div>
    )
}