import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./DatePicker.css"

export default function DatePicker(props){
    return (
        <Calendar className="centered" onClickDay={e => props.onDateChanged(e)} />
    )
}