import './App.css';
import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import DatePicker from './DatePicker/DatePicker';
import anime from 'animejs';
import ClockCard from './ClockCard/ClockCard';
import * as ch from './ClockHelpers'

const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

function App() {
  const [birthDate, setBirthDate] = useLocalStorage('birthDate', new Date());
  const [currTime, setCurrTime] = useState(new Date());
  const footerRef = useRef()
  
  const bDay = JSON.parse(localStorage.getItem('birthDate'))
  let onDateChanged = (date) => { 
    localStorage.setItem('birthDate', JSON.stringify(date))
    setBirthDate(date)
  }

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
  
  useEffect(() => {
    const interval = setInterval(() => setCurrTime(new Date()), 10);
    console.log("bDay",bDay)
    if (!bDay) { 
      animateIntro() 
    } else {
      animateContent()
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  useLayoutEffect( () => {
    if (birthDate) animateContent()
  }, [birthDate])
 
  const scrollToFooter = () => {
    console.log("scrolling to bottom")
    footerRef.current?.scrollIntoView({ block: "end", behavior: "smooth" })
  }

  let animateContent = () => {anime.timeline({  })
    .add({
      targets: '.cards-wrapper > *',
      duration: anime.stagger(100, {from: 'center', start:250, easing: 'linear'}),
      delay: anime.stagger(100, {from: 'center' , start:250, easing: 'linear'}),
      translateX: [anime.stagger([500,-500]),0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
    })
    .add({
      targets: '.footer > *',
      translateY: [-25,0],
      opacity: [0, 1],
      delay: anime.stagger(3500, {start:10000}),
      easing: 'easeOutQuad',
      changeBegin: (anim) => {
        scrollToFooter()
    }
  })}

  return (
    <div className="App" >
      
      <div className='header' >
        <h1>Life Clock</h1>
        <h2> You can't know for certain when you will die. </h2>
        <h3> But you can certainly know for how long you've lived. </h3>
        <p>When were you born? </p>
        <DatePicker 
          onDateChanged={onDateChanged} 
          defaultActiveStartDate={bDay ? new Date(bDay) : new Date()}
        />
      </div>

      {birthDate && <div className='cards-wrapper'>
        <ClockCard units={"Seconds"} timePassed={ch.getSeconds(currTime, birthDate)}/>
        <ClockCard units={"Minutes"} timePassed={ch.getMinutes(currTime, birthDate)}/>
        <ClockCard units={"Hours"} timePassed={ch.getHours(currTime, birthDate)}/>
        <ClockCard units={"Days"} timePassed={ch.getDays(currTime, birthDate)}/>
        <ClockCard units={"Weeks"} timePassed={ch.getWeeks(currTime, birthDate)}/>
        <ClockCard units={"Months"} timePassed={ch.getMonths(currTime, birthDate)}/>
        <ClockCard units={"Years"} timePassed={ch.getYears(currTime, birthDate)}/>
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
