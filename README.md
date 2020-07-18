# fluent-timer
write timers as you pronounce them (setTimeout)

example:
after(1).seconds.run(() => {
    console.log('this is after one second');
})
.then.after(0.5).minutes.run(() => {
    console.log('this is after half a minute and one second');
});
