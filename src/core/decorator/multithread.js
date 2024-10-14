// src\core\decorator\multithread.js
import MultiThreadManager from '../feature/multithreadManager';

export function Thread(func) {
    /**
     * Proxy para o decorador @Thread do PyTRobot.
     * Cria uma nova thread (ou worker) para a função decorada.
     */
    const multiThreadManager = new MultiThreadManager();

    return function (...args) {
        // A função decorada é passada para a execução da thread
        const thread = multiThreadManager.newThread(() => func(...args));
        return thread;
    };
}
