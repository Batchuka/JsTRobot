// src\core\feature\logging.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const TerminalColor = {
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    RESET: '\x1b[0m'
};

const logger = createLogger({
    format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
            let color = TerminalColor.RESET;
            if (level === 'error') color = TerminalColor.RED;
            else if (level === 'warn') color = TerminalColor.YELLOW;
            else if (level === 'debug') color = TerminalColor.BLUE;

            return `${color}${timestamp} [${level.toUpperCase()}]: ${message}${TerminalColor.RESET}`;
        })
    ),
    transports: [new transports.Console()]
});

function printBanner() {
    const banner = `
          __        
         |  | ___________          _        
         |  |/  ____   __|        | |     o   _   
         |  |\  \   | |_ ___  ___ | |__  _|_ | |__
    __   |  | \  \  | | V __|/ _ \|  _ \/   \|  __|
   \  \__|  |__|  | | |  /  | |_| | |_)( * * ) |
    \______/ \___/  |_|__|   \___/|____/\---/|_|
`;

    console.log(`${TerminalColor.BLUE}${banner}${TerminalColor.RESET}`);
}

module.exports = { logger, printBanner };
