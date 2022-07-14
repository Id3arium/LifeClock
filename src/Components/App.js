import './App.css';
import React, {useState} from "react";
import DatePicker from './DatePicker/DatePicker';

function App() {
  const [birthDate, setBirthDate] = useState(new Date());

  function getTimeAlive(date) {
    let birthDate = date.getTime() 
    console.log(birthDate)
    let timeAlive = Date.now() - date.getTime() 
    return timeAlive
  }

  let onDateChanged = (date) => {
    console.log("date",date)
    let timeAlive = getTimeAlive(date)
    console.log("timeAlive",timeAlive)
    setBirthDate(date)
  }
  return (
    <div className="App">
      <h1>Life Clock</h1>
      <h2> You can't know for certain when you will die. </h2>
      <h3> But I can show you for how long you've lived. </h3>
      
      <span>
        <p>How many seconds</p>
        <p>How many minutes</p>
        <p>How many hours</p>
        <p>How many days</p>
        <p>How many weeks</p>
        <p>How many months</p>
        <p>How many years</p>
        <p>Have passed since that day? </p>
      </span>

      <p> Think of all the things that have happened in this time. </p>
      <p> Did things go the way you expected? </p>
      <p> What will you do next? </p>

    </div>
  );
}

export default App;
