import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./DatePicker.css"

export default function DatePicker(props){
    return (
        <div className="date-picker">
            <Calendar 
                className="centered" 
                onClickDay={e => props.onDateChanged(e)} 
                {...props}
            />
        </div>
    )
}