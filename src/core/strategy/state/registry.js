// state/stateRegistry.js
const { Singleton } = require('../singleton');
const BaseRegistry = require('../core/baseRegistry');  // Supondo que o BaseRegistry esteja no core

class StateRegistry extends BaseRegistry {
    constructor() {
        super();
        if (StateRegistry.instance) {
            return StateRegistry.instance;
        }
        this.states = {};
        this.firstStateName = null;
        this.stateMachineOperator = null;
        StateRegistry.instance = this;  // Singleton logic
        return this;
    }

    updateStateOperator(operatorFunc) {
        Object.values(this.states).forEach(stateInfo => {
            stateInfo.instance.stateMachineOperator = operatorFunc;
        });
    }

    register(currentState, nextStateOnSuccess, nextStateOnFailure) {
        this.states[currentState.name] = {
            instance: new currentState(this.stateMachineOperator),
            successState: nextStateOnSuccess,
            failureState: nextStateOnFailure
        };
    }

    getStateInfo(stateName) {
        return this.states[stateName];
    }
}

module.exports = StateRegistry;
