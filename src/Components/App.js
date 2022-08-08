import './App.css';
import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import DatePicker from './DatePicker/DatePicker';
import ClockCard from './ClockCard/ClockCard';
import * as ch from './ClockHelpers'
import {animateIntro, animateContent} from "./Animations"

function App() {
  const [birthDate, setBirthDate] = useState(undefined);
  const [time, setTime] = useState(new Date());
  const footerRef = useRef()
  
  let scrollToElement = (elementRef) => {
    elementRef.current?.scrollIntoView({ block: "end", behavior: "smooth" })
  }

  const bDay = JSON.parse(localStorage.getItem('birthDate'))
  if (!bDay) { 
    let introAnimation = animateIntro() 
    introAnimation.play()
  } else {
    let contentAnimation = animateContent(scrollToElement, footerRef)
  }

  let onDateChanged = (date) => { 
    localStorage.setItem('birthDate', JSON.stringify(date))
    setBirthDate(date)
  }
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 10);
    console.log("bDay",bDay)

    return () => {
      clearInterval(interval);
    };
  }, []);

  useLayoutEffect( () => {
    if (birthDate) animateContent()
  }, [birthDate])

  return (
    <div className="App" >
      
      <div className='header' >
        <h1>Life Clock</h1>
        <h2> You can't know for certain when you will die. </h2>
        <h3> But you can certainly know for how long you've lived. </h3>
        <p>When were you born? </p>
        <DatePicker 
          onDateChanged={onDateChanged} 
        />
      </div>

      {birthDate && <div className='cards-wrapper'>
        <ClockCard units={"Seconds"} timePassed={ch.getSeconds(time, birthDate)}/>
        <ClockCard units={"Minutes"} timePassed={ch.getMinutes(time, birthDate)}/>
        <ClockCard units={"Hours"} timePassed={ch.getHours(time, birthDate)}/>
        <ClockCard units={"Days"} timePassed={ch.getDays(time, birthDate)}/>
        <ClockCard units={"Weeks"} timePassed={ch.getWeeks(time, birthDate)}/>
        <ClockCard units={"Months"} timePassed={ch.getMonths(time, birthDate)}/>
        <ClockCard units={"Years"} timePassed={ch.getYears(time, birthDate)}/>
      </div>}

      {birthDate && <div className='footer' ref={footerRef}>
        <p> Have passed since that day. </p>
        <p> Think of everything you've experienced in this time. </p>
        <p> Did things go the way you expected? </p>
        <p> What will you do next? </p>
      </div>}

    </div>
  );
}

export default App;
