// src\core\utility\common.js
const path = require('path');

// Função para adicionar temporariamente um caminho ao 'require' (equivalente ao sys.path do Python)
function temporarilyAddToPath(tempPath, callback) {
    const resolvedPath = path.resolve(tempPath);
    const originalPaths = module.paths.slice();

    if (!module.paths.includes(resolvedPath)) {
        module.paths.unshift(resolvedPath);
    }

    try {
        callback();
    } finally {
        module.paths = originalPaths; // Restaura os paths originais
    }
}

// Função para adicionar um caminho permanentemente
function addToPath(newPath) {
    const resolvedPath = path.resolve(newPath);

    if (!module.paths.includes(resolvedPath)) {
        module.paths.unshift(resolvedPath);
        console.log(`Caminho adicionado ao module.paths: ${resolvedPath}`);
    } else {
        console.warn(`Caminho já está presente no module.paths: ${resolvedPath}`);
    }
}

module.exports = {
    temporarilyAddToPath,
    addToPath
};
