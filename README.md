# fluent-timer
> write timers as you pronounce them (setTimeout) and create chain of time-based events

example:
```javascript
after(1).seconds.run(() => {
    console.log('this is after one second');
})
.then.after(0.5).minutes.run(() => {
    console.log('this is after half a minute and one second');
});
```
this is equal to:
```javascript
setTimeout(() => {
    console.log('this is after one second');
    setTimeout(() => {
        console.log('this is after half a minute and one second');
    }, 30000);
}, 1000);
```
---
you can stop chain of time events using stop:
```javascript
let timer = after(1).seconds.run(() => {
    console.log('this is after one second');
})
.then.after(0.5).minutes.run(() => {
    console.log('this is after half a minute and one second');
});

timer.stop(); //this will stop all the chained functions
```
---
you can start the event chain with `now` to begin with immediate code
```javascript
now.run(() => {
    console.log('this will run now');
})
.then.after(1).seconds.run(() => {
    console.log('this will run after 1 second');
});
```
## Pass parameters

> pass parameters as an array to the run function

after(1).seconds.run((text) => {
    console.log(text, ' after one second');
}, \[a]);
```
