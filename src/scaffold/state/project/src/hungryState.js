// src\scaffold\state\project\src\hungryState.js
const time = require('timers/promises');

class HungryState {
    onEntry() {
        console.log("I am hungry!");
    }

    execute() {
        console.log("If I don't eat anything soon, I'm going to die.");
        this.timeToDie();
    }

    onExit() {
        console.log("I'm going to order pizza.");
    }

    async timeToDie() {
        const timeLimit = 30;  // Tempo limite até o robô morrer de fome
        let elapsedTime = 0;

        while (elapsedTime < timeLimit) {
            await time.setTimeout(1000);
            elapsedTime += 1;
            console.log(`Time remaining: ${timeLimit - elapsedTime} seconds`);
        }

        // Se o tempo limite for atingido, transição para o estado "Dead"
        console.log("Too much time without pizza. I'm dead.");
        this.transition('DeadState');
    }

    onError(e) {
        console.error("I don't know how to order a pizza... it seems like it's the end of me.");
    }
}

module.exports = HungryState;
