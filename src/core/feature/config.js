import fs from 'fs';
import path from 'path';

class ConfigManager {
    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }
        this._configData = {};
        ConfigManager.instance = this;
        return this;
    }

    loadConfig(directory, configName = 'app.json') {
        const configPath = path.join(directory, 'rsc', configName);
        if (!fs.existsSync(configPath)) {
            throw new Error(`Config file '${configName}' not found.`);
        }
        const configFile = fs.readFileSync(configPath, 'utf-8');
        this._configData = JSON.parse(configFile);
    }

    getConfig(key, defaultValue = null) {
        const keys = key.split('.');
        let value = this._configData;

        for (let k of keys) {
            value = value[k];
            if (value === undefined) {
                return defaultValue;
            }
        }
        return value;
    }
}

export default new ConfigManager();
