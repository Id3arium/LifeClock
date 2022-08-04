import './App.css';
import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import DatePicker from './DatePicker/DatePicker';
import anime from 'animejs';
import ClockCard from './ClockCard/ClockCard';
import * as ch from './ClockHelpers'
function App() {
  const [birthDate, setBirthDate] = useState(undefined);
  const [time, setTime] = useState(new Date());
  const footerRef = useRef()

  useEffect(() => {
    const birthDate = localStorage.getItem('birthDate')
    //setBirthDate( birthDate ? birthDate : undefined )
    if (!birthDate) { animateIntro() }
    const interval = setInterval(() => setTime(new Date()), 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useLayoutEffect( () => {
    //localStorage.setItem('birthDate', JSON.stringify(birthDate))
    if (birthDate) { 
      anime.timeline({  })
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
      })
    } 
  }, [birthDate])
  
  const scrollToFooter = () => {
    console.log("scrolling to bottom")
    footerRef.current?.scrollIntoView({ block: "end", behavior: "smooth" })
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

  let onDateChanged = (date) => { 
    setBirthDate(date)
  }
  return (
    <div className="App" >
      
      <div className='header' >
        <h1>Life Clock</h1>
        <h2> You can't know for certain when you will die. </h2>
        <h3> But you can certainly know for how long you've lived. </h3>
        <p>When were you born? </p>
        <DatePicker onDateChanged={onDateChanged} />
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
