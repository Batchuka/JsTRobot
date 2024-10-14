// src\scaffold\state\project\src\deadState.js


class DeadState {
    onEntry() {
        console.log("It was a long wait without pizza...");
    }

    execute() {
        console.log('The robot died of hunger.');
    }

    onExit() {
        // Nada acontece depois deste estado, o robô está morto
    }

    onError(e) {
        // Nada acontece depois deste estado, o robô está morto
    }
}

module.exports = DeadState;
