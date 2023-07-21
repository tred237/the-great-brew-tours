export default function formatTime(time) {
    let hour = time.split(':')[0]
    const minutes = time.split(':')[1]
    let newHour
    if(hour > '12') newHour = hour.split('')[1] - 2
    
    if(newHour) return `${newHour}:${minutes} PM MST`
    else if(hour === '12') return `${hour}:${minutes} PM MST`
    else if(['10','11'].includes(hour)) return `${hour}:${minutes} AM MST`
    else if(hour === '00') return `12:${minutes} AM MST`
    else return `${hour.split('')[1]}:${time.split(':')[1]} AM MST`
}