//returns time as relative to its duration
//direction "down" (or not up) returns as a count down to zero, then past zero as overrun
function logTime(time, duration, direction) {
    let sectime = 0
    //let overrun = false
    if (direction === "up") {
        sectime = time - 1
    } else if (duration !== undefined) {
        sectime = duration-time + 1
    } else {
        return time
    }
    return sectime
}

//convert time from seconds and return as H:M:S string
//force always disables dropping hour flag when > 1hr
function convertToHMS(seconds, force = false) {
    //const pad = force
    let value = seconds
    let flip = ''
    let hour = Math.floor(Math.abs(value)/3600)

    let min = Math.floor(Math.abs(value)/60)
    min %= 60
    let sec = Math.abs(value)
    sec %= 60

    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    //if time is negative, flip the most signficiant value
    if (Math.sign(value) === -1) {
        flip = '-'
    } else {
        flip = ''
    }
    
    if(hour > 0 || force === true ){
        return [flip + hour, min, sec]
    } else {
        return [ "" , flip + min , sec]
    }
}

//convert HMS to seconds
function convertToSeconds(HMS) {
    var time = HMS
    time = time.split(':')

    let hours = (+time[0]) * 3600
    let min = (+time[1]) * 60
    let sec = (+time[2])

    time = hours + min + sec
    return time

}

module.exports = {
    logTime: logTime,
    convertToHMS: convertToHMS,
    convertToSeconds: convertToSeconds
}