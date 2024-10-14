// core/decorator/subprocess.js
import SubprocessManager from '../feature/subprocessManager';

export function Subprocess(command, captureOutput = true, captureError = true) {
    /**
     * Função para acessar o SubprocessManager diretamente e executar um subprocesso.
     * 
     * @param {Array<string>} command - Lista de strings contendo o comando a ser executado.
     * @param {boolean} [captureOutput=true] - Indica se a saída padrão do subprocesso deve ser capturada.
     * @param {boolean} [captureError=true] - Indica se a saída de erro do subprocesso deve ser capturada.
     * @returns {Object} Resultado do subprocesso, conforme retornado pelo SubprocessManager.
     */
    const subprocessManager = new SubprocessManager();
    return subprocessManager.executeSubprocess(command, captureOutput, captureError);
}