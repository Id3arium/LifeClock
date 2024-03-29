import './App.css';
import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import DatePicker from './DatePicker/DatePicker';
import anime from 'animejs';
import ClockCard from './ClockCard/ClockCard';
import * as ch from './ClockHelpers'

function App() {
  const [birthDate, setBirthDate] = useLocalStorageDate('birthDate');
  const [currTime, setCurrTime] = useState(new Date());
  const footerRef = useRef()
  const clocksRef = useRef()

  let animateIntro = () => { anime.timeline({
      easing: 'linear',
    })
    .add({
      targets: 'h2, h3',
      translateY: [-50,0],
      opacity: [0, 1],
      delay: anime.stagger(2500, {start:1500}),
    })
    .add({
      targets: '.header > p, .date-picker',
      opacity: [0, 1],
      duration: 750,
      delay: 1500,
    })
  }

  let animateContent = () => {anime.timeline({  })
    .add({
      targets: '.cards-wrapper > *',
      duration: anime.stagger(100, {from: 'center', start:250, easing: 'linear'}),
      delay: anime.stagger(100, {from: 'center' , start:250, easing: 'linear'}),
      translateX: [anime.stagger([500,-500]),0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      changeBegin: (anim) => {
        scrollToElement(clocksRef)
      }
    })
    .add({
      targets: '.footer > *',
      translateY: [-25,0],
      opacity: [0, 1],
      delay: anime.stagger(3500, {start:10000}),
      easing: 'easeOutQuad',
      changeBegin: (anim) => {
        scrollToElement(footerRef)
      }
  })}
  
  useEffect(() => {
    if (isValidBirthDate(birthDate)) { 
      animateContent()
    } else {
      animateIntro() 
    }
    const interval = setInterval(() => setCurrTime(new Date()), 10)
    return () => { clearInterval(interval) }
  }, []);

  useLayoutEffect( () => {
    animateContent()
  }, [birthDate])
 
  const scrollToElement = (element) => {
    element.current?.scrollIntoView({ block: "end", behavior: "smooth" })
  }

  return (
    <div className="App" >
      <div className='header' >
        <h1>Life Clock</h1>
        <h2> You can't know for certain when you will die. </h2>
        <h3> But you can certainly know for how long you've lived. </h3>
        <p>When were you born? </p>
        <DatePicker 
          onDateChanged={ (date) => { setBirthDate(date) } } 
          defaultValue={birthDate}
        />
      </div>

      {isValidBirthDate(birthDate) && <div className='cards-wrapper' ref={clocksRef}>
        <ClockCard units={"Seconds"} timePassed={ch.getSeconds(currTime, birthDate)}/>
        <ClockCard units={"Minutes"} timePassed={ch.getMinutes(currTime, birthDate)}/>
        <ClockCard units={"Hours"} timePassed={ch.getHours(currTime, birthDate)}/>
        <ClockCard units={"Days"} timePassed={ch.getDays(currTime, birthDate)}/>
        <ClockCard units={"Weeks"} timePassed={ch.getWeeks(currTime, birthDate)}/>
        <ClockCard units={"Months"} timePassed={ch.getMonths(currTime, birthDate)}/>
        <ClockCard units={"Years"} timePassed={ch.getYears(currTime, birthDate)}/>
      </div>}

      {isValidBirthDate(birthDate) && <div className='footer' ref={footerRef}>
        <p> Have passed since that day. </p>
        <p> Think of everything that happened in this time. </p>
        <p> Did things go the way you expected? </p>
        <p> What will you do next? </p>
      </div>}

    </div>
  );
}

const isValidBirthDate = (birthDate) =>  new Date(birthDate.toDateString()) < new Date(new Date().toDateString()) 

const useLocalStorageDate = (storageKey) => {
  const storedDate = JSON.parse(localStorage.getItem(storageKey))
  const [date, setDate] = React.useState(
    new Date(storedDate ?? new Date())
  );
  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(date));
  }, [date, storageKey]);

  return [date, setDate];
};

export default App;
