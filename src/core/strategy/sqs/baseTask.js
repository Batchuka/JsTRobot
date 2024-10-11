// src/core/strategy/sqs/base_task.js
const LogManager = require('../../utility/log_manager');  // Assumindo que você tenha algo semelhante

class BaseTask {
    constructor() {
        if (this.constructor === BaseTask) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.logManager = new LogManager();
        this.logger = this.logManager.getLogger('SQS');
    }

    // Método principal chamado para rodar a task
    run(...args) {
        // Chama o método de entrada antes de executar a lógica principal
        this._onEntry();
        this.execute(...args);
    }

    // Método privado que chama o método on_entry do usuário
    _onEntry() {
        this.onEntry();
    }

    // Método abstrato para lógica de entrada
    onEntry() {
        throw new Error("Method 'onEntry()' must be implemented.");
    }

    // Método abstrato para lógica principal da task
    execute(...args) {
        throw new Error("Method 'execute()' must be implemented.");
    }
}