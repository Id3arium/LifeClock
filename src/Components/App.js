import './App.css';
import React, {useState, useEffect} from "react";
import DatePicker from './DatePicker/DatePicker';
import anime from 'animejs';
import ClockCard from './ClockCard/ClockCard';
import * as ch from './ClockHelpers'
function App() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [datePicked, setDatepicked] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    animateTop()
    const interval = setInterval(() => setTime(new Date()), 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
      delay: anime.stagger(1000),
    })
    .add({
      targets: '.top p, .date-picker',
      opacity: [0, 1],
      duration: 750,
      delay: 1250,
    })
  }

  let animateBot = () => { anime.timeline({
    })
    .add({
      duration: anime.stagger(250),
      delay: anime.stagger(250),
      targets: '.mid *',
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
        <ClockCard units={"Seconds"} timePassed={ch.getSeconds(time, birthDate)}/>
        <ClockCard units={"Minutes"} timePassed={ch.getMinutes(time, birthDate)}/>
        <ClockCard units={"Hours"} timePassed={ch.getHours(time, birthDate)}/>
        <ClockCard units={"Days"} timePassed={ch.getDays(time, birthDate)}/>
        <ClockCard units={"Weeks"} timePassed={ch.getWeeks(time, birthDate)}/>
        <ClockCard units={"Months"} timePassed={ch.getMonths(time, birthDate)}/>
        <ClockCard units={"Years"} timePassed={ch.getYears(time, birthDate)}/>
      </div>}

      {datePicked && <div className='bot'>
        <p> Have passed since that day. </p>
        <p> Think of everything you experienced in this time. </p>
        <p> Did things go the way you expected? </p>
        <p> What will you do next? </p>
      </div>}

    </div>
  );
}

export default App;
