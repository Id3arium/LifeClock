export let formatNum = (num, fixed=1) => num.toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export let getSeconds = (now, birthDate) => {
    let seconds = (now - birthDate) / 1000
    return formatNum(seconds,2)
} 
export let getMinutes = (now, birthDate) => { 
    let minutes = (now - birthDate) / (1000 * 60)
    return formatNum(minutes)
} 
export let getHours = (now, birthDate) => { 
    let hours = (now - birthDate) / (1000 * 60 * 60) 
    return formatNum(hours)
} 
export let getDays = (now, birthDate) => { 
    let days = (now - birthDate) / (1000 * 60 * 60 * 24) 
    return formatNum(days)
} 
export let getWeeks = (now, birthDate) => { 
    let weeks = (now - birthDate) / (1000 * 60 * 60 * 24 * 7) 
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