// src\core\feature\subProcess.js
const { exec } = require('child_process');
const { createLogger, transports } = require('winston');
const logger = createLogger({ transports: [new transports.Console()] });

class SubprocessManager {
    constructor() {
        if (SubprocessManager.instance) {
            return SubprocessManager.instance;
        }
        this.processes = {};
        SubprocessManager.instance = this;
        return this;
    }

    executarSubprocesso(command, capturaSaida = true, capturaErro = true) {
        const processId = `process_${Object.keys(this.processes).length + 1}`;
        const options = {
            stdio: [capturaSaida ? 'pipe' : 'ignore', capturaErro ? 'pipe' : 'ignore']
        };

        return new Promise((resolve, reject) => {
            const process = exec(command, options, (error, stdout, stderr) => {
                if (error) {
                    logger.error(`Error executing process ${processId}: ${error.message}`);
                    return reject({ processId, sucesso: false, erro: stderr, codigoSaida: error.code });
                }
                resolve({ processId, saida: stdout, sucesso: true, erro: stderr, codigoSaida: 0 });
            });
            this.processes[processId] = process;
        });
    }
}

module.exports = new SubprocessManager();
