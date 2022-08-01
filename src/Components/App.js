import './App.css';
import React, {useState, useEffect} from "react";
import DatePicker from './DatePicker/DatePicker';
import anime from 'animejs';
import * as ch from './ClockHelpers'
function App() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [datePicked, setDatepicked] = useState(false);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    animateTop()
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect( () => {
  }, [])

  useEffect( () => {
    if (datePicked) { animateBot() }
  }, [datePicked])

  let animateTop = () => { anime.timeline({
      easing: 'linear',
    })
    .add({
      targets: 'h1, h2, h3',
      translateY: [-50,0],
      opacity: [0, 1],
      delay: anime.stagger(2500),
    })
    .add({
      targets: '.top p, .date-picker',
      opacity: [0, 1],
      duration: 750,
      delay: 1500,
    })
  }

  let animateBot = () => { anime.timeline({
    })
    .add({
      duration: anime.stagger(250),
      delay: anime.stagger(250),
      targets: '.mid > *',
      translateX: [-150,0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
    })
    .add({
      targets: '.bot > *',
      translateY: [-25,0],
      opacity: [0, 1],
      delay: anime.stagger(5000),
      easing: 'easeOutQuad'
    })
  }

  

  let onDateChanged = (date) => { 
    setBirthDate(date)
    animateBot()
    if (!datePicked) { setDatepicked(true) }
  }
  return (
    <div className="App">
      
      <div className='top' >
        <h1>Life Clock</h1>
        <h2> You can't know for certain when you will die. </h2>
        <h3> But I can show you for how long you've lived. </h3>
        <p>When were you born? </p>
        <DatePicker onDateChanged={onDateChanged} />
      </div>

      {datePicked && <div className='mid'>
        <p >How many seconds? {ch.getSeconds(time, birthDate)} </p>
        <p >How many minutes? {ch.getMinutes(time, birthDate)} </p>
        <p >How many hours? {ch.getHours(time, birthDate)} </p>
        <p >How many days? {ch.getDays(time, birthDate)} </p>
        <p >How many weeks? {ch.getWeeks(time, birthDate)} </p>
        <p >How many months? {ch.getMonths(time, birthDate)} </p>
        <p >How many years? {ch.getYears(time, birthDate)}</p>
      </div>}

      {datePicked && <div className='bot'>
        <p> Have passed since that day? </p>
        <p> Think of all the things that have happened in this time. </p>
        <p> Did things go the way you expected? </p>
        <p> What will you do next? </p>
      </div>}

    </div>
  );
}

export default App;
