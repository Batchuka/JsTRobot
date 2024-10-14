// src\core\decorator\sqs.js
import SQSRegistry from '../strategy/sqs/registry';

export function SQS(thread = false) {
    /**
     * Decorator que registra a classe como um worker SQS, com a opção
     * de executar em uma nova thread ou não.
     *
     * @param {boolean} thread - Indica se a task deve ser executada em uma thread separada.
     */
    return function (cls) {
        const taskName = `${cls.name}`;  // Usamos apenas o nome da classe em JS
        const taskRegistry = new SQSRegistry();  // Obtém a instância do TaskRegistry (singleton)

        // Armazena a preferência de execução em thread como um atributo da classe
        cls.runInThread = thread;

        // Registra a task no TaskRegistry
        taskRegistry.register(taskName, cls);

        return cls;  // Retorna a classe sem modificá-la
    };
}
