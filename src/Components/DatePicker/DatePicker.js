import ReactDatePicker from "react-datepicker"
import "./DatePicker.css"
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker(props){
    return (

        <ReactDatePicker
            className="date-picker-input"
            onChange={(date) => props.onDateChanged(date)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
        />
    )
}