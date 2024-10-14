// src\scaffold\sqs\project\main.js
import path from 'path';
import { entrypoint } from 'jstrobot/src/core/main.js';

function main() {
    // Define o diretório atual como argumento para o entrypoint
    process.argv = [path.resolve(import.meta.url)];

    // Invoca o entrypoint do JsTRobot
    entrypoint();
}

if (import.meta.url === new URL(import.meta.url).href) {
    main();
}
