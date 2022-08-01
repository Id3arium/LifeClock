import react from "react";

export default function ClockCard({units, timePassed}){
    return (
        <div>
            <p >How many {units}? {timePassed} </p>
        </div>
    )
}