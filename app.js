
/**
 * Fluent Timer
 * 
 * @author Moumen Alnemrat <momen.nemrat@gmail.com>
 */

const TimesInMilliSeconds = {
    seconds: 1000,
    minutes: 60000
}

/**
 * start of timer chain
 * @param {number} time
 * @example
 * after(1).seconds.run(() => {
 *  console.log('hello');
 * });
 * //this is equal to:
 * setTimeout(() => {
 *  console.log('hello');
 * }, 1000);
 * 
 * you can chain events, like:
 * after(1).seconds.run(() => {
 *  showSomething();
 * })
 * .then.after(1).seconds.run(() => {
 *  hideThatthing();
 * });
 */
const after = (time) => {
    return innerAfter(time);
}

const innerAfter = (time, initialTime, timersIds) => {
    initialTime = initialTime || 0;
    timersIds = timersIds || []

    return {
        seconds: timeMultiplier(time, TimesInMilliSeconds.seconds, initialTime, timersIds),
        minutes: timeMultiplier(time, TimesInMilliSeconds.minutes, initialTime, timersIds),
    }
}

const timeMultiplier = (time, multiplayer, initialTime, timersIds) => {
    const combinedTimeInMilliSeconds = CalculateRealNumberOfMilliSeconds(time, multiplayer) + initialTime;

    return {
        run: (fn, parameters) => {
            return innerRun(combinedTimeInMilliSeconds, fn, parameters, timersIds);
        }
    }
}

const innerRun = (timeInMilliSeconds, fn, parameters, timersIds) => {
    if(typeof fn != 'function'){
        throw new Error('please provide a function to run');
    }
    if(parameters != undefined && !Array.isArray(parameters)){
        throw new Error('please pass function parameters as array');
    }
    timersIds.push(setTimeout(() => {
        if(fn != null){
            if(parameters != undefined){
                fn(... parameters);
            } else {
                fn();
            }
        }
    }, timeInMilliSeconds));
    
    return {
        then: {
            after: (time) => {
                return innerAfter(time, timeInMilliSeconds, timersIds);
            }
        },
        stop: () => {
            timersIds.forEach(timerId => clearTimeout(timerId))
        }
    }
}

const now = {
    run: (fn, parameters) => {
        return innerRun(0, fn, parameters, []);
    }
}

export {
    after,
    now
};


const CalculateRealNumberOfMilliSeconds = (time, multiplayer) => {
    return Math.floor(time * multiplayer);
}