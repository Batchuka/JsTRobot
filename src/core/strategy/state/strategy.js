// state/stateStrategy.js
const ApplicationStrategy = require('../core/applicationStrategy');
const StateManager = require('./stateManager');
const StateRegistry = require('./stateRegistry');

class StateStrategy extends ApplicationStrategy {
    constructor() {
        super();
        this.stateManager = null;
    }

    initialize() {
        const stateRegistry = new StateRegistry();
        this.stateManager = new StateManager(stateRegistry);
    }

    start() {
        this.multithreadManager.newThread(() => this.stateManager.run());
    }

    stop() {
        this.multithreadManager.stopThread(() => this.stateManager.run());
    }
}

module.exports = StateStrategy;
