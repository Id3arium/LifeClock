import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function DatePicker(props){
    let style = {margin:""}
    return (
        <Calendar onClickDay={e => props.onDateChanged(e)} />
    )
}