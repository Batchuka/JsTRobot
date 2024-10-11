// src\cli\projectManager.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Função auxiliar para copiar um projeto, ignorando certos diretórios como __pycache__
const copyProject = (src, dest) => {
    try {
        const options = {
            filter: (src, dest) => !src.includes('__pycache__')
        };
        // Copia todos os arquivos e pastas
        fs.cpSync(src, dest, { recursive: true });
        console.log(`Project copied successfully to: ${dest}`);
    } catch (err) {
        console.error(`Error copying project: ${err.message}`);
    }
};

class ProjectManager {
    createProject(name) {
        const scaffoldPath = path.resolve(__dirname, '../scaffold/project');
        const outputDir = path.join(process.cwd(), name);

        try {
            fs.mkdirSync(outputDir, { recursive: true });
            copyProject(scaffoldPath, outputDir);
            console.log(`Project '${name}' created successfully.`);
        } catch (error) {
            console.error(`Failed to create project: ${error}`);
        }
    }

    newProject() {
        console.log("Choose what you want to create:");
        console.log("1. Project");

        const option = prompt("Select the corresponding number (1): ");
        if (option === '1') {
            const name = prompt("Enter the new project name: ");
            this.createProject(name);
        } else {
            console.log("Invalid option. Try again.");
        }
    }
}

module.exports = { ProjectManager, copyProject };
