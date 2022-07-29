export let formatNum = (num) => num.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export let getSeconds = (birthDate) => {
    let seconds = (new Date() - birthDate) / 1000
    return formatNum(seconds)
} 
export let getMinutes = (birthDate) => { 
    let minutes = (new Date() - birthDate) / (1000 * 60)
    return formatNum(minutes)
} 
export let getHours = (birthDate) => { 
    let hours = (new Date() - birthDate) / (1000 * 60 * 60) 
    return formatNum(hours)
} 
export let getDays = (birthDate) => { 
    let days = (new Date() - birthDate) / (1000 * 60 * 60 * 24) 
    return formatNum(days)
} 
export let getWeeks = (birthDate) => { 
    let weeks = (new Date() - birthDate) / (1000 * 60 * 60 * 24 * 7) 
    return formatNum(weeks)

} 
export let getMonths = (now, birthDate ) => { 
    let months = (now.getFullYear() - birthDate.getFullYear()) * 12
    months += (now.getMonth() - birthDate.getMonth())
    return formatNum(months)
} 
export let getYears = (birthDate) => { 
    let years = (new Date().getFullYear() - birthDate.getFullYear())
    return years
} 

export * from "./ClockHelpers.js"