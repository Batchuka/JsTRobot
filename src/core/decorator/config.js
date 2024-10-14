// core/decorator/config.js
import ConfigManager from '../feature/configManager';

export function Config(configKey, defaultValue = null) {
    /**
     * Função decoradora para injetar um valor de configuração na função decorada.
     * 
     * @param {string} configKey - Chave da configuração a ser injetada.
     * @param {*} [defaultValue=null] - Valor padrão a ser usado se a configuração não for encontrada.
     */
    return function (func) {
        return function (...args) {
            // Obtém o valor da configuração usando o ConfigManager
            const configManager = new ConfigManager();  // Supondo que seja um Singleton
            const configValue = configManager.getConfig(configKey, defaultValue);

            // Injeta o valor da configuração nos argumentos da função
            return func(configValue, ...args);
        };
    };
}