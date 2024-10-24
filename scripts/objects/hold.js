// note.js
export class Hold {
    constructor(type, position, delay, holdDuration = 0) {
        this.type = type;
        this.position = position;
        this.delay = delay;
        this.holdDuration = holdDuration;
        this.isHolding = type === "hold";
        this.holdEndTime = this.isHolding ? Date.now() + holdDuration : null;
    }
}
