import './App.css';
import React, {useState, useEffect} from "react";
import DatePicker from './DatePicker/DatePicker';
import anime from 'animejs';
import * as ch from './ClockHelpers'
function App() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [datePicked, setDatepicked] = useState(false);

  let animateTop = () => { anime.timeline({
      targets: '.top > *',
      translateY: [-50,0],
      opacity: [0, 1],
      delay: anime.stagger(1000),
      duration: 2000,
      easing: 'easeOutQuad'
    })
  }
  let animateMid = () => { anime({
      targets: '.mid > *',
      translateX: [-150,0],
      opacity: [0, 1],
      duration: anime.stagger(750),
      easing: 'linear'
    })
  }

  let animateBot = () => { anime({
      targets: '.mid',
      translateX: [-150,0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 750,
      easing: 'easeOutQuad'
    })
  }

  useEffect( () => {
    animateTop()
  }, [])

  useEffect( () => {
    if (datePicked) { animateMid() }
  }, [datePicked])

  let onDateChanged = (date) => { 
    setBirthDate(date)
    animateMid()
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
        <p className='seconds'>How many seconds? {ch.getSeconds(birthDate)} </p>
        <p className='minutes'>How many minutes? {ch.getMinutes(birthDate)} </p>
        <p className='hours'>How many hours? {ch.getHours(birthDate)} </p>
        <p className='days'>How many days? {ch.getDays(birthDate)} </p>
        <p className='weeks'>How many weeks? {ch.getWeeks(birthDate)} </p>
        <p className='months'>How many months? {ch.getMonths(new Date(), birthDate)} </p>
        <p className='years'>How many years? {ch.getYears(birthDate)}</p>
      </div>}

      <div className='bot'>
        <p> Have passed since that day? </p>
        <p> Think of all the things that have happened in this time. </p>
        <p> Did things go the way you expected? </p>
        <p> What will you do next? </p>
      </div>

    </div>
  );
}

export default App;
