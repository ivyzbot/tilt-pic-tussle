class Timers {
    constructor(elem, maxSeconds, timeupFunc) {
        this.elem = elem;
        this.maxSeconds = maxSeconds;
        this.timeupFunc = timeupFunc;
        this.totalTime = maxSeconds * 100;
        this.usedTime = 0;
        this.startTime = new Date(); // current time
        this.setIntervalId = null;

    }

    init() {
        clearInterval(this.setIntervalId);
        this.totalTime = this.maxSeconds * 100; // in 100 milliseconds
        this.elem.innerHTML = `Time Left: ${this.fillZero(this.maxSeconds)}.00`;
        this.usedTime = 0;
        this.startTime = new Date();
        this.setIntervalId = null;
    }

    count() {
        this.usedTime = Math.floor((new Date() - this.startTime) / 10); //round down to 100 milliseconds
        let remainingTime = this.totalTime - this.usedTime;
        if (remainingTime <= 0) {
            this.elem.innerHTML = 'Time Left: 00.00';
            clearInterval(this.setIntervalId);
            this.timeupFunc();
        } else {
            let seconds = Math.floor(remainingTime / 100);
            let milliseconds = remainingTime - seconds * 100;

            // console.log(this);
            this.elem.innerHTML = `Time Left: ${this.fillZero(seconds)}.${this.fillZero(milliseconds)}`;
        }
    }

    start() {
        if (!this.setIntervalId) {
            // console.log(this);
            this.setIntervalId = setInterval(this.count.bind(this), 1);
        }

    }

    stop() {
        console.log(`usedTime = ${this.usedTime}`);
        if (this.setIntervalId) {
            clearInterval(this.setIntervalId);
        }
    }
    
    fillZero(time) {
        return(time < 10 ? `0${time}` : time);
    }

    getUsedTime() {
        let seconds = Math.floor(this.usedTime / 100);
        let milliseconds = this.usedTime - seconds * 100;
        return(`${seconds}.${milliseconds}`);
    }

}

export default Timers;