// src/core/strategy/sqs/baseTask.js
import AWS from 'aws-sdk';
import LogManager from '../../utility/logManager.js';
import { Queue } from 'bull';

export class SQSManager {
    constructor(taskRegistry, regionName = null, queueUrl = null, maxMessages = null, waitTime = 60) {
        this.taskRegistry = taskRegistry;
        this.logger = new LogManager().getLogger('SQS');
        this.localQueue = new Queue();
        this.regionName = regionName;
        this.queueUrl = queueUrl;
        this.maxMessages = maxMessages;
        this.waitTime = waitTime;

        // Conecta ao cliente SQS
        this.sqsClient = new AWS.SQS({ region: this.regionName });

        // Flag para controle do loop de polling
        this.keepPolling = true;

        // Inicia o processo de consumo da fila
        this.start();
    }

    start() {
        this.logger.info("Iniciando consumo da fila SQS...");
        // Cria um intervalo para consumo e processamento de mensagens
        this.pollingInterval = setInterval(() => {
            this._pollAndProcessMessages();
        }, this.waitTime * 1000);
    }

    stop() {
        this.logger.info("Parando o consumo da fila SQS...");
        clearInterval(this.pollingInterval);
        this.keepPolling = false;
    }

    async _pollAndProcessMessages() {
        if (!this.keepPolling) return;

        // Puxa mensagens da fila SQS
        const messages = await this.pullMessages();

        // Se houver mensagens, as adiciona à fila local
        if (messages && messages.length > 0) {
            messages.forEach((message) => {
                this.localQueue.add(message);
                this.logger.info(`Mensagem ${message.MessageId} adicionada à fila local.`);
            });
        }

        // Processa mensagens da fila local
        this.processQueue();
    }

    async pullMessages() {
        try {
            const response = await this.sqsClient.receiveMessage({
                QueueUrl: this.queueUrl,
                MaxNumberOfMessages: this.maxMessages,
                WaitTimeSeconds: this.waitTime,
            }).promise();

            const messages = response.Messages || [];
            this.logger.info(`Número de mensagens recebidas: ${messages.length}`);
            return messages;
        } catch (e) {
            this.logger.error(`Erro ao buscar mensagens da fila SQS: ${e.message}`);
            return [];
        }
    }

    async processQueue() {
        while (!this.localQueue.isEmpty()) {
            const message = await this.localQueue.next();
            if (message) {
                this.logger.info(`Processando mensagem: ${message.MessageId}`);
                this.handleMessage(message);
            }
        }
    }

    handleMessage(message) {
        const body = this.parseMessageBody(message);

        // Identifica qual task deve ser executada com base na mensagem
        const taskName = body.task_name;
        const taskArgs = body.kwargs || {};

        if (taskName) {
            const task = this.taskRegistry.get(taskName);
            if (task) {
                this.logger.info(`Executando task: ${taskName}`);
                this.executeTask(task, taskArgs);
                this.deleteMessage(message);
            } else {
                this.logger.warning(`Tarefa '${taskName}' não registrada.`);
            }
        } else {
            this.logger.warning(`Mensagem inválida ou sem task associada: ${message.MessageId}`);
        }
    }

    parseMessageBody(message) {
        const body = message.Body;
        try {
            return JSON.parse(body);
        } catch (e) {
            this.logger.error(`Erro ao decodificar JSON da mensagem: ${e.message}`);
            return {};
        }
    }

    executeTask(task, taskArgs) {
        try {
            const taskInstance = new task();
            taskInstance.run(taskArgs);
            this.logger.info(`Tarefa ${task.name} executada com sucesso.`);
        } catch (e) {
            this.logger.error(`Erro ao executar a tarefa ${task.name}: ${e.message}`);
        }
    }

    async sendMessage(message) {
        try {
            await this.sqsClient.sendMessage({
                QueueUrl: this.queueUrl,
                MessageBody: JSON.stringify(message.toDict()),
            }).promise();
            this.logger.info("Mensagem enviada para a fila SQS.");
            return true;
        } catch (e) {
            this.logger.error(`Erro ao enviar mensagem para a fila SQS: ${e.message}`);
            return false;
        }
    }

    async deleteMessage(message) {
        try {
            await this.sqsClient.deleteMessage({
                QueueUrl: this.queueUrl,
                ReceiptHandle: message.ReceiptHandle,
            }).promise();
            this.logger.info(`Mensagem ${message.MessageId} excluída da fila SQS.`);
        } catch (e) {
            this.logger.error(`Erro ao excluir mensagem ${message.MessageId}: ${e.message}`);
        }
    }
}

export default SQSManager;
