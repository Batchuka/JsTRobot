// src\core\index.js
import path from 'path';
import fs from 'fs';
import ConfigManager from './feature/config.js';
import MultiThreadManager from './feature/multiThread.js';
import SQSStrategy from './strategy/sqs/strategy.js';
import StateStrategy from './strategy/state/strategy.js';
import LogManager from './utility/log.js';

export class JsTRobot {
    constructor(directory) {
        if (!PyTRobot.instance) {
            this.directory = directory || process.argv[2];
            this.logger = new LogManager().getLogger('PyTRobot');
            this.strategies = [];
            this._initialize();
            PyTRobot.instance = this;
        }
        return PyTRobot.instance;
    }

    _initialize() {
        this.loadConfig();
        this.loadSrc();
        this.multiThreadManager = new MultiThreadManager();
        this._checkAndRegisterStrategies();
    }

    loadConfig() {
        this.configManager = new ConfigManager();
        this.configManager.loadConfig(this.directory);
    }

    loadSrc() {
        this.baseDirectory = this.directory;
        this.srcPath = path.join(this.directory, 'src');
        require('app-module-path').addPath(this.srcPath); // Para adicionar o diretório ao caminho
        if (fs.existsSync(this.srcPath)) {
            this._importAllFiles();
        } else {
            throw new Error("'src' directory not found.");
        }
    }

    _importAllFiles() {
        const files = fs.readdirSync(this.srcPath);
        files.forEach(file => {
            if (file.endsWith('.js') && file !== 'index.js') {
                try {
                    importModule(path.join(this.srcPath, file));
                } catch (error) {
                    this.logger.error(`Error importing module ${file}: ${error}`);
                }
            }
        });
    }

    _checkAndRegisterStrategies() {
        const SQSRegistry = require('./strategy/sqs/sqsRegistry');
        const StateRegistry = require('./strategy/state/stateRegistry');

        const taskRegistry = new SQSRegistry();
        const stateRegistry = new StateRegistry();

        if (Object.keys(taskRegistry.getAll()).length > 0) {
            this.strategies.push(new SQSStrategy());
        }
        if (Object.keys(stateRegistry.getAll()).length > 0) {
            this.strategies.push(new StateStrategy());
        }

        if (this.strategies.length === 0) {
            throw new Error('Nenhuma estratégia registrada ou especificada na configuração.');
        }
    }

    initializeApplication() {
        this.strategies.forEach(strategy => strategy.initialize());
    }

    startApplication() {
        const config = this.configManager.getAllConfigs();
        const strategyPriority = (config.strategy_priority || 'sqs').toLowerCase();
        const startDelay = config.strategy_start_delay || 10;

        if (strategyPriority === 'sqs') {
            this.strategies.sort(strategy => strategy.constructor.name.toLowerCase() !== 'sqsstrategy');
        } else if (strategyPriority === 'state') {
            this.strategies.sort(strategy => strategy.constructor.name.toLowerCase() !== 'statestrategy');
        }

        this.strategies.forEach(strategy => {
            strategy.start();
            if (startDelay > 0) {
                setTimeout(() => strategy.start(), startDelay * 1000);
            }
        });

        this.monitorThreads();
    }

    stopApplication() {
        this.strategies.forEach(strategy => strategy.stop());
    }

    monitorThreads() {
        setInterval(() => {
            const activeThreads = this.multiThreadManager.getNumberActiveThreads();
            if (activeThreads === 0) {
                this.logger.info("No active threads, terminating the process...");
                this.stopApplication();
                process.exit(0);
            }
        }, 10000);
    }
}