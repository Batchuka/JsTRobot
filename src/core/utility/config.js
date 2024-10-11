// src\core\utility\config.js
const ConfigManager = require('../feature/config');  // Substitua pelo caminho correto

class ConfigKeyError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigKeyError";
    }
}

function Value(configKey, defaultValue = null) {
    const configManager = ConfigManager.getInstance();  // Assume que ConfigManager seja um singleton
    const value = configManager.getConfig(configKey, defaultValue);

    if (value === null || value === undefined) {
        throw new ConfigKeyError(`Configuration key '${configKey}' returned None. Please provide a valid value.`);
    }

    return value;
}

module.exports = {
    Value,
    ConfigKeyError
};
