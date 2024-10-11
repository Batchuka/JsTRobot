// src\scaffold\sqs\project\main.js
const path = require('path');

function main() {
    // Importa o JsTRobot como framework instalado
    const entrypoint = require('JsTRobot').entrypoint;

    // Define o diretório atual como argumento para o entrypoint
    process.argv = [path.resolve(__dirname)];

    // Invoca o entrypoint do JsTRobot
    entrypoint();
}

if (require.main === module) {
    main();
}
