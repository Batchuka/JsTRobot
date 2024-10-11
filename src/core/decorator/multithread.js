// src\core\decorator\multithread.js
const MultithreadManager = require('../feature/multithreadManager');

function Thread(func) {
    /**
     * Proxy para o decorador @Thread do PyTRobot.
     * Cria uma nova thread (ou worker) para a função decorada.
     */
    const multithreadManager = new MultithreadManager();

    return function (...args) {
        // A função decorada é passada para a execução da thread
        const thread = multithreadManager.newThread(() => func(...args));
        return thread;
    };
}
