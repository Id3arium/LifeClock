import logo from './logo.svg';
import './App.css';
import React,{useState} from "react"
import DatePicker from './DatePicker/DatePicker';

function App() {
  const [birthDate, setBirthDate] = useState(new Date());

  function getTimeAlive(date) {
    let now = new Date().now
    let timeAlive = now - date.getTime() 
    return timeAlive
  }

  let onDateChanged = (e) => {
    let date = e.target.value
    let timeAlive = getTimeAlive(date)
    console.log(timeAlive)

  }
  return (
    <div className="App">
      <h1>Life Clock</h1>
      <p>When were you born?</p>

      <DatePicker onDateChanged={setBirthDate}/>
      {birthDate}

    </div>
  );
}

export default App;
