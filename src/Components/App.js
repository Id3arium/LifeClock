import './App.css';
import React, {useState} from "react";
import DatePicker from './DatePicker/DatePicker';

function App() {
  const [birthDate, setBirthDate] = useState(new Date());
  let getSecondsAlive = () => {
    let seconds = (new Date() - birthDate) / 1000
    return seconds.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } 
  let getMinutesAlive = () => { 
    let minutes = (new Date() - birthDate) / (1000 * 60)
    return minutes.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } 
  let getHoursAlive = () => { 
    let hours = (new Date() - birthDate) / (1000 * 60 * 60) 
    return hours.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } 
  let getDaysAlive = () => { 
    let days = (new Date() - birthDate) / (1000 * 60 * 60 * 24) 
    return days.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } 
  let getWeeksAlive = () => { 
    let weeks = (new Date() - birthDate) / (1000 * 60 * 60 * 24 * 7) 
    return weeks.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  } 
  let getMonthsAlive = (now, birthDate ) => { 
    let months = (now.getFullYear() - birthDate.getFullYear()) * 12
    months += (now.getMonth() - birthDate.getMonth())
    return months.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } 
  let getYearsAlive = () => { 
    let years = (new Date().getFullYear() - birthDate.getFullYear())
    return years
  } 

  let onDateChanged = (date) => { setBirthDate(date) }
  return (
    <div className="App">
      <h1>Life Clock</h1>
      <h2> You can't know for certain when you will die. </h2>
      <h3> But I can show you for how long you've lived. </h3>

      <p>When were you born? </p>
      <DatePicker onDateChanged={onDateChanged} />

      <span>
        <p>How many seconds {getSecondsAlive()} </p>
        <p>How many minutes {getMinutesAlive()} </p>
        <p>How many hours {getHoursAlive()} </p>
        <p>How many days {getDaysAlive()} </p>
        <p>How many weeks {getWeeksAlive()} </p>
        <p>How many months {getMonthsAlive(new Date(), birthDate)} </p>
        <p>How many years {getYearsAlive()}</p>
        <p>Have passed since that day? </p>
      </span>

      <p> Think of all the things that have happened in this time. </p>
      <p> Did things go the way you expected? </p>
      <p> What will you do next? </p>

    </div>
  );
}

export default App;
