// src/core/strategy/applicationStrategy.js
const MultithreadManager = require('../feature/multithreadManager');
const SubprocessManager = require('../feature/subprocessManager');

class ApplicationStrategy {
    constructor() {
        if (this.constructor === ApplicationStrategy) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.multithreadManager = new MultithreadManager();
        this.subprocessManager = new SubprocessManager();
    }

    initialize() {
        throw new Error('Method "initialize()" must be implemented.');
    }

    start() {
        throw new Error('Method "start()" must be implemented.');
    }

    stop() {
        throw new Error('Method "stop()" must be implemented.');
    }
}