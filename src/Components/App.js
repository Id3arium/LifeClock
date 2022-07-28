import './App.css';
import React, {useState, useRef, useEffect} from "react";
import DatePicker from './DatePicker/DatePicker';
import Anime, {anime as reactAanime} from 'react-anime';
import anime from 'animejs';
function App() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [datePicked, setDatepicked] = useState(false);
  let formatNum = (num) => num.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const animation = useRef(null);

  animation.current = anime({
    targets: '.clocks p',
    opacity: [0, 1],
    loop: true,
    delay: anime.stagger(500),
    duration: anime.stagger(1000),
    easing: 'easeOutBack'
  })

  useEffect( () => {
    console.log("animation starting")
    console.log("animation",animation.current)
    console.log("animation ending?")
  }, [])

  let getSecondsAlive = () => {
    let seconds = (new Date() - birthDate) / 1000
    return formatNum(seconds)
  } 
  let getMinutesAlive = () => { 
    let minutes = (new Date() - birthDate) / (1000 * 60)
    return formatNum(minutes)
  } 
  let getHoursAlive = () => { 
    let hours = (new Date() - birthDate) / (1000 * 60 * 60) 
    return formatNum(hours)
  } 
  let getDaysAlive = () => { 
    let days = (new Date() - birthDate) / (1000 * 60 * 60 * 24) 
    return formatNum(days)
  } 
  let getWeeksAlive = () => { 
    let weeks = (new Date() - birthDate) / (1000 * 60 * 60 * 24 * 7) 
    return formatNum(weeks)

  } 
  let getMonthsAlive = (now, birthDate ) => { 
    let months = (now.getFullYear() - birthDate.getFullYear()) * 12
    months += (now.getMonth() - birthDate.getMonth())
    return formatNum(months)
  } 
  let getYearsAlive = () => { 
    let years = (new Date().getFullYear() - birthDate.getFullYear())
    return years
  } 

  let onDateChanged = (date) => { 
    setBirthDate(date)
    if (!datePicked) { setDatepicked(true) }
  }
  return (
    <div className="App">
      <Anime 
        opacity={[0, 1]}
        delay={reactAanime.stagger(100)}
        duration={(e, i) => i < 3 ? 1000 : 10}
        easing='linear'
      >
        <h1>Life Clock</h1>
        <h2> You can't know for certain when you will die. </h2>
        <h3> But I can show you for how long you've lived. </h3>

        <p>When were you born? </p>
        <DatePicker onDateChanged={onDateChanged} />
      </Anime>

      {datePicked && <Anime 
        opacity={[0, 1]}
        delay={(e, i) => i < 7 ? 500: 3000}
        duration={(e, i) => i < 7 ? 500: 3000}
        easing='easeInCubic'
      >
          <p className='seconds'>How many seconds? {getSecondsAlive()} </p>
          <p className='minutes'>How many minutes? {getMinutesAlive()} </p>
          <p className='hours'>How many hours? {getHoursAlive()} </p>
          <p className='days'>How many days? {getDaysAlive()} </p>
          <p className='weeks'>How many weeks? {getWeeksAlive()} </p>
          <p className='months'>How many months? {getMonthsAlive(new Date(), birthDate)} </p>
          <p className='years'>How many years? {getYearsAlive()}</p>
          <p className='since'>Have passed since that day? </p>

          <p> Think of all the things that have happened in this time. </p>
          <p> Did things go the way you expected? </p>
          <p> What will you do next? </p>
      </Anime>}
      
    </div>
  );
}

export default App;
