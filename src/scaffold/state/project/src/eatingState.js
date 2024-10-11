// src\scaffold\state\project\src\eatingState.js
const Pizza = require('./pizza');
const time = require('timers/promises');

class EatingState {
    onEntry() {
        console.log("Finally the pizza arrived. Time to eat!");
        this.pizza = new Pizza();
    }

    async execute() {
        // Comer pizza até que todas as fatias sejam consumidas
        while (this.pizza.totalSlices !== this.pizza.slicesEaten) {
            this.pizza.eatSlice();
            console.log(`I ate a slice of pizza. Total slices eaten: ${this.pizza.slicesEaten}`);
            await time.setTimeout(1000); // Simula o tempo gasto para comer cada fatia
        }
    }

    onExit() {
        if (this.pizza.slicesEaten === 8) {
            this.transition('SatisfiedState');
        } else if (this.pizza.slicesEaten > 8) {
            console.log("I ate too much pizza.");
            this.transition('DeadState');
        } else if (this.pizza.slicesEaten < 8) {
            console.log("I ran out of pizza but I'm still hungry.");
            this.transition('DeadState');
        } else {
            throw new Error("Unexpected state");
        }
    }

    onError(e) {
        console.error(`I choked while eating: ${e}`);
    }
}

module.exports = EatingState;
