// src\core\main.js
import JsTRobot from './index.js';

export function entrypoint() {
    if (process.argv.length < 3) {
        console.error("Usage: node main.js <project_directory>");
        process.exit(1);
    }

    const directory = process.argv[2];

    // Inicializa o JsTRobot
    const jstrobot = new JsTRobot(directory);
    jstrobot.initializeApplication();
    jstrobot.startApplication();
}

if (require.main === module) {
    entrypoint();
}