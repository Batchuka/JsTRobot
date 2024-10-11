// src/core/strategy/sqs/messageBuilder.js

class SQSMessage {
    constructor(taskName, args = [], kwargs = {}, callback = {}, metadata = {}) {
        /**
         * Inicializa a mensagem SQS com os atributos necessários.
         * 
         * @param {string} taskName - Nome da task a ser executada.
         * @param {Array} args - Lista de argumentos para a task.
         * @param {Object} kwargs - Argumentos chave-valor para a task.
         * @param {Object} callback - Dados relacionados ao callback da task.
         * @param {Object} metadata - Metadados adicionais da task.
         */
        this.taskName = taskName;
        this.args = args;
        this.kwargs = kwargs;
        this.callback = callback;
        this.metadata = metadata;
    }

    toDict() {
        /**
         * Converte a mensagem para um objeto utilizável pelo SQS.
         * 
         * @return {Object} Dicionário contendo a mensagem.
         */
        return {
            task_name: this.taskName,
            args: this.args,
            kwargs: this.kwargs,
            callback: this.callback,
            metadata: this.metadata,
        };
    }

    toJson() {
        /**
         * Converte a mensagem para um formato JSON.
         * 
         * @return {string} String JSON da mensagem.
         */
        return JSON.stringify(this.toDict());
    }
}

class SQSMessageBuilder {
    constructor(taskName) {
        /**
         * Inicializa o builder com o nome da task.
         * 
         * @param {string} taskName - O nome da task que será executada.
         */
        this.taskName = taskName;
        this.args = [];
        this.kwargs = {};
        this.callback = {};
        this.metadata = {};
    }

    addArgs(...args) {
        /**
         * Adiciona uma lista de argumentos à task.
         * 
         * @param {Array} args - Lista de argumentos para a task.
         * @return {SQSMessageBuilder} Instância atualizada de SQSMessageBuilder.
         */
        this.args.push(...args);
        return this;
    }

    addKwargs(kwargs) {
        /**
         * Adiciona argumentos com palavras-chave à task.
         * 
         * @param {Object} kwargs - Argumentos chave-valor para a task.
         * @return {SQSMessageBuilder} Instância atualizada de SQSMessageBuilder.
         */
        this.kwargs = { ...this.kwargs, ...kwargs };
        return this;
    }

    setCallback(url, authToken, method = 'POST', headers = {}) {
        /**
         * Define os dados para o callback.
         * 
         * @param {string} url - URL para qual a resposta deve ser enviada.
         * @param {string} authToken - Token de autenticação para validar o callback.
         * @param {string} [method='POST'] - Método HTTP (padrão: POST).
         * @param {Object} headers - Headers HTTP adicionais para a requisição (opcional).
         * @return {SQSMessageBuilder} Instância atualizada de SQSMessageBuilder.
         */
        this.callback = {
            url,
            authToken,
            method,
            headers,
        };
        return this;
    }

    setMetadata(taskId, priority = 'medium', retries = 0, expiresAt = null) {
        /**
         * Define os metadados para a task.
         * 
         * @param {string} taskId - ID único da task.
         * @param {string} [priority='medium'] - Prioridade da task (low, medium, high).
         * @param {number} [retries=0] - Número de tentativas em caso de falha.
         * @param {string} [expiresAt=null] - Data de expiração da mensagem (ISO 8601).
         * @return {SQSMessageBuilder} Instância atualizada de SQSMessageBuilder.
         */
        this.metadata = {
            task_id: taskId,
            priority,
            retries,
            expires_at: expiresAt,
        };
        return this;
    }

    build() {
        /**
         * Constrói e retorna uma instância de SQSMessage.
         * 
         * @return {SQSMessage} Instância de SQSMessage.
         */
        return new SQSMessage(
            this.taskName,
            this.args,
            this.kwargs,
            this.callback,
            this.metadata
        );
    }
}
