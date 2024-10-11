// src\core\feature\multiThread.js
const { createLogger, transports } = require('winston');
const logger = createLogger({ transports: [new transports.Console()] });

class MultithreadManager {
    constructor() {
        if (MultithreadManager.instance) {
            return MultithreadManager.instance;
        }
        this.threads = {};
        MultithreadManager.instance = this;
        return this;
    }

    newThread(func, join = false) {
        const funcName = func.name;
        if (this.threads[funcName] && this.threads[funcName].isAlive) {
            logger.info(`Thread for ${funcName} is already running.`);
            return;
        }
        logger.info(`Starting new thread for ${funcName}.`);
        const thread = new Promise(func); // Simulating a thread with Promises
        this.threads[funcName] = thread;
        thread.then(() => {
            if (join) logger.info(`Thread ${funcName} joined.`);
        });
        return thread;
    }

    stopThread(func) {
        const funcName = func.name;
        if (this.threads[funcName]) {
            logger.info(`Ending thread for ${funcName}.`);
            delete this.threads[funcName];
        } else {
            logger.warn(`Thread ${funcName} not found.`);
        }
    }

    listActiveThreads() {
        const activeThreads = Object.keys(this.threads).filter((name) => this.threads[name]);
        logger.info(`Active threads: ${activeThreads.join(', ')}`);
    }
}

module.exports = new MultithreadManager();
