// src/core/strategy/applicationStrategy.js
import MultiThreadManager from '../feature/multiThread.js';
import SubProcessManager from '../feature/subProcess.js';

export default class ApplicationStrategy {
    constructor() {
        if (this.constructor === ApplicationStrategy) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.multiThreadManager = new MultiThreadManager();
        this.subProcessManager = new SubProcessManager();
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