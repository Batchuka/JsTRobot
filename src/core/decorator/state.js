// src\core\decorator\state.js
const StateRegistry = require('../strategy/state/stateRegistry');

function State(nextStateOnSuccess = '_FinisherState', nextStateOnFailure = '_FinisherState') {
    /**
     * Decorator que registra a classe como um estado.
     * 
     * @param {string} nextStateOnSuccess - Estado subsequente em caso de sucesso.
     * @param {string} nextStateOnFailure - Estado subsequente em caso de falha.
     */
    return function (cls) {
        const stateRegistry = new StateRegistry();
        stateRegistry.register(cls, nextStateOnSuccess, nextStateOnFailure);
        return cls;
    };
}

function First(cls) {
    /**
     * Decorator que define o estado inicial (primeiro estado).
     */
    const stateRegistry = new StateRegistry();
    stateRegistry.firstStateName = cls.name;  // Define o nome do primeiro estado
    return cls;
}