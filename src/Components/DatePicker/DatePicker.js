import "./DatePicker.css"

export default function DatePicker(props){
    return (<DatePicker
        className="date-picker-input"
        onChange={(date) => props.onDateChanged(date)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
    />)
}