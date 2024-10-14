// src\core\feature\logging.js
import { createLogger, format, transports } from 'winston';
import { combine, timestamp, printf } from format;

const TerminalColor = {
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    RESET: '\x1b[0m'
};


export function printBanner() {
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
};