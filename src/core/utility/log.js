import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

class LogManager {
    constructor() {
        if (LogManager.instance) {
            return LogManager.instance;
        }

        this.loggers = {
            'JsTRobot': this._createLogger('JsTRobot'),
            'State': this._createLogger('State'),
            'SQS': this._createLogger('SQS')
        };

        LogManager.instance = this;
        return this;
    }

    _createLogger(name) {
        return createLogger({
            level: 'info',
            format: combine(
                timestamp(),
                printf(({ level, message, timestamp }) => {
                    return `[${name}] ${timestamp} ${level.toUpperCase()}: ${message}`;
                })
            ),
            transports: [new transports.Console()]
        });
    }

    getLogger(name) {
        if (this.loggers[name]) {
            return this.loggers[name];
        }
        throw new Error("Logger name must be 'JsTRobot', 'State', or 'SQS'");
    }
}

// Exportando a única instância
export default new LogManager();