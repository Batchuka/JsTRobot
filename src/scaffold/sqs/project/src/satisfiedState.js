// src\scaffold\state\project\src\satisfiedState.js
class SatisfiedState {
    onEntry() {
        console.log("I'm satisfied now. This pizza was delicious!");
    }

    execute() {
        console.log("I'm going to take a nap now.");
    }

    onExit() {
        console.log("Bye.");
    }

    onError(e) {
        console.warn(`It didn't go down well, I think I'm going to vomit: ${e}`);
    }
}

module.exports = SatisfiedState;
