import logo from './logo.svg';
import './App.css';
import React,{useState} from "react"
import DatePicker from 'react-datepicker';

function App() {
  const [birthDate, setBirthDate] = useState(new Date());

  let onDateChanged = (e) => {
    console.log(e.target.value)
  }
  let datePicker = <input type='date' onChange={onDateChanged}></input>
  return (
    <div className="App">
      <h1>Life Clock</h1>
      <p>When were you born?</p>

      <DatePicker
        onChange={(date) => setBirthDate(date)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />

    </div>
  );
}

export default App;
