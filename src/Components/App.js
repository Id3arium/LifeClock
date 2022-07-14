import './App.css';
import React, {useState} from "react";
import DatePicker from './DatePicker/DatePicker';

function App() {
  const [birthDate, setBirthDate] = useState(new Date());

  function getTimeAlive(date) {
    let now = new Date().now
    console.log()
    let timeAlive = now - date.getTime() 
    return timeAlive
  }

  let onDateChanged = (date) => {
    let timeAlive = getTimeAlive(date)
    console.log("timeAlive",timeAlive)
    setBirthDate(date)
  }
  return (
    <div className="App">
      <h1>Life Clock</h1>
      <p>When were you born?</p>

      <DatePicker onDateChanged={onDateChanged}/>


    </div>
  );
}

export default App;
