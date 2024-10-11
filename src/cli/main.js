#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { copyProject } = require('./projectManager');
const path = require('path');
const fs = require('fs');

// Função para o comando CLI principal
const cli = () => {
    yargs(hideBin(process.argv))
        .command('new [outputPath]', 'Create a new JsTRobot project or component', (yargs) => {
            yargs
                .positional('outputPath', {
                    describe: 'Path where the new project will be created',
                    default: '.'
                })
                .option('stateProject', {
                    alias: 'S',
                    type: 'boolean',
                    description: 'Copy the state project scaffold'
                })
                .option('taskProject', {
                    alias: 'T',
                    type: 'boolean',
                    description: 'Copy the task project scaffold'
                });
        }, (argv) => {
            const outputPath = path.resolve(argv.outputPath);
            const timestamp = new Date().toISOString().replace(/[-:.]/g, '');

            if (argv.stateProject) {
                const src = path.resolve(__dirname, '../scaffold/state/project'); // Exemplo de caminho
                const destination = path.join(outputPath, `project_state_${timestamp}`);
                fs.mkdirSync(destination, { recursive: true });
                copyProject(src, destination);
            } else if (argv.taskProject) {
                const src = path.resolve(__dirname, '../scaffold/task/project'); // Exemplo de caminho
                const destination = path.join(outputPath, `project_task_${timestamp}`);
                fs.mkdirSync(destination, { recursive: true });
                copyProject(src, destination);
            } else {
                console.log("No option selected. Use --help for available options.");
            }
        })
        .help()
        .argv;
};

if (require.main === module) {
    cli();
}
