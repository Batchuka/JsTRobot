// state/baseState.js
const { Singleton } = require('../singleton');
const { logger } = require('../utility/log');

class BaseState extends Singleton {
    constructor(stateMachineOperator) {
        super();
        this.logger = logger;
        this.stateMachineOperator = stateMachineOperator;
        this._status = null;
        this.retryCounter = 3;
        this.reset = false;
    }

    transition(onSuccess = null, onFailure = null) {
        this.stateMachineOperator({ onSuccess, onFailure });
    }

    execute() {
        throw new Error('The "execute" method must be implemented by the subclass.');
    }

    onEntry() {
        throw new Error('The "onEntry" method must be implemented by the subclass.');
    }

    onExit() {
        throw new Error('The "onExit" method must be implemented by the subclass.');
    }

    onError(error) {
        throw new Error('The "onError" method must be implemented by the subclass.');
    }

    _execute() {
        this.execute();
    }

    _onEntry() {
        this.onEntry();
    }

    _onExit() {
        this._status = true;
        this.onExit();
    }

    _onError(error) {
        this._status = false;
        if (this.retryCounter > 0) {
            this.retryCounter -= 1;
            this.logger.warn(`Attempt failed. ${this.retryCounter} attempts remaining.`);
            this.transition(this.constructor.name, null);
        } else {
            this.logger.warn("Maximum number of attempts reached.");
        }
        this.onError(error);
    }
}

module.exports = BaseState;
