// state/privateStates.js
const BaseState = require('./baseState');
const MultithreadManager = require('../feature/multithreadManager');
const SubprocessManager = require('../feature/subprocessManager');

class FinisherState extends BaseState {
    execute() { }

    onEntry() {
        this.multithreadManager = new MultithreadManager();
        this.subprocessManager = new SubprocessManager();
    }

    onExit() {
        this.multithreadManager.listActiveThreads();
        this.subprocessManager.listActiveProcesses();
        process.exit();
    }

    onError() {
        process.exit(1);
    }
}

class StarterState extends BaseState {
    execute() { }
    onEntry() { }
    onExit() { }
    onError() { }
}

module.exports = { FinisherState, StarterState };
