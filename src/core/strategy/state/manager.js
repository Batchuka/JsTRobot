// state/stateManager.js
const { logger } = require('../utility/log');
const StateRegistry = require('./stateRegistry');

class StateManager {
    constructor(stateRegistry) {
        this.stateRegistry = stateRegistry;
        this.stateRegistry.updateStateOperator(this.stateMachineOperator.bind(this));
        this.logger = logger;
        const starterStateInfo = this.stateRegistry.getStateInfo('_StarterState');
        this.currentState = starterStateInfo ? starterStateInfo.instance : null;
        this.nextStateOnSuccess = null;
        this.nextStateOnFailure = null;
    }

    stateMachineOperator({ onSuccess = null, onFailure = null }) {
        if (onSuccess) {
            const successStateInfo = this.stateRegistry.getStateInfo(onSuccess);
            if (!successStateInfo) {
                throw new Error(`State info for success '${onSuccess}' not found.`);
            }
            this.nextStateOnSuccess = successStateInfo.instance;
        }

        if (onFailure) {
            const failureStateInfo = this.stateRegistry.getStateInfo(onFailure);
            if (!failureStateInfo) {
                throw new Error(`State info for failure '${onFailure}' not found.`);
            }
            this.nextStateOnFailure = failureStateInfo.instance;
        }
    }

    run() {
        while (this.currentState) {
            try {
                this.currentState._onEntry();
                this.currentState._execute();
                this.currentState._onExit();
                this.currentState = this.nextStateOnSuccess;
            } catch (error) {
                this.currentState._onError(error);
                this.currentState = this.nextStateOnFailure;
            }
        }
    }
}

module.exports = StateManager;
