import './App.css';
import React, {useState} from "react";
import DatePicker from './DatePicker/DatePicker';

function App() {
  const [birthDate, setBirthDate] = useState(Date.now());

  let getSecondsAlive = () => {return (new Date.now - birthDate) / 1000} 
  let getMinutesAlive = () => { 
    return (Date.now() - birthDate) / (1000 * 60) 
  } 
  let getHoursAlive = () => { 
    return (Date.now() - birthDate) / (1000 * 60 * 60) 
  } 
  let getDaysAlive = () => { 
    return (Date.now() - birthDate) / (1000 * 60 * 60 * 24) 
  } 
  let getWeeksAlive = () => { 
    return (Date.now() - birthDate) / (1000 * 60 * 60 * 24 * 7) 
  } 
  let getMonthsAlive = () => { 
    let months = (Date.now().getFullYear() - birthDate.getFullYear()) * 12
    months -= birthDate.getMonth() + 1
    months += Date.now().getMonth()
    return months
  } 
  let getYearsAlive = () => { 
    let years = (Date.now().getFullYear() - birthDate.getFullYear())
    return years
  } 

  let onDateChanged = (date) => { setBirthDate(date) }
  return (
    <div className="App">
      <h1>Life Clock</h1>
      <h2> You can't know for certain when you will die. </h2>
      <h3> But I can show you for how long you've lived. </h3>

      <p>whaen were you born? </p>

      <DatePicker onDateChanged={onDateChanged} />
      <span>
        <p>How many seconds {getSecondsAlive(birthDate)} </p>
        <p>How many minutes {getMinutesAlive(birthDate)} </p>
        <p>How many hours {getHoursAlive(birthDate)} </p>
        <p>How many days {getDaysAlive(birthDate)} </p>
        <p>How many weeks {getWeeksAlive(birthDate)} </p>
        <p>How many months {getMonthsAlive(birthDate)} </p>
        <p>How many years {getYearsAlive(birthDate)}</p>
        <p>Have passed since that day? </p>
      </span>

      <p> Think of all the things that have happened in this time. </p>
      <p> Did things go the way you expected? </p>
      <p> What will you do next? </p>

    </div>
  );
}

export default App;
