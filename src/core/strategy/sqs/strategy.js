// src/core/strategy/sqs/strategy.js
import Value from '../../utility/config.js';
import ApplicationStrategy from '../applicationStrategy.js';
import SQSManager from './manager.js';
import SQSRegistry from './registry.js';

export class SQSStrategy extends ApplicationStrategy {
    constructor() {
        super();
        if (!SQSStrategy.instance) {
            this.sqsManagers = {};
            SQSStrategy.instance = this;
        }
        return SQSStrategy.instance;
    }

    initialize() {
        /**
         * Inicializa uma instância do SQSManager para uma fila específica.
         */
        const sqsConfigs = Value.get("aws.sqs");  // Supomos que Value.get() retorna as configs de SQS
        sqsConfigs.forEach(sqsConfig => {
            const taskRegistry = new SQSRegistry();
            const queueName = sqsConfig.queue_name;

            this.sqsManagers[queueName] = new SQSManager(
                taskRegistry,
                sqsConfig.region_name,
                sqsConfig.queue_url,
                parseInt(sqsConfig.max_messages),
                parseInt(sqsConfig.wait_time)
            );
        });
    }

    start() {
        /**
         * Inicia o consumo da fila para todos os SQSManagers registrados.
         */
        for (const manager of Object.values(this.sqsManagers)) {
            this.multithreadManager.newThread(() => manager.start());
        }
    }

    stop() {
        /**
         * Para o consumo da fila para todos os SQSManagers registrados.
         */
        for (const manager of Object.values(this.sqsManagers)) {
            this.multithreadManager.stopThread(() => manager.start());
        }
    }

    selectQueue(queueKey) {
        /**
         * Seleciona uma fila para envio de mensagens e retorna a instância do SQSManager.
         * 
         * @param {string} queueKey - A chave da fila a ser selecionada.
         * @return {SQSManager} A instância de SQSManager correspondente à fila.
         */
        if (this.sqsManagers[queueKey]) {
            return this.sqsManagers[queueKey];
        } else {
            throw new Error(`Fila '${queueKey}' não encontrada.`);
        }
    }
}