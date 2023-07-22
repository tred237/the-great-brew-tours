const withSeconds = (hour, minutes, seconds, newHour) => {
    if(newHour) return `${newHour}:${minutes}:${seconds} PM MST`
    else if(hour === '12') return `${hour}:${minutes}:${seconds} PM MST`
    else if(['10','11'].includes(hour)) return `${hour}:${minutes}:${seconds} AM MST`
    else if(hour === '00') return `12:${minutes}:${seconds} AM MST`
    else return `${hour.split('')[1]}:${minutes}:${seconds} AM MST`
}

const withOutSeconds = (hour, minutes, newHour) => {
    if(newHour) return `${newHour}:${minutes} PM MST`
    else if(hour === '12') return `${hour}:${minutes} PM MST`
    else if(['10','11'].includes(hour)) return `${hour}:${minutes} AM MST`
    else if(hour === '00') return `12:${minutes} AM MST`
    else return `${hour.split('')[1]}:${minutes} AM MST`
}

export default function formatTime(time, seconds = false) {
    console.log(time.split(':')[2].split('.')[0])
    let hour = time.split(':')[0]
    const minutes = time.split(':')[1]
    let newHour
    if(hour > '12') newHour = hour.split('')[1] - 2
    
    if(seconds) return withSeconds(time, hour, minutes, time.split(':')[2].split('.')[0], newHour)
    else return withOutSeconds(time, hour, minutes, newHour)
    // if(newHour) return `${newHour}:${minutes} PM MST`
    // else if(hour === '12') return `${hour}:${minutes} PM MST`
    // else if(['10','11'].includes(hour)) return `${hour}:${minutes} AM MST`
    // else if(hour === '00') return `12:${minutes} AM MST`
    // else return `${hour.split('')[1]}:${time.split(':')[1]} AM MST`
}