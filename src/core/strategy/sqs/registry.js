// src/core/strategy/sqs/sqsRegistry.js
const BaseRegistry = require('../state/baseRegistry');
const LogManager = require('../../utility/logManager');
const Singleton = require('../../singleton');

class SQSRegistry extends BaseRegistry {
    constructor() {
        super();
        if (!SQSRegistry.instance) {
            this.logger = new LogManager().getLogger('SQS');
            this._tasks = {};  // Dicionário para armazenar tasks {task_name: task_class}
            SQSRegistry.instance = this;
        }
        return SQSRegistry.instance;
    }

    register(taskName, taskCls) {
        /**
         * Adiciona uma task ao registro.
         * 
         * @param {string} taskName - Nome da task.
         * @param {Function} taskCls - Classe da task.
         */
        this._tasks[taskName] = taskCls;
        this.logger.info(`Task ${taskName} registrada.`);
    }

    getAll() {
        /**
         * Retorna todas as tasks registradas.
         * 
         * @return {Object} Dicionário com as tasks registradas.
         */
        return this._tasks;
    }

    hasItems() {
        /**
         * Verifica se há tasks registradas.
         * 
         * @return {boolean} True se houver tasks registradas.
         */
        return Object.keys(this._tasks).length > 0;
    }
}